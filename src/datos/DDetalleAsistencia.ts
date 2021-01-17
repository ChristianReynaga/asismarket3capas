import Conexion from "./conexion";

export default class DeDetalleAsistencia {
    private idLista:number;
    private idPuesto:string;
    private idComerciante:number;
    private estado:string;

    constructor(){
        this.idLista = -1;
        this.idPuesto = "";
        this.idComerciante = -1;
        this.estado = "F";
    }

    public setIdLista(idLista:number){
        this.idLista = idLista;
    }

    public setIdPuesto(idPuesto:string){
        this.idPuesto = idPuesto;
    }

    public setEstado(es:string){
        if ( es in ["A", "F"]){
            this.estado = es;
        }
    }

    public setIdComerciante( idComerciante:number){
        this.idComerciante = idComerciante;
    }

    public async listar():Promise<any[]>{
        const query = ` SELECT * FROM detalle_asistencia WHERE lista_asistencia_id=? `;
        let detalles:any[] = [];

        await Conexion.ejecutarQuery<any>(query
            , [this.idLista]).then(
                (data) => { 
                    detalles = data;
                }
            ).catch(
                (err) => console.log(err)
            );
        return detalles;
    }

    public async registrar():Promise<boolean>{
        let seRegistro:boolean = false;

        const query = ` INSERT INTO detalle_asistencia (lista_asistencia_id, puesto_id, comerciante_id, estado) VALUES (?,?,?,?)  `;

        await Conexion.ejecutarQuery(
            query, [this.idLista, this.idPuesto, this.idComerciante, this.estado]
        ).then(
            (data) => {
                seRegistro = true;
                console.log("DDETALLEASISTENCIA: insertado");
            }
        ).catch(
            (err) => console.log(err)
        );
        return seRegistro;
    }


    // public async registrar( detalles:any[]):Promise<boolean>{
    //     let seRegistro:boolean = false; 
        
    //     if(this.idLista == -1) return seRegistro;

    //     const queryDetalle: string = ` INSERT INTO detalle_asistencia
    //                          ( lista_asistencia_id, puesto_id, comerciante_id, estado) VALUES (?,?, ?, ?) `; 

    //     const promesas = detalles.map((unDetalle, index) => {
    //         return Conexion.ejecutarQuery<any>(queryDetalle, [
    //             this.idLista, unDetalle.puesto_id, unDetalle.comerciante_id, unDetalle.estado ])
    //     });

    //     await Promise.all(promesas)
    //         .then((resultados) => {
    //             console.log('DPUESTO: nuevos registros insertado');
    //             seRegistro = true;
    //         })
    //         .catch((error) => console.log("DPUESTO-Error:", error));
    //     return seRegistro;
    // }


}