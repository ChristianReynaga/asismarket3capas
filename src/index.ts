import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import moment from 'moment';
import 'moment/locale/es';

import PComerciante from './presentacion/PComerciante/PComerciante';
import PPuesto from './presentacion/PPuesto/PPuesto';
import PListaAsistencia from './presentacion/PListaAsistencia/PListaAsistencia';
import  PBoletaPagos  from './presentacion/PBoletaPagos/PBoletaPagos';
import  PSector  from './presentacion/PSector/PSector';

const port = Number(process.env.PORT) || 3000;

const app = express();

app.set('port', port);

// app.set("views", path.join(__dirname, "presentacion"));  
app.set("views", path.join(__dirname, "presentacion"));  

app.engine('.hbs', exphbs({
    extname: '.hbs',
    partialsDir: path.join(app.get('views'), 'partials'),
    // layoutsDir:  path.join(app.get('views'), 'layout'),
    defaultLayout: 'main',   
    helpers:{
        tipoPago: function tipoPago(tipo:string) { 
            if (tipo == "M") return "multa"
            else if (tipo == "L") return "luz"
            else if (tipo == "A") return "agua"
          },
        dateFormat: function dateFormat(date:Date, format:string, utc:boolean) {
            moment.locale('es');
            return (utc === true) ? moment(date).utc().format(format) : moment(date).format(format);
        }
    } 
}));


app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

/// Cargando los eventos que responden a las llamadas http
const pComerciante = new PComerciante();
app.use('/comerciantes', pComerciante.router);

const pPuesto = new PPuesto();
app.use('/puestos', pPuesto.router);

const pAsistencia = new PListaAsistencia();
app.use('/asistencia', pAsistencia.router);

const pPagos = new PBoletaPagos();
app.use('/pagos', pPagos.router );

const pSector = new PSector();
app.use('/sectores', pSector.router );

//Servidor escuchando ...
app.listen(app.get('port'), () => {
    console.log('Server run in port: ' + port.toString());
});



