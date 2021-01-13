import Conexion from "./conexion";

export class DDetallePago{

    private nroBoleta:number;
    private nro:number;
    private monto:number;
    private tipo:string;

    constructor(nroBoleta:number, nro:number, monto?:number, tipo?:string){
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

    public async registrar(nroBoleta: number): Promise<boolean> {
        let seRegistro:boolean = false;
       
        const query = `INSERT INTO detalle_pago (nroBoleta, estado, sector_id, comerciante_id) VALUES (?, ?, ?,?)`;
        
        // await Conexion.ejecutarQuery(query, 
        //     [ this.cod, this.estado, sector_id, comerciante_id ])
        //     .then(                
        //         (data) => {
        //             console.log('DPUESTO: nuevo registro insertado');
        //             seRegistro = true;
        //         }
        //     ).catch(
        //         (err) => console.log(err)
        //     );

        return seRegistro;              
    }
}