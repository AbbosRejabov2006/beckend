import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { supabase } from 'src/supabase/supabase_client';

@WebSocketGateway({
    cors: {
        origin: '*', // ❗ faqat dev uchun
        methods: ['GET', 'POST'],
    },
    port: 3001,
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer() server: Server;
    private readonly logger = new Logger(EventsGateway.name);

    // Gateway init
    afterInit(server: Server) {
        this.logger.log('🚀 WebSocket Gateway ishga tushdi');
    }


    // Klient ulandi
    handleConnection(client: Socket) {
        this.logger.log(`🟢 Client ulandi: ${client.id}`);
        client.emit('connectionStatus', '✅ Ulanish muvaffaqiyatli');
    }

    // Klient uzildi
    handleDisconnect(client: Socket) {
        this.logger.log(`🔴 Client uzildi: ${client.id}`);
    }

    // Oddiy xabar event
    @SubscribeMessage('message')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: string,
    ): void {
        this.logger.log(`✉️ ${client.id}: ${payload}`);
        this.server.emit('message', `${client.id}: ${payload}`);
    }

    // Shaxsiy xabar event
    @SubscribeMessage('privateMessage')
    handlePrivateMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { to: string; message: string },
    ): void {
        this.logger.log(`📩 Private: ${client.id} -> ${data.to}: ${data.message}`);
        this.server.to(data.to).emit('privateMessage', {
            from: client.id,
            message: data.message,
        });
    }

    // Yangi foydalanuvchi qo‘shilganda
    @SubscribeMessage('newUser')
    handleNewUser(
        @ConnectedSocket() client: Socket,
        @MessageBody() username: string,
    ): void {
        this.logger.log(`👤 Yangi foydalanuvchi: ${username} (ID: ${client.id})`);
        client.broadcast.emit('userJoined', `${username} chatga qo'shildi.`);
        client.emit('yourId', client.id);
    }

    // Barcha productlarni olish
    @SubscribeMessage('data')
    async handleGetProducts(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: string,
    ): Promise<void> {
        console.log(payload);
        try {
            const products = JSON.parse(payload);

            const { data: product, error: error2 } = await supabase
                .from('Products')
                .update({
                    products: JSON.stringify(products.products),
                    categories: JSON.stringify(products.categories),
                })
                .eq('id', 1).select();

            this.server.emit('data', `{"products": ${JSON.stringify(product[0].products)}, "categories": ${JSON.stringify(product[0].categories)}}`);

        } catch (error) {

            const { data, error: error2 } = await supabase
                .from('Products')
                .select('*')
                .eq('id', 1);

            if (error2) {
                console.error(error2);
            }

            console.log(data);
            const products = JSON.parse(data[0].products);
            const categories = JSON.parse(data[0].categories);

            const res = `{"products": ${JSON.stringify(products)}, "categories": ${JSON.stringify(categories)}}`;
            console.log(res);
            // client.send('data', res);
            this.server.sockets.emit('data', res);
            // this.server.emit('data', res);
            // this.server.listeners('data').forEach(listener => {
            //     listener(res);
            // });

            // this.server.emit('data', res);
            // this.server.emit('getProductsAndCategories', res);
            return;

        }
        // await this.broadcastProducts(payload);
    }




    // public async notifyProductsChanged(payload: string) {
    //     await this.broadcastProducts(payload);
    // }
}
