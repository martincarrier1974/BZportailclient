import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePbxInstanceDto } from './dto/create-pbx-instance.dto';
import { UpdatePbxInstanceDto } from './dto/update-pbx-instance.dto';
import { PBXStatus } from '@prisma/client';
import { FreepbxService } from '../freepbx/freepbx.service';

@Injectable()
export class PbxInstancesService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FreepbxService))
    private freepbxService?: FreepbxService,
  ) {}

  async create(createPbxInstanceDto: CreatePbxInstanceDto) {
    // TODO: Encrypt sensitive fields (apiKey, password) before storing
    return this.prisma.freePBXInstance.create({
      data: {
        ...createPbxInstanceDto,
        status: PBXStatus.DISCONNECTED,
      },
    });
  }

  async findAll(tenantId?: string) {
    const where = tenantId ? { tenantId } : {};
    return this.prisma.freePBXInstance.findMany({
      where,
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const instance = await this.prisma.freePBXInstance.findUnique({
      where: { id },
      include: {
        tenant: true,
      },
    });

    if (!instance) {
      throw new NotFoundException(`PBX Instance with ID ${id} not found`);
    }

    return instance;
  }

  async update(id: string, updatePbxInstanceDto: UpdatePbxInstanceDto) {
    // TODO: Encrypt sensitive fields if updated
    return this.prisma.freePBXInstance.update({
      where: { id },
      data: updatePbxInstanceDto,
    });
  }

  async remove(id: string) {
    return this.prisma.freePBXInstance.delete({
      where: { id },
    });
  }

  async checkHealth(id: string) {
    const instance = await this.findOne(id);
    
    // Utiliser le service FreepbxService pour le vrai health check
    if (this.freepbxService) {
      try {
        const result = await this.freepbxService.checkHealth(id);
        return {
          id: instance.id,
          status: result.status,
          message: result.message,
          lastHealthCheck: new Date(),
        };
      } catch (error) {
        return {
          id: instance.id,
          status: PBXStatus.ERROR,
          message: error.message,
          lastHealthCheck: new Date(),
        };
      }
    }
    
    // Fallback si FreepbxService n'est pas disponible
    await this.prisma.freePBXInstance.update({
      where: { id },
      data: {
        status: PBXStatus.DISCONNECTED,
        lastHealthCheck: new Date(),
      },
    });

    return {
      id: instance.id,
      status: PBXStatus.DISCONNECTED,
      message: 'Health check service not available',
      lastHealthCheck: new Date(),
    };
  }
}

