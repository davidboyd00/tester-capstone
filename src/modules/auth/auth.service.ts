import {
  Injectable, UnauthorizedException, ConflictException, ForbiddenException, Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Store } from '../stores/entities/store.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../../common/enums';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // ── LOGIN ─────────────────────────────────
  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
      select: ['id', 'email', 'name', 'password', 'role', 'storeId', 'isActive'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Cuenta desactivada. Contacta al administrador');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    await this.usersRepository.update(user.id, { lastLoginAt: new Date() });

    this.logger.log(`Login exitoso: ${user.email} (${user.role})`);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.sanitizeUser(user),
    };
  }

  // ── REGISTER ──────────────────────────────
  async register(dto: RegisterDto) {
    const exists = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (exists) {
      throw new ConflictException('El email ya esta registrado');
    }

    // Validar: store_user debe tener storeId
    if (dto.role === Role.STORE_USER && !dto.storeId) {
      throw new ConflictException('store_user debe tener una tienda asignada');
    }

    // Validar: storeId debe existir
    if (dto.storeId) {
      const store = await this.storesRepository.findOne({
        where: { id: dto.storeId, isActive: true },
      });
      if (!store) {
        throw new ConflictException('La tienda no existe o esta desactivada');
      }
    }

    const hashedPassword = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const user = this.usersRepository.create({
      email: dto.email.toLowerCase().trim(),
      name: dto.name.trim(),
      password: hashedPassword,
      role: dto.role,
      storeId: dto.role === Role.ADMIN ? null : dto.storeId,
    });

    const saved = await this.usersRepository.save(user);
    this.logger.log(`Usuario creado: ${saved.email} (${saved.role})`);

    const tokens = await this.generateTokens(saved);
    await this.updateRefreshTokenHash(saved.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.sanitizeUser(saved),
    };
  }

  // ── REFRESH TOKENS ────────────────────────
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'name', 'role', 'storeId', 'refreshTokenHash', 'isActive'],
    });

    if (!user || !user.isActive || !user.refreshTokenHash) {
      throw new ForbiddenException('Acceso denegado');
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);

    if (!isTokenValid) {
      // Posible robo de token: invalidar sesion
      await this.usersRepository.update(user.id, { refreshTokenHash: null });
      this.logger.warn(`Refresh token invalido para ${user.email}. Sesion invalidada`);
      throw new ForbiddenException('Refresh token invalido. Sesion cerrada por seguridad');
    }

    // Rotar tokens (el anterior queda invalidado)
    const tokens = await this.generateTokens(user);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.sanitizeUser(user),
    };
  }

  // ── LOGOUT ────────────────────────────────
  async logout(userId: string) {
    await this.usersRepository.update(userId, { refreshTokenHash: null });
    return { message: 'Sesion cerrada correctamente' };
  }

  // ── PROFILE ───────────────────────────────
  async getProfile(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['store'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      storeId: user.storeId,
      store: user.store ? { id: user.store.id, name: user.store.name } : null,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
    };
  }

  // ── PRIVATE HELPERS ───────────────────────
  private async generateTokens(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      storeId: user.storeId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn: this.configService.get<string>('jwt.accessExpiration') as any,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiration') as any,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, BCRYPT_ROUNDS);
    await this.usersRepository.update(userId, { refreshTokenHash: hash });
  }

  private sanitizeUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      storeId: user.storeId,
    };
  }
}
