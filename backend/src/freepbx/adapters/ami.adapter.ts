import * as net from 'net';
import { BaseAdapter } from './base.adapter';

/**
 * Adapter pour AMI (Asterisk Manager Interface)
 * Utilise des connexions TCP socket pour communiquer avec Asterisk
 */
export class AmiAdapter extends BaseAdapter {
  private socket: net.Socket | null = null;
  private actionId: number = 0;
  private pendingActions: Map<number, { resolve: Function; reject: Function }> = new Map();

  constructor(instance: any) {
    super(instance);
  }

  private async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const port = this.instance.port || 5038;
      const host = this.instance.host;

      this.socket = new net.Socket();

      this.socket.connect(port, host, () => {
        // Envoyer les credentials AMI
        const loginAction = `Action: Login\r\nUsername: ${this.instance.username}\r\nSecret: ${this.instance.password}\r\n\r\n`;
        this.socket!.write(loginAction);
      });

      this.socket.on('data', (data) => {
        this.handleResponse(data.toString());
      });

      this.socket.on('error', (error) => {
        reject(error);
      });

      this.socket.on('close', () => {
        this.socket = null;
      });

      // Timeout pour la connexion
      setTimeout(() => {
        if (!this.socket?.readyState || this.socket.readyState !== 'open') {
          reject(new Error('Connection timeout'));
        }
      }, 5000);
    });
  }

  private handleResponse(data: string) {
    // Parser les réponses AMI (format clé: valeur)
    const lines = data.split('\r\n');
    const response: any = {};
    let currentActionId: number | null = null;

    for (const line of lines) {
      if (line.includes(':')) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        response[key.trim()] = value;

        if (key.trim() === 'ActionID') {
          currentActionId = parseInt(value);
        }
      }
    }

    // Résoudre la promesse correspondante
    if (currentActionId !== null && this.pendingActions.has(currentActionId)) {
      const { resolve } = this.pendingActions.get(currentActionId)!;
      this.pendingActions.delete(currentActionId);
      resolve(response);
    }
  }

  private async sendAction(action: string, params: Record<string, string> = {}): Promise<any> {
    if (!this.socket || this.socket.readyState !== 'open') {
      await this.connect();
    }

    return new Promise((resolve, reject) => {
      const currentActionId = ++this.actionId;
      this.pendingActions.set(currentActionId, { resolve, reject });

      let actionString = `Action: ${action}\r\nActionID: ${currentActionId}\r\n`;
      for (const [key, value] of Object.entries(params)) {
        actionString += `${key}: ${value}\r\n`;
      }
      actionString += '\r\n';

      this.socket!.write(actionString);

      // Timeout
      setTimeout(() => {
        if (this.pendingActions.has(currentActionId)) {
          this.pendingActions.delete(currentActionId);
          reject(new Error(`Action ${action} timeout`));
        }
      }, 10000);
    });
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.connect();
      const response = await this.sendAction('Ping');
      return response.Response === 'Success';
    } catch (error) {
      return false;
    }
  }

  async listIvr(): Promise<any[]> {
    // AMI n'a pas d'action directe pour lister les IVR
    // Il faudrait utiliser la base de données ou une autre méthode
    throw new Error('AMI adapter: listIvr not implemented - use REST API instead');
  }

  async createIvr(data: any): Promise<any> {
    throw new Error('AMI adapter: createIvr not implemented - use REST API instead');
  }

  async updateIvr(id: string, data: any): Promise<any> {
    throw new Error('AMI adapter: updateIvr not implemented - use REST API instead');
  }

  async deleteIvr(id: string): Promise<boolean> {
    throw new Error('AMI adapter: deleteIvr not implemented - use REST API instead');
  }

  async listInboundRoutes(): Promise<any[]> {
    throw new Error('AMI adapter: listInboundRoutes not implemented - use REST API instead');
  }

  async createInboundRoute(data: any): Promise<any> {
    throw new Error('AMI adapter: createInboundRoute not implemented - use REST API instead');
  }

  async listExtensions(): Promise<any[]> {
    try {
      await this.connect();
      const response = await this.sendAction('SIPpeers');
      // Parser la réponse AMI pour extraire les extensions
      return []; // TODO: Parser correctement
    } catch (error) {
      throw new Error(`Failed to list extensions: ${error.message}`);
    }
  }

  async listCdr(filters: any): Promise<any[]> {
    // Utiliser l'action CDRShow pour obtenir les CDR
    try {
      await this.connect();
      const params: Record<string, string> = {};
      if (filters.startDate) params.StartTime = filters.startDate;
      if (filters.endDate) params.EndTime = filters.endDate;
      
      const response = await this.sendAction('CDRShow', params);
      // Parser la réponse
      return []; // TODO: Parser correctement
    } catch (error) {
      throw new Error(`Failed to list CDR: ${error.message}`);
    }
  }

  async listPrompts(): Promise<any[]> {
    throw new Error('AMI adapter: listPrompts not implemented - use REST API instead');
  }

  async listRingGroups(): Promise<any[]> {
    throw new Error('AMI adapter: listRingGroups not implemented - use REST API instead');
  }
}

