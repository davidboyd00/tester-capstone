import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Role } from '../enums';

@Injectable()
export class StoreOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === Role.ADMIN) return true;

    const requestedStoreId =
      request.params.storeId || request.query.storeId || request.body?.storeId;

    if (requestedStoreId && requestedStoreId !== user.storeId) {
      throw new ForbiddenException('No tienes acceso a esta tienda');
    }
    return true;
  }
}
