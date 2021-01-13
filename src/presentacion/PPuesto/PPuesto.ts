import {Router, Request, Response } from 'express';
import { NComerciante } from '../../negocio/NComerciante';
import { NPuesto } from '../../negocio/NPuesto';
import  NSector  from '../../negocio/NSector';

export default class PPuesto{
    private listaSector:any[];
    private listaComerciantes:any[];
    private listaPuesto : any[];

    private nPuesto:NPuesto;
    private nSector:NSector;  
    private nComerciante: NComerciante;  
    public router:Router = Router();

    constructor() {
        this.listaPuesto = [];
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
        this.listaPuesto = await  this.nPuesto.listar();
        this.listaSector = await this.nSector.listar();
        this.listaComerciantes = await this.nComerciante.listar();
        
        
        let propiedades:any[] = [];
        this.listaPuesto.map( (p)=>{
            this.listaComerciantes.forEach( (c) =>{
                if(p.comerciante_id  == c.ci){
                    propiedades.push({"apPaterno": c.apPaterno, "nombre": c.nombre, "cod": p.cod, "sector": p.sector, "estado":p.estado, "sector_id":p.sector_id, "comerciante_id":p.comerciante_id});
                }
            });
        });

        res.render("PPuesto/puesto",{
            propiedades: propiedades,
            sectores: this.listaSector ,
            comerciantes: this.listaComerciantes            
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
                sectores: this.listaSector,
                comerciantes: this.listaComerciantes,
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
