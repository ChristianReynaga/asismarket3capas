import { DBoletaPagos } from "../datos/DBoletaPagos";

export class NBoletaPagos {
    private dboletaPagos : DBoletaPagos;

    constructor(){
        this.dboletaPagos = new DBoletaPagos();
    }

    public listar():Promise<any[]>{
        return this.dboletaPagos.listar();
    }

    
}