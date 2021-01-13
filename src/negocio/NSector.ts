import DSector from "../datos/DSector";

export default class NSector {

    private dSector:DSector;

    constructor() {
        this.dSector = new DSector();
    }

    public listar():Promise<any[]>{
        return this.dSector.listar();        
    }

    public async registrar( cod:number, nombre: string):Promise<boolean>{
        this.dSector.setCod(cod);
        this.dSector.setNombre(nombre);        
        return await this.dSector.registrar();
    }

    public async modificar(cod:number, nombre:string):Promise<boolean>{
        this.dSector.setCod(cod);
        this.dSector.setNombre(nombre);
        
        return await this.dSector.modificar();
    }

    public async eliminar(cod:number):Promise<boolean>{
        this.dSector.setCod(cod);
        return await this.dSector.eliminar();
    }

   
       
    
}