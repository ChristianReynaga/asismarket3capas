import DComerciante from "../datos/DComerciate";

export class NComerciante {

    private dComerciante:DComerciante;

    constructor() {
        this.dComerciante = new DComerciante();
    }

    public listar():Promise<any[]>{
        return this.dComerciante.listar();        
    }
    
    public async registrar(ci:number, nombre: string, apPaterno:string, apMaterno?:string, telefono?:number):Promise<boolean>{
        this.dComerciante.setCI(ci);
        this.dComerciante.setNombre(nombre);
        this.dComerciante.setApPaterno(apPaterno);
        this.dComerciante.setApMaterno(apMaterno);
        this.dComerciante.setTelefono(telefono);
        // this.dComerciante.setEmail(email);
        return await this.dComerciante.registrar();
    }

    public async modificar(ci:number, nombre:string, apPaterno:string, apMaterno?:string, telefono?:number):Promise<boolean>{
        this.dComerciante.setCI(ci);
        this.dComerciante.setNombre(nombre);
        this.dComerciante.setApPaterno(apPaterno);
        this.dComerciante.setApMaterno(apMaterno);
        this.dComerciante.setTelefono(telefono);
        return await this.dComerciante.modificar();
    }

    public async eliminar(ci:number):Promise<boolean>{
        this.dComerciante.setCI(ci);
        return await this.dComerciante.eliminar();
    }

    // public async obtener(ci:number){
    //     this.dComerciante.setCI(ci);
    //     return this.dComerciante.obtener();
    // }
}