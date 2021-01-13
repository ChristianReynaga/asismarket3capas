import DListaAsistencia from "../datos/DListaAsistencia";

export class NListaAsistencia {

    private dListaAsistencia :DListaAsistencia;

    constructor() {
        this.dListaAsistencia = new DListaAsistencia();
    }

    public listar():Promise<any[]>{
        return this.dListaAsistencia.listar();        
    }

    public registrar(fecha:Date, puestos:any[]):Promise<boolean>{
        return this.dListaAsistencia.registrar(fecha, puestos);
    }
    
}