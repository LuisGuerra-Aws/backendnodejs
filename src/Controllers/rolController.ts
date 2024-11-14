
import { Request, Response } from "express";
import { getRolesService, getRolService, createRolService, updateRolService, deleteRolService } from '../Services/rolService'
import { RolSchema } from '../models/schemas/RolSchema';
import * as y from 'yup';
import { Rol } from '../models/Rol';

export const getRoles = async ( _req: Request, _res: Response) => {

    const jsonRoles = await getRolesService(); 

     _res.json(jsonRoles);

};

export const getRol = async ( _req: Request, _res: Response) => {
    const idtext  = _req.params;

    console.log("_req.params " + _req.params);
    console.log("idtext " + idtext.id);

    const id = parseInt( idtext.id, 10);
    
    const jsonRol = await getRolService(id); 

    _res.json(jsonRol);

};

export const createRol  = async ( _req: Request, _res: Response) => {

    try {
        const payload = RolSchema.validateSync(_req.body, {abortEarly : false, stripUnknown: true});
        var rolinsert = Rol;
        rolinsert.rol_name = payload.rol_name;
        rolinsert.rol_description = payload.rol_description;
        var rol;
        rol = await createRolService(rolinsert);
        console.log("imprime " + rol);
        if (rol == null)
        {
             _res.status(400).json( {message : 'Error en inserción'})
        }
        else {
             _res.status(201).json( {data : rol});
        }
    }
    catch (e ){
        const error = e as y.ValidationError;
         _res.status(400).json({ errors: error.errors });
    }

    
};

export const updateRol  = async ( _req: Request, _res: Response) => {

    try {
        const payload = RolSchema.validateSync(_req.body, {abortEarly : false, stripUnknown: true});
        var rolUpdate = Rol;

        if (payload.id_rol)
            rolUpdate.id_rol = payload.id_rol;
        
        rolUpdate.rol_name = payload.rol_name;
        rolUpdate.rol_description = payload.rol_description;
        
        const rol = await updateRolService(rolUpdate);

        if (rol == null)
        {
             _res.status(400).json( {message : 'Error en Actualización'})
        }
        else {
             _res.status(201).json( {data : rol});
        }
    }
    catch (e ){
        const error = e as y.ValidationError;
         _res.status(400).json({ errors: error.errors });
    }
  
};

export const deleteRol = async ( _req: Request, _res: Response) => {
    const idtext  = _req.params;

    const id = parseInt( idtext.id, 10);
    
    const booleano = await deleteRolService(id);
    if ( booleano)
         _res.status(204).send();
    else
         _res.status(404).json( {message : 'No encontrado para eliminar'})

};