import {  number, object, string,  } from 'yup';

export const RolSchema  = object(
{
    id_rol : number(),
    rol_name :  string().required(),
    rol_description :  string().required(),
}
);