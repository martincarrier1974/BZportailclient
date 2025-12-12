import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PbxInstancesService } from '../pbx-instances/pbx-instances.service';
import { PBXApiType, PBXStatus } from '@prisma/client';
import { RestAdapter } from './adapters/rest.adapter';
import { AmiAdapter } from './adapters/ami.adapter';

@Injectable()
export class FreepbxService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => PbxInstancesService))
    private pbxInstancesService: PbxInstancesService,
  ) {}

  /**
   * Récupère une instance PBX et vérifie l'accès tenant
   */
  private async getPbxInstance(pbxInstanceId: string, tenantId?: string) {
    const instance = await this.pbxInstancesService.findOne(pbxInstanceId);

    // Vérifier l'isolation tenant
    if (tenantId && instance.tenantId !== tenantId) {
      throw new NotFoundException('PBX instance not found for this tenant');
    }

    if (instance.status !== PBXStatus.CONNECTED) {
      throw new BadRequestException(
        `PBX instance ${instance.name} is not connected (status: ${instance.status})`,
      );
    }

    return instance;
  }

  /**
   * Obtient l'adapter approprié selon le type d'API
   */
  private getAdapter(instance: any) {
    switch (instance.apiType) {
      case PBXApiType.REST:
      case PBXApiType.UCP:
        return new RestAdapter(instance);
      case PBXApiType.AMI:
        return new AmiAdapter(instance);
      default:
        throw new BadRequestException(`Unsupported API type: ${instance.apiType}`);
    }
  }

  /**
   * Health check réel d'une instance PBX
   */
  async checkHealth(pbxInstanceId: string): Promise<{ status: PBXStatus; message: string }> {
    const instance = await this.pbxInstancesService.findOne(pbxInstanceId);
    const adapter = this.getAdapter(instance);

    try {
      const isHealthy = await adapter.healthCheck();
      
      const status = isHealthy ? PBXStatus.CONNECTED : PBXStatus.ERROR;
      
      await this.prisma.freePBXInstance.update({
        where: { id: pbxInstanceId },
        data: {
          status,
          lastHealthCheck: new Date(),
        },
      });

      return {
        status,
        message: isHealthy ? 'PBX is reachable and responding' : 'PBX is not responding',
      };
    } catch (error) {
      await this.prisma.freePBXInstance.update({
        where: { id: pbxInstanceId },
        data: {
          status: PBXStatus.ERROR,
          lastHealthCheck: new Date(),
        },
      });

      throw new BadRequestException(`Health check failed: ${error.message}`);
    }
  }

  /**
   * Liste les IVR d'un PBX (isolé par tenant)
   */
  async listIvr(pbxInstanceId: string, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.listIvr();
  }

  /**
   * Crée un IVR sur un PBX
   */
  async createIvr(pbxInstanceId: string, ivrData: any, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.createIvr(ivrData);
  }

  /**
   * Met à jour un IVR
   */
  async updateIvr(pbxInstanceId: string, ivrId: string, ivrData: any, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.updateIvr(ivrId, ivrData);
  }

  /**
   * Supprime un IVR
   */
  async deleteIvr(pbxInstanceId: string, ivrId: string, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.deleteIvr(ivrId);
  }

  /**
   * Liste les routes entrantes
   */
  async listInboundRoutes(pbxInstanceId: string, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.listInboundRoutes();
  }

  /**
   * Crée une route entrante
   */
  async createInboundRoute(pbxInstanceId: string, routeData: any, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.createInboundRoute(routeData);
  }

  /**
   * Liste les extensions/utilisateurs
   */
  async listExtensions(pbxInstanceId: string, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.listExtensions();
  }

  /**
   * Liste les CDR (Call Detail Records)
   */
  async listCdr(
    pbxInstanceId: string,
    filters: {
      startDate?: string;
      endDate?: string;
      src?: string;
      dst?: string;
      limit?: number;
    },
    tenantId?: string,
  ) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.listCdr(filters);
  }

  /**
   * Liste les prompts/recordings
   */
  async listPrompts(pbxInstanceId: string, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.listPrompts();
  }

  /**
   * Liste les ring groups
   */
  async listRingGroups(pbxInstanceId: string, tenantId?: string) {
    const instance = await this.getPbxInstance(pbxInstanceId, tenantId);
    const adapter = this.getAdapter(instance);
    return adapter.listRingGroups();
  }
}

