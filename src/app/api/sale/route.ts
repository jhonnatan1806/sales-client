import { CartItem, Product } from '@/utils/types';
import * as amqp from 'amqplib/callback_api';
import { NextRequest, NextResponse } from 'next/server';

const USER = "guess";
const PASSWORD = "guess";
const HOST = "localhost";
const QUEUE = "sale";
const AMQP_URL = `amqp://${USER}:${PASSWORD}@${HOST}`;

export async function POST(req: NextRequest) {

	const body = (await req.json()) as CartItem[];
	if (!body || !Array.isArray(body)) {
		return NextResponse.json({ success: false, message: 'Request body or products are missing or not an array' });
	}

	const cartItem: CartItem[] = body;
	const productos = cartItem.map(({ product, quantity }: CartItem) => ({
		id_prod: product.id_prod,
		name_prod: product.name_prod,
		unit: product.unit,
		price: product.price,
		quantity: quantity,
	}));

	const ventas = {
		usuario: {
			nombres: 'Jonh',
			apellidos: 'Doe',
			ruc: '123456789',
		},
		productos: productos,
	};

	const message = JSON.stringify(ventas).toString();

	return new Promise((resolve, reject) => {
		amqp.connect(`amqp://${HOST}`, function (error0: Error | null, connection: amqp.Connection) {
			if (error0) {
				reject(error0);
				return;
			}

			connection.createChannel(function (error1: Error | null, channel: amqp.Channel) {
				if (error1) {
					reject(error1);
					return;
				}

				channel.assertQueue(QUEUE, {
					durable: false,
				});

				channel.sendToQueue(QUEUE, Buffer.from(message));
				console.log(' [x] Sent %s', message);

				resolve(NextResponse.json({ success: true }));
			});
		});
	});
}
