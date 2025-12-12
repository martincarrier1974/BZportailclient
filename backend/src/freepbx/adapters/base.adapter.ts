import { PBXApiType } from '@prisma/client';

export interface IPbxAdapter {
  healthCheck(): Promise<boolean>;
  listIvr(): Promise<any[]>;
  createIvr(data: any): Promise<any>;
  updateIvr(id: string, data: any): Promise<any>;
  deleteIvr(id: string): Promise<boolean>;
  listInboundRoutes(): Promise<any[]>;
  createInboundRoute(data: any): Promise<any>;
  listExtensions(): Promise<any[]>;
  listCdr(filters: any): Promise<any[]>;
  listPrompts(): Promise<any[]>;
  listRingGroups(): Promise<any[]>;
}

export abstract class BaseAdapter implements IPbxAdapter {
  protected instance: any;

  constructor(instance: any) {
    this.instance = instance;
  }

  abstract healthCheck(): Promise<boolean>;
  abstract listIvr(): Promise<any[]>;
  abstract createIvr(data: any): Promise<any>;
  abstract updateIvr(id: string, data: any): Promise<any>;
  abstract deleteIvr(id: string): Promise<boolean>;
  abstract listInboundRoutes(): Promise<any[]>;
  abstract createInboundRoute(data: any): Promise<any>;
  abstract listExtensions(): Promise<any[]>;
  abstract listCdr(filters: any): Promise<any[]>;
  abstract listPrompts(): Promise<any[]>;
  abstract listRingGroups(): Promise<any[]>;
}

