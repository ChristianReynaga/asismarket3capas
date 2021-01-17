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
        this.dPuesto.setSectorID(sector_id);
        this.dPuesto.setComercianteID(comerciante_id);
        return await this.dPuesto.registrar();

    }

    public async eliminar(cod:string):Promise<boolean>{  
        this.dPuesto.setCod(cod)      ;
        return await this.dPuesto.eliminar();
    }

    public async modificar(cod:string, estado:string, sector_id:number, comerciante_id:number):Promise<boolean>{
        this.dPuesto.setCod(cod);
        this.dPuesto.setEstado(estado);
        this.dPuesto.setSectorID(sector_id);
        this.dPuesto.setComercianteID(comerciante_id);    
        return await this.dPuesto.modificar();
    }


    public  getPuestos(comerciante_id:number):Promise<any[]>{
        this.dPuesto.setComercianteID(comerciante_id);
        return this.dPuesto.getPuestos();
    }
    
}