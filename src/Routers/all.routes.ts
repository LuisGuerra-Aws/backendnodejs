import express from "express";

import { createRol, deleteRol, getRol, getRoles, updateRol } from '../Controllers/rolController';


    const router = express.Router();

    router.post('/api/rol', createRol);
    router.get('/api/rol', getRoles);
    router.get('/api/rol/:id', getRol);
    router.put('/api/rol', updateRol);
    router.delete('/api/rol', deleteRol);

export default router;