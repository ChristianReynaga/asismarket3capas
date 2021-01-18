import Conexion from "./conexion";

export default class DListaAsistencia {

    private id?: number;
    private fecha: Date;


    constructor(id?: number, fecha?: Date) {
        this.id = id || -1;
        this.fecha = fecha || new Date();
    }

    public setId(id:number){
        this.id = id;
    }

    public setFecha(fecha:Date){
        this.fecha = fecha;
    }



    public async listar(): Promise<any[]> {
        var query: string = ` SELECT lista_asistencia.id, lista_asistencia.fecha FROM lista_asistencia `;

        var listas: any[] = [];

        await Conexion.ejecutarQuery<any>(query, []).then(
            (data) => {
                listas = data;
            }
        ).catch(
            (err) => console.log(err)
        );
        return listas;
    }
   

    public async registrar(): Promise<number>{
        let idLista:number = -1; 
        const queryHeader:string = ` INSERT INTO lista_asistencia (fecha) VALUES (?) `;
        await Conexion.ejecutarQuery<any>(queryHeader, [this.fecha]).then(
            (data) => {                                                
                idLista = data["insertId"];
            }).catch((err) => console.log(err)
        );
        return idLista;
    }

    public async eliminar(): Promise<boolean>{      
        let seElimino = false;  
        const query:string = ` DELETE FROM lista_asistencia WHERE id=? `;
        await Conexion.ejecutarQuery<any>(query, [this.id]).then(
            (data) => {                                                
                console.log("DListaAsistencia: registro eliminado");
                seElimino = true;
            }).catch((err) => console.log(err)
        );
        return seElimino;
    }

    public async modificar(): Promise<boolean>{      
        let seModifico = false;  
        const query:string = ` UPDATE lista_asistencia SET fecha=? WHERE id=? `;
        await Conexion.ejecutarQuery<any>(query, [this.fecha, this.id]).then(
            (data) => {                                                
                console.log("DListaAsistencia: registro modificado");
                seModifico = true;
            }).catch((err) => console.log(err)
        );
        return seModifico;
    } 

}