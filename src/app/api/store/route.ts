import * as amqp from 'amqplib/callback_api';
import {  NextResponse } from 'next/server';

const USER = "guess";
const PASSWORD = "guess";
const HOST = "localhost";
const QUEUE = "store";
const AMQP_URL = `amqp://${USER}:${PASSWORD}@${HOST}`;

const MESSAGE = "getproductos";

export async function GET() {
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

                // mensaje = getProductos
                channel.sendToQueue(QUEUE, Buffer.from(MESSAGE));
                    console.log(" [x] Sent %s", MESSAGE);

                channel.consume(
                    QUEUE,
                    function (MESSAGE: amqp.Message | null) {
                        if (MESSAGE !== null) {
                            console.log(' [x] Received %s', MESSAGE.content.toString());
                            
                            resolve(NextResponse.json({ message: MESSAGE.content.toString() }));
                            channel.close( (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });

                            connection.close((err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });   
                        }
                    },
                    {
                        noAck: true,
                    }
                );
            });

            
        });

    });
}
