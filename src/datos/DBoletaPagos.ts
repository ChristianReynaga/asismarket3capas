import Conexion from './conexion';

export class DBoletaPagos {

    // private nro:number;
    private monto_total:number;
    private fecha:Date;    

    constructor(){
       
    }

    public async listar():Promise<any[]>{
        const query = ` SELECT * FROM boleta_pagos `
        var boletas:any[] = [];

        Conexion.ejecutarQuery<any[]>(query, []).then(
            (data) => { boletas = data }            
        ).catch( (err)=> console.log(err));
        
        return boletas;
    }


}