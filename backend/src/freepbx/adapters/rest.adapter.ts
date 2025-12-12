import axios, { AxiosInstance } from 'axios';
import { BaseAdapter } from './base.adapter';
import { PBXApiType } from '@prisma/client';

export class RestAdapter extends BaseAdapter {
  private client: AxiosInstance;

  constructor(instance: any) {
    super(instance);
    
    const baseURL = instance.apiUrl || `https://${instance.host}:${instance.port || 443}/api`;
    
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Ajouter l'authentification
    if (instance.apiKey) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${instance.apiKey}`;
    } else if (instance.username && instance.password) {
      // Basic Auth si pas de token
      const auth = Buffer.from(`${instance.username}:${instance.password}`).toString('base64');
      this.client.defaults.headers.common['Authorization'] = `Basic ${auth}`;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Essayer d'appeler un endpoint simple (peut varier selon FreePBX)
      const response = await this.client.get('/status', { timeout: 5000 });
      return response.status === 200;
    } catch (error) {
      // Si /status n'existe pas, essayer /ping ou autre
      try {
        const response = await this.client.get('/ping', { timeout: 5000 });
        return response.status === 200;
      } catch {
        return false;
      }
    }
  }

  async listIvr(): Promise<any[]> {
    try {
      const response = await this.client.get('/ivr');
      return response.data?.data || response.data || [];
    } catch (error) {
      throw new Error(`Failed to list IVR: ${error.message}`);
    }
  }

  async createIvr(data: any): Promise<any> {
    try {
      const response = await this.client.post('/ivr', data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create IVR: ${error.message}`);
    }
  }

  async updateIvr(id: string, data: any): Promise<any> {
    try {
      const response = await this.client.put(`/ivr/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update IVR: ${error.message}`);
    }
  }

  async deleteIvr(id: string): Promise<boolean> {
    try {
      await this.client.delete(`/ivr/${id}`);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete IVR: ${error.message}`);
    }
  }

  async listInboundRoutes(): Promise<any[]> {
    try {
      const response = await this.client.get('/inboundroutes');
      return response.data?.data || response.data || [];
    } catch (error) {
      throw new Error(`Failed to list inbound routes: ${error.message}`);
    }
  }

  async createInboundRoute(data: any): Promise<any> {
    try {
      const response = await this.client.post('/inboundroutes', data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create inbound route: ${error.message}`);
    }
  }

  async listExtensions(): Promise<any[]> {
    try {
      const response = await this.client.get('/extensions');
      return response.data?.data || response.data || [];
    } catch (error) {
      throw new Error(`Failed to list extensions: ${error.message}`);
    }
  }

  async listCdr(filters: any): Promise<any[]> {
    try {
      const response = await this.client.get('/cdr', { params: filters });
      return response.data?.data || response.data || [];
    } catch (error) {
      throw new Error(`Failed to list CDR: ${error.message}`);
    }
  }

  async listPrompts(): Promise<any[]> {
    try {
      const response = await this.client.get('/recordings');
      return response.data?.data || response.data || [];
    } catch (error) {
      throw new Error(`Failed to list prompts: ${error.message}`);
    }
  }

  async listRingGroups(): Promise<any[]> {
    try {
      const response = await this.client.get('/ringgroups');
      return response.data?.data || response.data || [];
    } catch (error) {
      throw new Error(`Failed to list ring groups: ${error.message}`);
    }
  }
}

