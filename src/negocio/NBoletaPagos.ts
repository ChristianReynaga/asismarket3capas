import { DBoletaPagos } from "../datos/DBoletaPagos";
import { DDetallePago } from "../datos/DDetallePago";

export class NBoletaPagos {
    private dBoletaPagos : DBoletaPagos;
    private dDetallePago:DDetallePago;

    constructor(){
        this.dBoletaPagos = new DBoletaPagos();
        this.dDetallePago = new DDetallePago();
    }

    public listar():Promise<any[]>{
        return this.dBoletaPagos.listar();
    }

    public async registrar( fecha:Date, comerciante_id:number, detalles:any[]):Promise<boolean>{
        
        let seRegistro:boolean = false;
        
        this.dBoletaPagos.setMontoTotal(this.sumarMontoTotal(detalles));
        this.dBoletaPagos.setFecha(fecha);
        this.dBoletaPagos.setComercianteID(comerciante_id);

        await this.dBoletaPagos.registrar().then( async ( nroBoleta ) => {            
            if (nroBoleta != -1){
                this.dDetallePago.setNroBoleta(nroBoleta);
                await this.dDetallePago.registrar(detalles).then(
                    (res:boolean) => {
                        if(res){
                            console.log("NBoletaPago: se registro los detalles");
                            seRegistro = true;
                        }
                    }
                );
            }
        }).catch( (err) => console.log(err, "NBoletaPago: Error al insertar los datos"));
        
        return seRegistro;
    }

    private sumarMontoTotal(detalles:any[]){
        let total:number = 0;
        detalles.forEach( (elem) => {
            total += elem.monto;
        });
        return total;
    }

    
}