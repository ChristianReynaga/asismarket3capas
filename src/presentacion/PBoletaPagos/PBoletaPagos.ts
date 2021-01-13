import { Router, Request, Response, request } from "express";
import { NBoletaPagos } from "../../negocio/NBoletaPagos";
import { NComerciante } from "../../negocio/NComerciante";
import { NPuesto } from "../../negocio/NPuesto";

export default class PBoletaPagos {
    private listaBoletas: any[];
    private listaComerciantes: any[];
    private listaPuestos: any[];
    private nBoletaPagos: NBoletaPagos;
    private nComerciante: NComerciante;
    private nPuestos: NPuesto;
    public router: Router = Router();

    constructor() {
        this.nBoletaPagos = new NBoletaPagos();
        this.nComerciante = new NComerciante();
        this.nPuestos = new NPuesto();
        this.crearRutas();
        // this.listar();
        // this.listarPuestos();
    }

    public async listar(req: Request, res: Response) {
        this.listaBoletas = await this.nBoletaPagos.listar();
        this.listaComerciantes = await this.nComerciante.listar();

        res.render('PBoletaPagos/boleta', {
            boletas: this.listaBoletas,
            comerciantes: this.listaComerciantes
        });
    }

    public async listarPuestos(req: Request, res: Response) {
        const { comerciante_id } = req.body;
        // console.log(req.body);
        this.listaPuestos = await this.nPuestos.getPuestos(Number(comerciante_id));
        // console.log(this.listPuestos);
        res.send(this.listaPuestos);
    }

    public crearRutas(): void {
        this.router.route('/').get((req: Request, res: Response) => this.listar(req, res));
        this.router.route('get_puestos').post((req: Request, res: Response) => this.listarPuestos(req,res));
        // this.router.route('/registrar').post(async (req: Request, res: Response) => this.registrar(req,res));            
        // this.router.route('/editar').post(async (req: Request, res: Response) => this.editar(req,res));
        // this.router.route('/modificar').put(async (req: Request, res: Response) => this.modificar(req,res));
        // this.router.route('/eliminar').delete(async (req: Request, res: Response) => this.eliminar(req,res));
    }

}