
import { error } from "console"
import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"


const PORT = process.env.PORT || 5000;
connectToDatabase().then(()=>{
    app.listen(PORT,()=>
    console.log(`server open & Connected To Database`)
    );

})
.catch((error)=>console.log(error))


