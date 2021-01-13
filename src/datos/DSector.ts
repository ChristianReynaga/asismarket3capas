import Conexion from "./conexion";

export default class DSector{
   
    private cod?:number;
    private nombre?:string;    
    

    constructor( cod?:number, nombre?:string){
        this.cod = cod || -1;
        this.nombre = nombre || "";        
        
    }

    public setCod(cod:number){
        this.cod = cod;
    }

    public setNombre( nombre: string){
        this.nombre = nombre;
    }
   

    
    public async listar():Promise<any[]>{
        var query:string = ` SELECT cod, nombre FROM sector `;

        var sectores:any[] = [];

        await Conexion.ejecutarQuery<any>(query, []).then(
            ( data) => {
                sectores = data
            }
        ).catch(
            (err) => console.log(err)
        );        
        return sectores; 
    }
    
    public async registrar():Promise<boolean>{        
        let seRegistro:boolean = false;

        const query = ` INSERT INTO sector (cod, nombre ) VALUES (?, ?)`;

        await Conexion.ejecutarQuery<any>(query, 
            [ this.cod, this.nombre])
            .then(                
                (data) => {
                    console.log('DSECTOR: nuevo registro insertado');
                    seRegistro = true;
                }
            ).catch(
                (err) => console.log(err)
        );
        return seRegistro;
    }
    
    public async modificar():Promise<boolean>{
        let modificado = false;
        
        const query = ` UPDATE sector SET nombre=? where cod = ?`;

        await Conexion.ejecutarQuery(query, 
            [this.nombre, this.cod ])
            .then(
                (data) => {
                    console.log('DSECTOR: registro modificado');
                    modificado = true;
                }
            ).catch(
                (err) => console.log(err)
            );
        return modificado;
    }
    
    public async eliminar():Promise<boolean>{
        const query = `
            DELETE FROM sector WHERE cod=?`;
        let eliminado = false;

        await Conexion.ejecutarQuery(query, 
            [this.cod])
            .then(
                (data) => {
                    console.log('DSECTOR: registro eliminado');
                    eliminado=true;
                }
            ).catch(
                (err) => console.log(err)
            );
        return eliminado;
    }
    


}