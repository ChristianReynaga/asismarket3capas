import Conexion from "./conexion";

export class DDetallePago {

    private nroBoleta: number;
    private nro: number;
    private monto: number;
    private tipo: string;
    private puesto_id: string;

    constructor(nroBoleta?: number, nro?: number, monto?: number, tipo?: string) {
        this.nroBoleta = nroBoleta || -1;
        this.nro = nro || -1;
        this.monto = monto || 0.0;
        this.tipo = tipo || "M";
        this.puesto_id = "";
    }

    public setNroBoleta(nroBoleta: number) {
        this.nroBoleta = nroBoleta;
    }

    public setNro(nro: number) {
        this.nro = nro;
    }

    public setMonto(monto: number) {
        this.monto = monto;
    }

    public setTipo(tipo: string) {
        this.tipo = tipo;
    }

    public setPuestoID(id: string) {
        this.puesto_id = id;
    }

    public async listar(): Promise<any[]> {
        const query = ` SELECT * FROM detalle_pago WHERE nroBoleta=? `
        var boletas: any[] = [];

        await Conexion.ejecutarQuery<any[]>(query, [this.nroBoleta]).then(
            (data) => { boletas = data }
        ).catch((err) => console.log(err));

        return boletas;
    }


    public async registrar(): Promise<boolean> {
        let seRegistro: boolean = false;

        if (this.nroBoleta == -1) return seRegistro;

        const queryDetalle = `INSERT INTO detalle_pago (nroBoleta, nro, monto, tipo, puesto_id) VALUES (?, ?, ?, ?,?)`;

        await Conexion.ejecutarQuery(queryDetalle,
            [this.nroBoleta, this.nro, this.monto, this.tipo, this.puesto_id])
            .then((resultados) => {
                console.log('DetallePago: nuevo registro insertado');
                seRegistro = true;
            })
            .catch((error) => console.log("DetallePago-Error:", error));

        return seRegistro;
    }

    public async modifcar():Promise<boolean>{
        let seModifico:boolean = false;

        const query = ` UPDATE detalle_pago SET monto=?, tipo=?,puesto_id=? WHERE nroBoleta=? and nro=? `;

        await Conexion.ejecutarQuery(
            query, [ this.monto, this.tipo, this.puesto_id, this.nroBoleta, this.nro]
        ).then(
            (data) => {
                seModifico = true;
                console.log("DetallePago: modificado");
            }
        ).catch(
            (err) => console.log(err)
        );
        return seModifico;
    }


    // public async registrarPorLista( detalles:any[]):Promise<boolean>{
    //     let seRegistro:boolean = false; 

    //     if(this.nroBoleta == -1) return seRegistro;

    //     const queryDetalle = `INSERT INTO detalle_pago (nroBoleta, nro, monto, tipo, puesto_id) VALUES (?, ?, ?, ?,?)`;

    //     const promesas = detalles.map((unDetalle, index) => {
    //         return Conexion.ejecutarQuery<any>(queryDetalle, [
    //             this.nroBoleta,index+1, unDetalle.monto, unDetalle.tipo, unDetalle.puesto_id ])
    //     });

    //     await Promise.all(promesas)
    //         .then((resultados) => {
    //             console.log('DetallePago: nuevos registros insertados');
    //             seRegistro = true;
    //         })
    //         .catch((error) => console.log("DetallePago-Error:", error));
    //     return seRegistro;
    // }
}