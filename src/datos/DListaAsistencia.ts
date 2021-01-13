import Conexion from "./conexion";

export default class DListaAsistencia {

    private id?: number;
    private fecha: Date;


    constructor(id?: number, fecha?: Date) {
        this.id = id || -1;
        this.fecha = fecha || new Date();
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
   

    public async registrar(fecha:Date): Promise<number>{
        let idLista:number = -1; 
        const queryHeader:string = ` INSERT INTO lista_asistencia (fecha) VALUES (?) `;
        await Conexion.ejecutarQuery<any>(queryHeader, [fecha]).then(
            (data) => {                                                
                idLista = data["insertId"];
            }).catch((err) => console.log(err)
        );
        return idLista;
    }

}