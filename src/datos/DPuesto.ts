import Conexion from "./conexion";

export default class DPuesto{
   
    private cod?:string;
    private estado?:string;
    private sector_id:number;
    private comerciante_id:number;

    constructor( cod?:string, estado?:string){
        this.cod = cod || "";
        this.estado = estado || "A";        
    }

    public setCod(cod:string){
        this.cod = cod;
    }

    public setEstado(estado:string){
        this.estado = estado;
    }

    public setSectorID(sector_id:number){
        this.sector_id = sector_id;
    }
    
    public setComercianteID(comerciante_id:number){
        this.comerciante_id = comerciante_id;
    }


    public async listar():Promise<any[]>{
        var query:string = ` SELECT puesto.cod, puesto.estado, puesto.comerciante_id, 
                                sector.nombre as sector, sector.cod as sector_id                             
                            FROM puesto, sector
                            WHERE puesto.sector_id = sector.cod`;

        var puestos:any[] = [];

        await Conexion.ejecutarQuery<any>(query, []).then(
            ( data) => {
                puestos = data
            }
        ).catch(
            (err) => console.log(err)
        );        
        return puestos; 
    }

    
    public async registrar():Promise<boolean>{

        let seRegistro:boolean = false;
       
        const query = ` INSERT INTO puesto (cod, estado, sector_id, comerciante_id) VALUES (?, ?, ?,?)`;
        
        await Conexion.ejecutarQuery(query, 
            [ this.cod, this.estado, this.sector_id, this.comerciante_id ])
            .then(                
                (data) => {
                    console.log('DPUESTO: nuevo registro insertado');
                    seRegistro = true;
                }
            ).catch(
                (err) => console.log(err)
            );

        return seRegistro;
    }

    public async modificar():Promise<boolean>{
        let modificado = false;
        
        const query = ` UPDATE puesto SET estado=?, sector_id=?, comerciante_id=? where cod = ?`;

        await Conexion.ejecutarQuery(query, 
            [ this.estado, this.sector_id, this.comerciante_id, this.cod ])
            .then(
                (data) => {
                    console.log('DPUESTO: registro modificado');
                    modificado = true;
                }
            ).catch(
                (err) => console.log(err)
            );
        return modificado;
    }

    public async eliminar():Promise<boolean>{

        let seElimino:boolean = false;
              
        const query = ` DELETE FROM puesto WHERE cod=? `;
        
        await Conexion.ejecutarQuery(query, 
            [ this.cod ])
            .then(                
                (data) => {
                    console.log('DPUESTO: registro eliminado');
                    seElimino = true;
                }
            ).catch(
                (err) => console.log(err)
            );

        return seElimino;
    }

    public async getPuestos():Promise<any[]>{

        const query = ` SELECT puesto.cod, sector.nombre as sector 
                        FROM puesto, sector 
                        WHERE puesto.sector_id = sector.cod and comerciante_id = ? `;

        var puestos:any[] = [];

        await Conexion.ejecutarQuery<any>(query, [this.comerciante_id])
            .then(
                (data) => {
                    puestos = data;
                }
            ).catch(
                (err) => console.log(err)
            );

        return puestos;

    }

    public async obtener():Promise<any>{

        const query = ` SELECT puesto.cod, sector.nombre as sector 
                        FROM puesto, sector 
                        WHERE puesto.sector_id = sector.cod and puesto.cod = ? `;

        var puesto:any = null;

        await Conexion.ejecutarQuery<any[]>(query, [this.cod])
            .then(
                (data) => {
                    if(data.length == 0){
                        console.log('DCOMERCIANTE: no hay datos')
                    }else{
                        puesto = {
                            "cod" : data[0].cod,
                            "sector" : data[0].sector
                        }                                               
                    }
                }
            ).catch(
                (err) => console.log(err)
            );

        return puesto;

    }

    


}