import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody, WsResponse } from '@nestjs/websockets';

@WebSocketGateway({transports:['websocket']})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wws: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('init');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected:  ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected:  ${client.id}`);
  }
  @SubscribeMessage('msgToServer')
  handleMessage(@MessageBody() text: string): WsResponse<string> {
    this.logger.log(`message: ${text}`);
    return { event: 'msgToClient', data: text };
  }
}
