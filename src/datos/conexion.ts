
import mysql = require('mysql');

export default class Conexion {
    private static _instance: Conexion;

    private conection: mysql.Connection;
    private host:string;
    private user:string;
    private password:string;
    private database:string;

    constructor(){

        this.host =  'localhost';
        this.user =  'root';
        this.password =  '';
        this.database =  'asismarket';

        this.conection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

        this.conectarDB();
    }

    public static get instance():Conexion{
        return this._instance || ( this._instance = new this() );
    }

    private conectarDB(){
        this.conection.connect( ( err: mysql.MysqlError) => {
            if (err){
                console.log(err.message);
                return;
            }
            console.log('DB ok');
        })
    }

    public static ejecutarQuery<T>(query:string, inserts:any[] ): Promise<T>{        
        query = mysql.format(query, inserts);
        return new Promise( (resolve, reject) =>{
            
            this.instance.conection.query(query, (err, results: T, fields ) => {
                if ( err ){
                    reject('error: ' + err.message);                                   
                }if(!results){
                    console.log('DB: No hay datos para esta consulta');
                }
                else{
                    var string=JSON.stringify(results);
                    var json =  JSON.parse(string);
                    results = json;                    
                   resolve(results);
                }            
            });
        });                
    }
}