import { Module, forwardRef } from '@nestjs/common';
import { PbxInstancesService } from './pbx-instances.service';
import { PbxInstancesController } from './pbx-instances.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';
import { FreepbxModule } from '../freepbx/freepbx.module';

@Module({
  imports: [PrismaModule, AuditModule, forwardRef(() => FreepbxModule)],
  controllers: [PbxInstancesController],
  providers: [PbxInstancesService],
  exports: [PbxInstancesService],
})
export class PbxInstancesModule {}

