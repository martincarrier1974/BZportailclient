export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TENANT_ADMIN = 'TENANT_ADMIN',
  READ_ONLY = 'READ_ONLY',
}

export enum PBXStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  ERROR = 'ERROR',
}

export enum PBXApiType {
  REST = 'REST',
  AMI = 'AMI',
  UCP = 'UCP',
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  tenantId?: string;
}

export interface Tenant {
  id: string;
  name: string;
  companyName: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    users: number;
    pbxInstances: number;
  };
}

export interface FreePBXInstance {
  id: string;
  tenantId: string;
  name: string;
  host: string;
  port?: number;
  apiType: PBXApiType;
  apiUrl?: string;
  apiKey?: string;
  username?: string;
  password?: string;
  status: PBXStatus;
  lastHealthCheck?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  tenant?: {
    id: string;
    name: string;
    companyName: string;
  };
}

