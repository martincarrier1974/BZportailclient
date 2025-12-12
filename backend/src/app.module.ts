import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { PbxInstancesModule } from './pbx-instances/pbx-instances.module';
import { AuditModule } from './audit/audit.module';
import { FreepbxModule } from './freepbx/freepbx.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(
              ({ timestamp, level, message, context }) => {
                return `${timestamp} [${context}] ${level}: ${message}`;
              },
            ),
          ),
        }),
      ],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TenantsModule,
    PbxInstancesModule,
    AuditModule,
    FreepbxModule,
  ],
})
export class AppModule {}

