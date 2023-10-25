import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin)!== -1){
            //El origen del request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}
app.use(cors(corsOptions))
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        process.env.FRONTEND_URL
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    )
});

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`)
});