import { Router, Request, Response } from 'express';
import { NComerciante } from '../../negocio/NComerciante';

export default class PComerciante {
    public router: Router = Router();
    private nComerciante: NComerciante;    

    constructor() {        
        this.nComerciante = new NComerciante();
        this.crearRutas();
        // this.registrar();
        // this.editar();
        // this.modificar();
        // this.eliminar();
    }

    public async listar(req: Request, res: Response) {
        let results:any[] = await this.nComerciante.listar();
        res.render("PComerciante/comerciante", {
            comerciantes: results,
        });
    }

    public async registrar(req: Request, res: Response) {
        const { ci, nombre, apPaterno, apMaterno, telefono } = req.body;
        const resp = await this.nComerciante.registrar(Number(ci), nombre, apPaterno, apMaterno, Number(telefono));
        res.redirect('/comerciantes');        
    }

    public editar(req: Request, res: Response) {
        const { ci, nombre, apPaterno, apMaterno, telefono } = req.body;
            // const resp = await this.nComerciante.modificar(ci, nombre, apPaterno);            
            res.render('PComerciante/editar', {
                ci: Number(ci),
                nombre: nombre,
                apPaterno: apPaterno,
                apMaterno: apMaterno,
                telefono: Number(telefono)
            });        
    }

    public async modificar(req: Request, res: Response) {
        const { ci, nombre, apPaterno, apMaterno, telefono } = req.body;            
            const resp = await this.nComerciante.modificar(Number(ci), nombre, apPaterno, apMaterno, Number(telefono));
            res.redirect('/comerciantes');        
    }

    public async eliminar(req: Request, res: Response) {
        const ci: number = Number(req.body.ci);
            const resp = await this.nComerciante.eliminar(ci);
            res.redirect('/comerciantes');
    }

    private crearRutas(): void {
        this.router.route('/').get((req: Request, res: Response) => this.listar(req, res));
        this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req,res));            
        this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }    

}

