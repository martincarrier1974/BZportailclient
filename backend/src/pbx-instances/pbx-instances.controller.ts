import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PbxInstancesService } from './pbx-instances.service';
import { CreatePbxInstanceDto } from './dto/create-pbx-instance.dto';
import { UpdatePbxInstanceDto } from './dto/update-pbx-instance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../auth/guards/tenant.guard';
import { RolesGuard } from '../auth/decorators/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('pbx-instances')
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
export class PbxInstancesController {
  constructor(private readonly pbxInstancesService: PbxInstancesService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  create(@Body() createPbxInstanceDto: CreatePbxInstanceDto, @Request() req) {
    // If not SUPER_ADMIN, force tenantId from user
    if (req.user.role !== UserRole.SUPER_ADMIN && req.user.tenantId) {
      createPbxInstanceDto.tenantId = req.user.tenantId;
    }
    return this.pbxInstancesService.create(createPbxInstanceDto);
  }

  @Get()
  findAll(@Request() req) {
    // Filter by tenant if not SUPER_ADMIN
    const tenantId = req.user.role === UserRole.SUPER_ADMIN ? undefined : req.user.tenantId;
    return this.pbxInstancesService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pbxInstancesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  update(@Param('id') id: string, @Body() updatePbxInstanceDto: UpdatePbxInstanceDto) {
    return this.pbxInstancesService.update(id, updatePbxInstanceDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  remove(@Param('id') id: string) {
    return this.pbxInstancesService.remove(id);
  }

  @Post(':id/health-check')
  checkHealth(@Param('id') id: string) {
    return this.pbxInstancesService.checkHealth(id);
  }
}

