import { Module } from '@nestjs/common';
import { FreepbxService } from './freepbx.service';
import { FreepbxController } from './freepbx.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PbxInstancesModule } from '../pbx-instances/pbx-instances.module';

@Module({
  imports: [PrismaModule, PbxInstancesModule],
  controllers: [FreepbxController],
  providers: [FreepbxService],
  exports: [FreepbxService],
})
export class FreepbxModule {}

