import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FreepbxService } from './freepbx.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../auth/guards/tenant.guard';
import { RolesGuard } from '../auth/decorators/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('freepbx')
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
export class FreepbxController {
  constructor(private freepbxService: FreepbxService) {}

  @Post(':pbxInstanceId/health-check')
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  async healthCheck(@Param('pbxInstanceId') pbxInstanceId: string, @Request() req) {
    return this.freepbxService.checkHealth(pbxInstanceId);
  }

  // IVR endpoints
  @Get(':pbxInstanceId/ivr')
  async listIvr(@Param('pbxInstanceId') pbxInstanceId: string, @Request() req) {
    return this.freepbxService.listIvr(pbxInstanceId, req.user.tenantId);
  }

  @Post(':pbxInstanceId/ivr')
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  async createIvr(
    @Param('pbxInstanceId') pbxInstanceId: string,
    @Body() data: any,
    @Request() req,
  ) {
    return this.freepbxService.createIvr(pbxInstanceId, data, req.user.tenantId);
  }

  @Put(':pbxInstanceId/ivr/:ivrId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  async updateIvr(
    @Param('pbxInstanceId') pbxInstanceId: string,
    @Param('ivrId') ivrId: string,
    @Body() data: any,
    @Request() req,
  ) {
    return this.freepbxService.updateIvr(pbxInstanceId, ivrId, data, req.user.tenantId);
  }

  @Delete(':pbxInstanceId/ivr/:ivrId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  async deleteIvr(
    @Param('pbxInstanceId') pbxInstanceId: string,
    @Param('ivrId') ivrId: string,
    @Request() req,
  ) {
    return this.freepbxService.deleteIvr(pbxInstanceId, ivrId, req.user.tenantId);
  }

  // Inbound Routes endpoints
  @Get(':pbxInstanceId/inbound-routes')
  async listInboundRoutes(@Param('pbxInstanceId') pbxInstanceId: string, @Request() req) {
    return this.freepbxService.listInboundRoutes(pbxInstanceId, req.user.tenantId);
  }

  @Post(':pbxInstanceId/inbound-routes')
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN)
  async createInboundRoute(
    @Param('pbxInstanceId') pbxInstanceId: string,
    @Body() data: any,
    @Request() req,
  ) {
    return this.freepbxService.createInboundRoute(pbxInstanceId, data, req.user.tenantId);
  }

  // Extensions endpoints
  @Get(':pbxInstanceId/extensions')
  async listExtensions(@Param('pbxInstanceId') pbxInstanceId: string, @Request() req) {
    return this.freepbxService.listExtensions(pbxInstanceId, req.user.tenantId);
  }

  // CDR endpoints
  @Get(':pbxInstanceId/cdr')
  async listCdr(
    @Param('pbxInstanceId') pbxInstanceId: string,
    @Query() filters: any,
    @Request() req,
  ) {
    return this.freepbxService.listCdr(pbxInstanceId, filters, req.user.tenantId);
  }

  // Prompts endpoints
  @Get(':pbxInstanceId/prompts')
  async listPrompts(@Param('pbxInstanceId') pbxInstanceId: string, @Request() req) {
    return this.freepbxService.listPrompts(pbxInstanceId, req.user.tenantId);
  }

  // Ring Groups endpoints
  @Get(':pbxInstanceId/ring-groups')
  async listRingGroups(@Param('pbxInstanceId') pbxInstanceId: string, @Request() req) {
    return this.freepbxService.listRingGroups(pbxInstanceId, req.user.tenantId);
  }
}

