import { DBoletaPagos } from "../datos/DBoletaPagos";
import { DDetallePago } from "../datos/DDetallePago";

export class NBoletaPagos {
    private dBoletaPagos : DBoletaPagos;
    private arrayDetallePago:Array<DDetallePago>;

    constructor(){
        this.dBoletaPagos = new DBoletaPagos();
        this.arrayDetallePago = new Array<DDetallePago>();
    }

    public listar():Promise<any[]>{
        return this.dBoletaPagos.listar();
    }

    public async registrar( fecha:Date, comerciante_id:number, detalles:any[]):Promise<boolean>{
        
        let seRegistro:boolean = false;
        
        this.dBoletaPagos.setMontoTotal(this.sumarMontoTotal(detalles));
        this.dBoletaPagos.setFecha(fecha);
        this.dBoletaPagos.setComercianteID(comerciante_id);

        this.cargarArrayDetalle(detalles);

        if (this.arrayDetallePago.length == 0) return seRegistro;

        let nroBoleta:number = await this.dBoletaPagos.registrar();
        if(nroBoleta != -1){
            seRegistro = true;
            this.arrayDetallePago.forEach( async (unDetalle) => {
                unDetalle.setNroBoleta(nroBoleta);
                await unDetalle.registrar();
            });
        }
        return seRegistro;
    }

    private sumarMontoTotal(detalles:any[]):number{
        let total:number = 0;
        detalles.forEach( (elem) => {
            total += elem.monto;
        });
        return total;
    }

    private cargarArrayDetalle(detalles:any[]){
        detalles.forEach( (value, index)=>{
            let unDetalle = new DDetallePago();
            unDetalle.setNro(index+1);
            unDetalle.setMonto(value.monto);
            unDetalle.setTipo(value.tipo);
            unDetalle.setPuestoID(value.puesto_id);
            this.arrayDetallePago.push(unDetalle);
        });
    }

    
}