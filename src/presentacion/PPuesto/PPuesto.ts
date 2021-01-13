import {Router, Request, Response } from 'express';
import { NComerciante } from '../../negocio/NComerciante';
import { NPuesto } from '../../negocio/NPuesto';
import  NSector  from '../../negocio/NSector';

export default class PPuesto{
    private listSector:any[];
    private listComerciantes:any[];
    private listPuesto : any[];

    private nPuesto:NPuesto;
    private nSector:NSector;  
    private nComerciante: NComerciante;  
    public router:Router = Router();

    constructor() {
        this.listPuesto = [];
        this.nPuesto = new NPuesto();
        this.nSector = new NSector();     
        this.nComerciante = new NComerciante();
        this.crearRutas();
        // this.listar();
        // this.registrar();
        // this.eliminar();
    }

    public async listar(req:Request, res:Response){                 
        // const result = await this.nComerciante.listar();
        this.listPuesto = await  this.nPuesto.listar();
        this.listSector = await this.nSector.listar();
        this.listComerciantes = await this.nComerciante.listar();
        
        res.render("PPuesto/puesto",{
            puestos: this.listPuesto,
            sectores: this.listSector ,
            comerciantes: this.listComerciantes            
        });     
    }

    public async registrar(req:Request, res:Response){
        const {cod, estado, sector_id, comerciante_id} = req.body;

            await this.nPuesto.registrar(cod, estado, Number(sector_id), Number(comerciante_id));
            res.redirect('/puestos');
    }

    public editar(req: Request, res: Response) {
        const { cod, estado, sector_id, comerciante_id, sector_nombre, comerciante_nombre } = req.body;                        
            res.render('PPuesto/editar', {
                cod: cod,
                estado: estado, 
                sectores: this.listSector,
                comerciantes: this.listComerciantes,
                sector_nombre: sector_nombre,
                sector_id: sector_id,
                comerciante_id: comerciante_id,
                comerciante_nombre        
            });        
    }

    public async modificar(req: Request, res: Response) {
        const { cod, estado, sector_id, comerciante_id } = req.body;            
            const resp = await this.nPuesto.modificar(cod, estado, Number(sector_id), Number(comerciante_id));
            res.redirect('/puestos');        
    }

    public async eliminar(req:Request, res:Response){
        const cod = req.body.cod;
            await this.nPuesto.eliminar(cod);
            res.redirect('/puestos');
    }

    public crearRutas(): void {
        this.router.route('/').get((req: Request, res: Response) => this.listar(req, res));
        this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req,res));            
        this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }  

    
}
