import DPuesto from "../datos/DPuesto";

export class NPuesto {

    private dPuesto:DPuesto;

    constructor() {
        this.dPuesto = new DPuesto();
    }

    public listar():Promise<any[]>{
        return this.dPuesto.listar();        
    }
    
    public async registrar(cod:string, estado:string, sector_id?:number, comerciante_id?:number):Promise<boolean>{
        this.dPuesto.setCod(cod);
        this.dPuesto.setEstado(estado);
        return await this.dPuesto.registrar(sector_id, comerciante_id);

    }

    public async eliminar(cod:string):Promise<boolean>{  
        this.dPuesto.setCod(cod)      ;
        return await this.dPuesto.eliminar();
    }

    public async modificar(cod:string, estado:string, sector_id:number, comerciante_id:number):Promise<boolean>{
        this.dPuesto.setCod(cod);
        this.dPuesto.setEstado(estado);
        
        return await this.dPuesto.modificar(sector_id, comerciante_id);
    }


    public  getPuestos(comerciante_id:number):Promise<any[]>{
        return this.dPuesto.getPuestos(comerciante_id);
    }
    
}