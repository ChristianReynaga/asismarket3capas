import DListaAsistencia from "../datos/DListaAsistencia";
import DeDetalleAsistencia from "../datos/DDetalleAsistencia";

export class NListaAsistencia {

    private dListaAsistencia :DListaAsistencia;
    private dDetalleAsistencia: DeDetalleAsistencia;

    constructor() {
        this.dListaAsistencia = new DListaAsistencia();
        this.dDetalleAsistencia = new DeDetalleAsistencia();
    }

    public listar():Promise<any[]>{
        return this.dListaAsistencia.listar();        
    }

    public async registrar(fecha:Date, detalles:any[]):Promise<boolean>{
        
        let seRegistro:boolean = false;
        
        let idLista:number = -1;
        await this.dListaAsistencia.registrar(fecha).then( async ( idLista ) => {            
            if (idLista != -1){
                this.dDetalleAsistencia.setIdLista(idLista);
                await this.dDetalleAsistencia.registrar(detalles).then(
                    (res:boolean) => {
                        if(res){
                            console.log("NLISTAASISTENCIA: se registro los detalles");
                            seRegistro = true;
                        }
                    }
                );
            }
        }).catch( (err) => console.log(err, "NLISTAASISTENCIA: Error al insertar los datos"));
        
        return seRegistro;
    }
    
}