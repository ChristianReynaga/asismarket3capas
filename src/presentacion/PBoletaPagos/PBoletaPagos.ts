import { Router, Request, Response } from "express";
import { NBoletaPagos } from "../../negocio/NBoletaPagos";
import { NComerciante } from "../../negocio/NComerciante";
import { NPuesto } from "../../negocio/NPuesto";

export default class PBoletaPagos {
    private nBoletaPagos: NBoletaPagos;
    private nComerciante: NComerciante;
    private nPuestos: NPuesto;

    private listaComerciantes:any[];
            
    public router: Router = Router();

    constructor() {
        this.nBoletaPagos = new NBoletaPagos();
        this.nComerciante = new NComerciante();
        this.nPuestos = new NPuesto();
        this.crearRutas();
        this.listaComerciantes = [];
        // this.listar();
        // this.listarPuestos();
    }

    public async listar(req: Request, res: Response) {
        let listaBoletas:any[] = await this.nBoletaPagos.listar();
        this.listaComerciantes = await this.nComerciante.listar();

        res.render('PBoletaPagos/boleta', {
            boletas: listaBoletas,
            comerciantes: this.listaComerciantes
        });
    }

    public async registrar(req:Request, res:Response){        
        const {fecha, comerciante_id} = req.body;                        
        let detalle = this.cargarDetalle(req);                
        this.nBoletaPagos.registrar(fecha, Number(comerciante_id), detalle);
        res.redirect('/pagos');
    }

    public async editar(req:Request, res:Response){
        const {  nroBoleta } = req.body;         
        let boleta:any = await this.nBoletaPagos.obtener(nroBoleta);        
        let detalles:any[] = await this.nBoletaPagos.listarDetalle(nroBoleta);
        let comerciante: any = await this.nComerciante.obtener(boleta.comerciante_id);
    

        res.render('PBoletaPagos/editar', {                                    
            nroBoleta,
            fecha:boleta.fecha, 
            monto_total:boleta.monto_total,
            comerciante_id: boleta.comerciante_id,
            nombre: comerciante.nombre,
            apPaterno: comerciante.apPaterno,
            detalles : detalles,
            comerciantes: this.listaComerciantes                
        });   
    }

    public async modificar(req:Request, res:Response){
        const {nroBoleta, fecha, comerciante_id} = req.body;        
        let detalle = this.cargarDetalle(req);
        this.nBoletaPagos.modificar( nroBoleta, fecha, Number(comerciante_id), detalle);
        res.redirect('/pagos');
    }

    public async eliminar(req:Request, res:Response){
        const {nroBoleta} = req.body;        
        await this.nBoletaPagos.eliminar(Number(nroBoleta));

        res.redirect('/pagos');
    }

    private cargarDetalle(req:Request):any[]{
        var ps:any[] = [];
        var ms:any[] = [];
        var ts:any[] = [];
        
        for ( let p in req.body )  {
            if(p.startsWith('p')) ps.push(p)
            else if (p.startsWith('m')) ms.push(p)
            else if (p.startsWith('t')) ts.push(p)
        };

        ps.sort();
        ms.sort();
        ts.sort();

        let detalle:any[] = [];

        ps.forEach((value, index) => {
            // console.log(value);
            detalle.push(  ( { "puesto_id": req.body[value] ,"monto" : req.body[ms[index]] , "tipo": req.body[ts[index] ] })              
            );             
        });

        return detalle;
    }
    

    public async listarPuestos(req: Request, res: Response) {
        const { comerciante_id } = req.body;        
        let listaPuestos:any[] = await this.nPuestos.getPuestos(Number(comerciante_id));        
        res.send(listaPuestos);
    }

    public crearRutas(): void {
        this.router.route('/').get((req: Request, res: Response) => this.listar(req, res));
        this.router.route('/get_puestos').post((req: Request, res: Response) => this.listarPuestos(req,res));
        this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req,res));            
        this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }

}