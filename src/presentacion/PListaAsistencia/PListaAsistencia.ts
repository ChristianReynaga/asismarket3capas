import { Router, Request, Response } from 'express';
import { NComerciante } from '../../negocio/NComerciante';
import { NListaAsistencia } from '../../negocio/NListaAsistencia';
import { NPuesto } from '../../negocio/NPuesto';

export default class PListaAsistencia {
    private listaAsistencias: any[];
    private listaPuestos: any[];
    private listaComerciantes:any[];
    private nListaAsistencia: NListaAsistencia;
    private nPuesto: NPuesto;
    private nComerciante:NComerciante;
    public router: Router = Router();

    constructor() {
        this.listaAsistencias = [];
        this.nListaAsistencia = new NListaAsistencia();
        this.nPuesto = new NPuesto();
        this.nComerciante = new NComerciante();
        this.crearRutas();        
    }

    public async listar(req: Request, res: Response) {
        this.listaAsistencias = await this.nListaAsistencia.listar();
        this.listaPuestos = await this.nPuesto.listar();
        this.listaComerciantes = await this.nComerciante.listar();

        let detalles:any[] = [];
        this.listaPuestos.map( (p)=>{
            this.listaComerciantes.forEach( (c) =>{
                if(p.comerciante_id  == c.ci){
                    detalles.push({"apPaterno": c.apPaterno, "nombre": c.nombre, "puesto_id": p.cod, "sector": p.sector});
                }
            });
        })

        res.render("PListaAsistencia/lista", {
            listas: this.listaAsistencias,
            detalles: detalles
        });
    }


    public async registrar(req: Request, res: Response) {
        const { fecha } = req.body;

        let reqbody: Map<string, any> = req.body;        
        let detalles:any[] = [];        

        if(this.listaPuestos && this.listaPuestos.length > 0){       
            this.listaPuestos.forEach((unPuesto) => {    

                let unDetalle:any = { "puesto_id" : unPuesto.cod, "comerciante_id" : unPuesto.comerciante_id, "estado":"F" };
                
                if (unPuesto.cod in reqbody) {
                    unDetalle.estado = "A"
                }
                detalles.push(unDetalle);
            });            
            await this.nListaAsistencia.registrar(fecha, detalles);
        }
        res.redirect('/asistencia');
    }

    public async modificar(req:Request, res:Response){
        const { idLista, fecha } = req.body;

        let reqbody: Map<string, any> = req.body;        
        let detalles:any[] = [];

        if(this.listaPuestos && this.listaPuestos.length > 0){       
            this.listaPuestos.forEach((elem) => {    

                let unDetalle:any = { "puesto_id" : elem.cod, "comerciante_id" : elem.comerciante_id, "estado":"F" };
                
                if (elem.cod in reqbody) {
                    unDetalle.estado = "A"
                }
                detalles.push(unDetalle);
            });
            await this.nListaAsistencia.modificar(idLista, fecha, detalles);            
        }
        res.redirect('/asistencia');
    }

    public async eliminar(req:Request, res:Response){
        const {nroBoleta} = req.body;        
        await this.nListaAsistencia.eliminar(Number(nroBoleta));

        res.redirect('/pagos');
    }

    public async editar(req: Request, res: Response) {
        const { idLista, fecha } = req.body;            
        let detalles:any[] = await this.nListaAsistencia.listarDetalle(idLista);
        let detallesCompletos:any[] =[];

        detalles.forEach( (unDetalle) =>{
            const {cod , sector } = this.cargarPuesto(unDetalle.puesto_id);  
            const {nombre, apPaterno} = this.cargarComerciante(unDetalle.comerciante_id);            
            
            let estadoB: boolean = false;
            if (unDetalle.estado == 'A') estadoB = true;

            let data = { "puesto_id" : cod, 
                        "sector": sector,  
                        "comerciante_id" : unDetalle.comerciante_id, 
                        "estado": estadoB,
                        "nombre" : nombre,                        
                        "apPaterno" : apPaterno
                     }
            detallesCompletos.push(data);
        });

            res.render('PListaAsistencia/editar', {
                idLista,
                fecha, 
                detalles : detallesCompletos                    
            });        
    }
    

    private cargarPuesto(cod:string): any{
        const finded =  this.listaPuestos.find( (value) => value.cod === cod );
        return finded;
    }

    private cargarComerciante(ci:number): any{
        const founded =  this.listaComerciantes.find( (value) =>value.ci === ci);
        return founded;
    }


    public crearRutas(): void {
        this.router.route('/').get(async (req: Request, res: Response) => this.listar(req, res));
        this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req, res));
        this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }

}
