import Conexion from "./conexion";

export default class DComerciante{
    private ci?: number;
    private nombre?:string;
    private apPaterno?: string;
    private apMaterno?: string;
    private telefono?: number;
    
    

    // private conectionDB:MySQL;

    constructor(  ci?:number, nombre?:string, apPaterno?:string, apMaterno?:string, telefono?:number ){
        this.ci = ci || -1;
        this.nombre = nombre || "";
        this.apPaterno = apPaterno || "";
        this.apMaterno = apMaterno || "";
        this.telefono= telefono || 0;                  
        // this.conectionDB = MySQL.instance;
    }

    public setCI(ci:number){
        this.ci = ci;        
    }
    
    public setNombre(nom:string){
        this.nombre = nom;
    }
    
    public setApPaterno(apPaterno:string){
        this.apPaterno = apPaterno;
    }


    public setApMaterno(apMaterno:string){
        this.apMaterno = apMaterno || "";
    }

    public setTelefono(telefono:number){
        this.telefono = telefono || 0;
    }

           
    public async listar(): Promise<any[]> {
        var query:string = `
        SELECT comerciante.ci, comerciante.nombre, comerciante.apPaterno, comerciante.apMaterno, comerciante.telefono  FROM comerciante`;

        var comerciantes:any[] = [];

        await Conexion.ejecutarQuery<any>(query, []).then(
            ( data) => {
                comerciantes = data
            }
        ).catch(
            (err) => console.log(err)
        );        
        return comerciantes;        
    }

    public async registrar():Promise<boolean>{
    
        let seRegistro:boolean = false;

        if (this.ci === -1 || this.nombre === "" || this.apPaterno === "" )
            return seRegistro;

        const query = `
            INSERT INTO comerciante (ci, nombre, apPaterno, apMaterno, telefono ) VALUES (?, ?, ?,?,?)
            `;

        await Conexion.ejecutarQuery<any>(query, 
            [ this.ci, this.nombre, this.apPaterno, this.apMaterno, this.telefono ])
            .then(                
                (data) => {
                    console.log('DCOMERCIANTE: nuevo registro insertado');
                    seRegistro = true;
                }
            ).catch(
                (err) => console.log(err)
        );
        return seRegistro;
    }

    
    public async modificar():Promise<boolean>{
        let modificado = false;
        
        const query = ` UPDATE comerciante SET nombre=?, apPaterno=?, apMaterno=?, telefono=? where ci = ?`;

        await Conexion.ejecutarQuery(query, 
            [this.nombre, this.apPaterno, this.apMaterno, this.telefono, this.ci])
            .then(
                (data) => {
                    console.log('DCOMERCIANTE: registro modificado');
                    modificado = true;
                }
            ).catch(
                (err) => console.log(err)
            );
        return modificado;
    }

    public async eliminar():Promise<boolean>{
        const query = `
            DELETE FROM comerciante WHERE ci=?`;
        let eliminado = false;

        await Conexion.ejecutarQuery(query, 
            [this.ci])
            .then(
                (data) => {
                    console.log('DCOMERCIANTE: registro eliminado');
                    eliminado=true;
                }
            ).catch(
                (err) => console.log(err)
            );
        return eliminado;
    }

    public async obtener():Promise<any>{
        const query = `
            SELECT comerciante.ci, comerciante.nombre, comerciante.apPaterno FROM comerciante WHERE ci=?`;

        var comerciante:any = null;
        await Conexion.ejecutarQuery<any[]>(query, 
            [this.ci])
            .then(
                (data) => {
                    if(data.length == 0){
                        console.log('DCOMERCIANTE: no hay datos')
                    }else{
                        comerciante = {
                            "ci" : data[0].ci,
                            "nombre" : data[0].nombre,                        
                         "apPaterno" : data[0].apPaterno
                        }
                    }
                }
            ).catch(
                (err) => console.log(err)
            );
        return comerciante;
    }

}