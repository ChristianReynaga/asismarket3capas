import { Router, Request, Response } from 'express';
import NSector  from '../../negocio/NSector';

export default class PSector {
    public router: Router = Router();
    private nSector: NSector;
    private listaSectores: any[];

    constructor() {
        this.listaSectores = [];
        this.nSector = new NSector();
        this.crearRutas();
        // this.registrar();
        // this.editar();
        // this.modificar();
        // this.eliminar();
    }

    public async listar(req: Request, res: Response) {
        this.listaSectores = await this.nSector.listar();
        res.render("PSector/sector", {
            sectores: this.listaSectores,
        });
    }

    public async registrar(req: Request, res: Response) {
        const { cod, nombre } = req.body;
        const resp = await this.nSector.registrar( cod, nombre);
        res.redirect('/sectores');        
    }

    public editar(req: Request, res: Response) {
        const { cod, nombre } = req.body;
            // const resp = await this.nComerciante.modificar(ci, nombre, apPaterno);            
            res.render('PSector/editar', {
                cod: Number(cod),
                nombre: nombre,                
            });        
    }

    public async modificar(req: Request, res: Response) {
        const { cod, nombre } = req.body;            
            const resp = await this.nSector.modificar(Number(cod), nombre);
            res.redirect('/sectores');        
    }

    public async eliminar(req: Request, res: Response) {
        const cod: number = Number(req.body.cod);
            const resp = await this.nSector.eliminar(cod);
            res.redirect('/sectores');
    }

    public crearRutas(): void {
        this.router.route('/').get((req: Request, res: Response) => this.listar(req, res));
        this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req,res));            
        this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }    

}

