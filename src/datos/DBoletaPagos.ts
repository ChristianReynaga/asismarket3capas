import Conexion from './conexion';

export class DBoletaPagos {

    private nro: number;
    private monto_total: number;
    private fecha: Date;
    private comerciante_id: number;

    constructor() {
        this.monto_total = 0;
        this.fecha = new Date();
    }

    public setNro(nro: number) {
        this.nro = nro;
    }

    public setMontoTotal(monto: number) {
        this.monto_total = monto;
    }

    public setFecha(fecha: Date) {
        this.fecha = fecha;
    }

    public setComercianteID(cid: number) {
        this.comerciante_id = cid;
    }


    public async listar(): Promise<any[]> {
        const query = ` SELECT * FROM boleta_pagos `
        var boletas: any[] = [];

        await Conexion.ejecutarQuery<any[]>(query, []).then(
            (data) => { boletas = data }
        ).catch((err) => console.log(err));

        return boletas;
    }

    public async registrar(): Promise<number> {
        let nroBoleta: number = -1;
        const queryHeader: string = ` INSERT INTO boleta_pagos (monto_total, fecha, comerciante_id) VALUES (?, ?, ?) `;
        await Conexion.ejecutarQuery<any>(queryHeader, [this.monto_total, this.fecha, this.comerciante_id]).then(
            (data) => {
                nroBoleta = data["insertId"];
            }).catch((err) => console.log(err)
            );
        return nroBoleta;
    }

    public async modificar(): Promise<boolean> {
        let seModifico = false;  
        const query:string = ` UPDATE boleta_pagos SET monto_total=? ,fecha=?,comerciante_id=? WHERE nro=? `;
        await Conexion.ejecutarQuery<any>(query, [this.monto_total, this.fecha, this.comerciante_id, this.nro]).then(
            (data) => {                                                
                console.log("DBoletaPagos: registro modificado");
                seModifico = true;
            }).catch((err) => console.log(err)
        );
        return seModifico;
    }

    public async eliminar(): Promise<boolean>{      
        let seElimino = false;  
        const query:string = ` DELETE FROM boleta_pagos WHERE nro=? `;
        await Conexion.ejecutarQuery<any>(query, [this.nro]).then(
            (data) => {                                                
                console.log("DBoletaPagos: registro eliminado");
                seElimino = true;
            }).catch((err) => console.log(err)
        );
        return seElimino;
    }


    public async obtener(): Promise<any> {
        const query = ` SELECT * FROM boleta_pagos WHERE nro=? `
        var boleta: any = null;

        await Conexion.ejecutarQuery<any[]>(query, [this.nro]).then(
            (data) => {
                if (data.length == 0) {
                    console.log('DBoletaPagos: no hay datos')
                } else {
                    boleta = {
                        "nro": data[0].nro,
                        "monto_total": data[0].monto_total,
                        "fecha": data[0].fecha,
                        "comerciante_id": data[0].comerciante_id
                    }
                }
            }
        ).catch((err) => console.log(err));

        return boleta;
    }


}