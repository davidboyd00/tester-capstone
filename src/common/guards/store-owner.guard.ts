import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Role } from '../enums';

@Injectable()
export class StoreOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException('No autenticado');

    if (user.role === Role.ADMIN) return true;

    if (!user.storeId) {
      throw new ForbiddenException('Usuario sin tienda asignada');
    }

    const requestedStoreId =
      request.params?.storeId || request.query?.storeId || request.body?.storeId;

    // Si no se especificó storeId, inyectar el del usuario
    if (!requestedStoreId) {
      request.query.storeId = user.storeId;
      return true;
    }

    if (requestedStoreId !== user.storeId) {
      throw new ForbiddenException('No tienes acceso a esta tienda');
    }

    return true;
  }
}
