import { Application } from "express"

function rootRouter (app:Application){
    app.get('/',(req,res,next)=>{

        res.send('Service Hello!')
    })

}
export default rootRouter