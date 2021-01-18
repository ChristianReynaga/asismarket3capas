import DListaAsistencia from "../datos/DListaAsistencia";
import DDetalleAsistencia from "../datos/DDetalleAsistencia";

export class NListaAsistencia {

    private dListaAsistencia :DListaAsistencia;
    private arrayDetalleAsistencia: Array<DDetalleAsistencia>;

    constructor() {
        this.dListaAsistencia = new DListaAsistencia();
        this.arrayDetalleAsistencia = new Array<DDetalleAsistencia>();
    }

    public listar():Promise<any[]>{
        return this.dListaAsistencia.listar();        
    }

    public async registrar(fecha:Date, detalles:any[]):Promise<boolean>{
        
        let seRegistro:boolean = false;
        this.dListaAsistencia.setFecha(fecha);
        
        this.cargarArrayDetalle(detalles);

        if (this.arrayDetalleAsistencia.length == 0) return seRegistro;

        let idLista:number = await this.dListaAsistencia.registrar();
        if(idLista != -1){
            seRegistro = true;
            this.arrayDetalleAsistencia.forEach( async (unDetalle) => {
                unDetalle.setIdLista(idLista);
                await unDetalle.registrar();
            });
        }              
        return seRegistro;
    }

    public async eliminar(idLista:number):Promise<boolean>{
        let seElimino:boolean = false;
        this.dListaAsistencia.setId(idLista);                        

        seElimino = await this.dListaAsistencia.eliminar();
        if(seElimino){            
            this.arrayDetalleAsistencia.forEach( async (unDetalle) => {
                unDetalle.setIdLista(idLista);
                await unDetalle.eliminar();
            });
        }              
        return seElimino;
    }

    public async listarDetalle(idLista:number):Promise<any[]>{
        let detalleAsistencia:DDetalleAsistencia = new DDetalleAsistencia();        
        detalleAsistencia.setIdLista(idLista);
        return await detalleAsistencia.listar();        
    }
    

    private cargarArrayDetalle(detalles:any[]){
        // this.arrayDetalleAsistencia = new Array<DDetalleAsistencia>();
        detalles.forEach( (value)=>{
            let unDetalle = new DDetalleAsistencia();            
            unDetalle.setIdPuesto(value.puesto_id);
            unDetalle.setIdComerciante(value.comerciante_id);                        
            unDetalle.setEstado(value.estado);
            this.arrayDetalleAsistencia.push(unDetalle);
        });
    }
    
}