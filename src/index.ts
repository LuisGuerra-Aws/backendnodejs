import express from 'express';

import { prismaClient } from './Repository/database';

import router from './Routers/all.routes';
const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500')

const app = express();
app.use(express.json());

app.get('/', (_req : any, _res: any ) => {
    return _res.json({ message: 'Hola mundo estamos en NodeJs'});
});

app.use('/', router);

app.listen(PORT, async() => {
    await prismaClient.$connect();

    console.log(`App iniciada en url ${HOST}:${PORT}`)
});