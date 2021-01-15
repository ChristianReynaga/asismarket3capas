import Conexion from './conexion';

export class DBoletaPagos {

    // private nro:number;
    private monto_total:number;
    private fecha:Date;
    private comerciante_id:number;  

    constructor(){
       this.monto_total = 0;
        this.fecha = new Date();
    }

    public setMontoTotal(monto:number){
        this.monto_total = monto;
    }

    public setFecha(fecha:Date){
        this.fecha = fecha;
    }

    public setComercianteID(cid:number){
        this.comerciante_id = cid;
    }
    

    public async listar():Promise<any[]>{
        const query = ` SELECT * FROM boleta_pagos `
        var boletas:any[] = [];

        await Conexion.ejecutarQuery<any[]>(query, []).then(
            (data) => { boletas = data }            
        ).catch( (err)=> console.log(err));
        
        return boletas;
    }

    public async registrar(): Promise<number>{
        let nroBoleta:number = -1; 
        const queryHeader:string = ` INSERT INTO boleta_pagos (monto_total, fecha, comerciante_id) VALUES (?, ?, ?) `;
        await Conexion.ejecutarQuery<any>(queryHeader, [this.monto_total, this.fecha, this.comerciante_id]).then(
            (data) => {                                                
                nroBoleta = data["insertId"];
            }).catch((err) => console.log(err)
        );
        return nroBoleta;
    }


}