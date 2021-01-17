import {Router, Request, Response } from 'express';
import { NComerciante } from '../../negocio/NComerciante';
import { NPuesto } from '../../negocio/NPuesto';
import  NSector  from '../../negocio/NSector';

export default class PPuesto{
    private nPuesto:NPuesto;
    private nSector:NSector;  
    private nComerciante: NComerciante;  
    public router:Router = Router();
    

    constructor() {        
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
        let listaSectores = await this.nSector.listar();  
        let listaComerciantes = await this.nComerciante.listar();     
        let listaPuesto:any[] = await  this.nPuesto.listar();                
        listaPuesto = this.prepararLista(listaPuesto, listaComerciantes);

        res.render("PPuesto/puesto",{
            propiedades: listaPuesto,
            sectores: listaSectores,
            comerciantes: listaComerciantes 
        });     
    }

    private prepararLista(listaPuesto:any[], listaComerciantes:any[]):any[]{    
        let propiedades:any[] = [];
        listaPuesto.map( (p)=>{
            listaComerciantes.forEach( (c) =>{
                if(p.comerciante_id  == c.ci){
                    propiedades.push({"apPaterno": c.apPaterno, "nombre": c.nombre, "cod": p.cod, "sector": p.sector, "estado":p.estado, "sector_id":p.sector_id, "comerciante_id":p.comerciante_id});
                }
            });
        });
        return propiedades;
    }

    public async registrar(req:Request, res:Response){
        const {cod, estado, sector_id, comerciante_id} = req.body;

            await this.nPuesto.registrar(cod, estado, Number(sector_id), Number(comerciante_id));
            res.redirect('/puestos');
    }

    public async editar(req: Request, res: Response) {
        const { cod, estado, sector_id, comerciante_id, sector_nombre, comerciante_nombre } = req.body;    
        let sectores = await this.nSector.listar();  
        let comerciantes = await this.nComerciante.listar();                        
            res.render('PPuesto/editar', {
                cod,
                estado, 
                sectores,
                comerciantes,
                sector_nombre,
                sector_id,
                comerciante_id,
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

    private crearRutas(): void {
        this.router.route('/').get((req: Request, res: Response) => this.listar(req, res));
        this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req,res));            
        this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }  

    
}
