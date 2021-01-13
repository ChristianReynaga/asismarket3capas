import { Router, Request, Response } from 'express';
import { NListaAsistencia } from '../../negocio/NListaAsistencia';
import { NPuesto } from '../../negocio/NPuesto';

export default class PListaAsistencia {
    private listas: any[];
    private puestos: any[];
    private nListaAsistencia: NListaAsistencia;
    private nPuesto: NPuesto;
    public router: Router = Router();

    constructor() {
        this.listas = [];
        this.nListaAsistencia = new NListaAsistencia();
        this.nPuesto = new NPuesto();
        this.crearRutas();
        // this.listar();
        // this.registrar();
    }

    public async listar(req: Request, res: Response) {
        this.listas = await this.nListaAsistencia.listar();
        this.puestos = await this.nPuesto.listar();

        res.render("PListaAsistencia/lista", {
            listas: this.listas,
            puestos: this.puestos
        });
    }

    public async registrar(req: Request, res: Response) {
        const { fecha } = req.body;

        let reqbody: Map<string, any> = req.body;

        this.puestos.forEach((elem) => {
            if (elem.cod in reqbody) {
                elem.estado = "A"
            } else {
                elem.estado = "F"
            }
        });
        await this.nListaAsistencia.registrar(fecha, this.puestos);
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
