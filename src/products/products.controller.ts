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
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
    cors: {
        origin: '*', // ❗ faqat dev uchun
        methods: ['GET', 'POST'],
    },
    port: 3001,
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly prisma: PrismaService) { }

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

            const product = await this.prisma.product.upsert({
                where: {
                    id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b"
                },
                update: {
                    name: JSON.stringify(products.products),
                    barcode: JSON.stringify(products.categories),
                },
                create: {
                    id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b",
                    name: "[]",
                    barcode: "[]",
                    sales: "[]",
                    debtor: "[]",
                    payments: "[]",
                },
            });

            this.server.emit('data', `{"products": ${JSON.stringify(product.name)}, "categories": ${JSON.stringify(product.barcode)}}`);

        } catch (error) {
            this.logger.error(`❌ Xatolik: ${error.message}`);
            const product = await this.prisma.product.findUnique({
                where: {
                    id: "d3f8b29e-7c21-4b6f-8a9f-23d4a1f62c3b"
                }
            });
            // console.log(product);
            const products = JSON.parse(product.name || "[]");
            const categories = JSON.parse(product.barcode || "[]");
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
