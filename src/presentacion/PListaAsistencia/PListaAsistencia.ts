import { Router, Request, Response } from 'express';
import { NComerciante } from '../../negocio/NComerciante';
import { NListaAsistencia } from '../../negocio/NListaAsistencia';
import { NPuesto } from '../../negocio/NPuesto';

export default class PListaAsistencia {
    private listas: any[];
    private puestos: any[];
    private comerciantes:any[];
    private nListaAsistencia: NListaAsistencia;
    private nPuesto: NPuesto;
    private nComerciante:NComerciante;
    public router: Router = Router();

    constructor() {
        this.listas = [];
        this.nListaAsistencia = new NListaAsistencia();
        this.nPuesto = new NPuesto();
        this.nComerciante = new NComerciante();
        this.crearRutas();        
    }

    public async listar(req: Request, res: Response) {
        this.listas = await this.nListaAsistencia.listar();
        this.puestos = await this.nPuesto.listar();
        this.comerciantes = await this.nComerciante.listar();

        let detalles:any[] = [];


        this.puestos.map( (p)=>{
            this.comerciantes.forEach( (c) =>{
                if(p.comerciante_id  == c.ci){
                    detalles.push({"apPaterno": c.apPaterno, "nombre": c.nombre, "cod": p.cod, "sector": p.sector});
                }
            });
        })

        res.render("PListaAsistencia/lista", {
            listas: this.listas,
            detalles: detalles
        });
    }

    public async registrar(req: Request, res: Response) {
        const { fecha } = req.body;

        let reqbody: Map<string, any> = req.body;
        // console.log(reqbody);
        let detalles:any[] = [];

        if(this.puestos && this.puestos.length > 0){       
            this.puestos.forEach((elem) => {    

                let unDetalle:any = { "puesto_id" : elem.cod, "comerciante_id" : elem.comerciante_id, "estado":"F" };
                
                if (elem.cod in reqbody) {
                    unDetalle.estado = "A"
                }
                detalles.push(unDetalle);
            });
            await this.nListaAsistencia.registrar(fecha, detalles);
        }
        res.redirect('/asistencia');
    }

    public crearRutas(): void {
        this.router.route('/').get((req: Request, res: Response) => this.listar(req, res));
        this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req, res));
        // this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        // this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        // this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }

}
