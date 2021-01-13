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

    public async registrar(fecha: Date, puestos: any[]): Promise<boolean> {
        let seRegistro:boolean = false;        

        let idLista:number = await this.registrarLista(fecha);
            
        if(idLista != -1){
            await this.registrarDetalle(idLista, puestos);
        }else{
            return seRegistro;
        }
    
        return seRegistro;                
    }

    private async registrarLista(fecha:Date): Promise<number>{
        let idLista:number = -1; 
        const queryHeader:string = ` INSERT INTO lista_asistencia (fecha) VALUES (?)`;
        await Conexion.ejecutarQuery<any>(queryHeader, [fecha]).then(
            (data) => {                                                
                idLista = data["insertId"];
            }).catch((err) => console.log(err)
        );
        return idLista;
    }

    private async registrarDetalle(idLista:number, puestos:any[]):Promise<boolean>{
        let seRegistro:boolean = false; 
        const queryDetalle: string = ` INSERT INTO detalle_asistencia
                             ( lista_asistencia_id, id, puesto_id, comerciante_id, estado) VALUES (?,?, ?, ?, ?) `; 

        const promesas = puestos.map((unPuesto, index) => {
            return Conexion.ejecutarQuery<any>(queryDetalle, [
                idLista, index+1, unPuesto.cod, unPuesto.comerciante_id, unPuesto.estado ])
        });

        await Promise.all(promesas)
            .then((resultados) => {
                console.log('DPUESTO: nuevo registro insertado');
                seRegistro = true;
            })
            .catch((error) => console.log("Error", error));
        return seRegistro;
    }
}