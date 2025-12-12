import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // SUPER_ADMIN can access all tenants
    if (user.role === UserRole.SUPER_ADMIN) {
      return true;
    }

    // For other roles, check tenant access
    const tenantId = request.params.tenantId || request.body.tenantId || request.query.tenantId;

    if (user.role === UserRole.TENANT_ADMIN || user.role === UserRole.READ_ONLY) {
      if (tenantId && user.tenantId !== tenantId) {
        throw new ForbiddenException('Access denied to this tenant');
      }
      return true;
    }

    return false;
  }
}

