import { prismaClient } from '../Repository/database';
import { Rol } from '../models/Rol';

export const getRolesService = async ( ) =>{
    const roles = await prismaClient.roles.findMany(
        {
            orderBy: { 
                    rol_name: 'asc'
                },
        }
    );
    return ( { data: roles });
};

export const findbyRolId = async (id : number) => {
    console.log("Imprimir findbyRolId" + id);
    const rol = await prismaClient.roles.findUnique(
        {
            where: { id_rol : id },
        }
    );
    return rol; 
};

export const getRolService = async ( id : number) =>{
    console.log("Imprimir getRolService" + id);
    const rol = await findbyRolId(id);
    return ( { data: rol });
};

export const createRolService = async ( rol : typeof Rol) => {
    var rolInsert;
    if (    (rol.rol_description != null    ) 
        &&  (rol.rol_description.length > 0 )
        &&  (rol.rol_name != null ) 
        &&  (rol.rol_name.length > 0) 
    ) {

        try{
            rolInsert =  await prismaClient.roles.create(
                {
                    data : { 
                        rol_name : rol.rol_name,
                        rol_description : rol.rol_description
                     },
                }
                );

             console.log ("Inserta " + rolInsert.id_rol);  
             return rolInsert; 
            }
        catch (e){
            //const error = e.error;
            rolInsert = null;
            /*
            rolInsert.id_rol = null;
            rolInsert.rol_name = 'Inserción NO Realizada, Error Function';
            rolInsert.rol_description = 'Inserción NO Realizada, Error Function';
            */
           }

    } else {
        rolInsert = null;
        /*
        rolInsert.id_rol = null;
        rolInsert.rol_name = 'Inserción NO Realizada, datos Obligatorios con Nulo';
        rolInsert.rol_description = 'Inserción NO Realizada, datos Obligatorios con Nulo';
        */
    }
    
    return rolInsert;

};

export const updateRolService = async ( rol : typeof Rol) => {

    const rolExist = await findbyRolId(rol.id_rol);

    if (rolExist)
        console.log ("Inserta " + rolExist.id_rol);  
    

    if (rolExist){
        if (rol.rol_name != null)
            rolExist.rol_name = rol.rol_name;
        if (rol.rol_description != null)
            rolExist.rol_description = rol.rol_description;

        const rolUpdate = await prismaClient.roles.update(
            {
                where : {
                    id_rol : rol.id_rol,
                },
                data : { 
                    rol_name : rolExist.rol_name,
                    rol_description : rolExist.rol_description
                 },
            }
        );
        return rolUpdate;

    } else {
        return null;
    }



};

export const deleteRolService = async ( id : number) => {

    const rolExist = await findbyRolId(id);

    if (rolExist){
        await prismaClient.roles.delete(
        {
            where : {
                 id_rol : id,
            }
        }
        );
        return true;
    }
    else {
        return false;
    }
     
};
