import DListaAsistencia from "../datos/DListaAsistencia";
import DeDetalleAsistencia from "../datos/DDetalleAsistencia";

export class NListaAsistencia {

    private dListaAsistencia :DListaAsistencia;
    private arrayDetalleAsistencia: Array<DeDetalleAsistencia>;

    constructor() {
        this.dListaAsistencia = new DListaAsistencia();
        this.arrayDetalleAsistencia = new Array<DeDetalleAsistencia>();
    }

    public listar():Promise<any[]>{
        return this.dListaAsistencia.listar();        
    }

    public async registrar(fecha:Date, detalles:any[]):Promise<boolean>{
        
        let seRegistro:boolean = false;
        this.dListaAsistencia
        
        this.cargarArrayDetalle(detalles);

        if (this.arrayDetalleAsistencia.length == 0) return seRegistro;
        let idLista:number = await this.dListaAsistencia.registrar(fecha);
        if(idLista != -1){
            seRegistro = true;
            this.arrayDetalleAsistencia.forEach( async (unDetalle) => {
                await unDetalle.registrar();
            });
        }              
        return seRegistro;
    }    

    private cargarArrayDetalle(detalles:any[]){
        detalles.forEach( (value)=>{
            let unDetalle = new DeDetalleAsistencia();
            unDetalle.setIdLista(value.idLista);
            unDetalle.setIdPuesto(value.puesto_id);
            unDetalle.setIdComerciante(value.comerciante_id);                        
            unDetalle.setEstado(value.estado);
            this.arrayDetalleAsistencia.push(unDetalle);
        });
    }
    
}