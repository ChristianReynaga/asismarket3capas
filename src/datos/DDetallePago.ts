import Conexion from "./conexion";

export class DDetallePago{

    private nroBoleta:number;
    private nro:number;
    private monto:number;
    private tipo:string;

    constructor(nroBoleta?:number, nro?:number, monto?:number, tipo?:string){
        this.nroBoleta = nroBoleta || -1;
        this.nro = nro || -1;
        this.monto = monto || 0.0;
        this.tipo = tipo || "M";
    }

    public setNroBoleta(nroBoleta:number){
        this.nroBoleta=nroBoleta;
    }

    public setNro(nro:number){
        this.nro = nro;
    }

    public setMonto(monto:number){
        this.monto = monto;
    }

    public setTipo(tipo:string){
        if (tipo in ["M", "L", "A"]){
            this.tipo = tipo;
        }
    }

 
    public async registrar( detalles:any[]):Promise<boolean>{
        let seRegistro:boolean = false; 
        
        if(this.nroBoleta == -1) return seRegistro;

        const queryDetalle = `INSERT INTO detalle_pago (nroBoleta, nro, monto, tipo, puesto_id) VALUES (?, ?, ?, ?,?)`;

        const promesas = detalles.map((unDetalle, index) => {
            return Conexion.ejecutarQuery<any>(queryDetalle, [
                this.nroBoleta,index+1, unDetalle.monto, unDetalle.tipo, unDetalle.puesto_id ])
        });

        await Promise.all(promesas)
            .then((resultados) => {
                console.log('DetallePago: nuevos registros insertados');
                seRegistro = true;
            })
            .catch((error) => console.log("DetallePago-Error:", error));
        return seRegistro;
    }
}