const express = require('express') 
const app = express()
const cors = require('cors')

const db = require('./models')
app.use(express.json())
app.use(cors())

//Rutas
const usuariosRouter = require('./routes/usuarios')
app.use("/usuarios", usuariosRouter);

//const ColocarnombreRouter = require('./routes/Colocarnombre');
//app.use("/Colocarnombre", publicacionesColocarnombre);

//const ColocarnombreRouter = require('./routes/Colocarnombre');
//app.use("/Colocarnombre", postulacionesColocarnombre);

//const ColocarnombreRouter = require('./routes/Colocarnombre');
//app.use("/Colocarnombre", mensajesColocarnombre);


db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Servidor corriendo en puerto 3001")
    })

})