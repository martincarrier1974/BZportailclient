import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditAction } from '@prisma/client';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log({
    userId,
    tenantId,
    pbxInstanceId,
    action,
    entityType,
    entityId,
    changes,
    ipAddress,
    userAgent,
  }: {
    userId: string;
    tenantId?: string;
    pbxInstanceId?: string;
    action: AuditAction;
    entityType: string;
    entityId?: string;
    changes?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        userId,
        tenantId,
        pbxInstanceId,
        action,
        entityType,
        entityId,
        changes,
        ipAddress,
        userAgent,
      },
    });
  }
}

