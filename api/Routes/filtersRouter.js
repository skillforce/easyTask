import {Router} from "express";
import Filters from "../mongoDB/Filters.js";


const filtersRouter = new Router()


filtersRouter.get('/filters',async(req,res)=>{
    try{
        const filters = await Filters.find()
        const correctFilterList = filters[0].filters
        res.status(200).json(correctFilterList)
    }catch(e){
        res.status(500).json(e.message)
    }
})

export default filtersRouter;