import {Router} from "express";
import Hero from "../mongoDB/Hero.js";

const heroesRouter = new Router()


heroesRouter.get('/heroes', async (req,res)=>{
    try{
      const heroes = await Hero.find({})
        const correct = heroes.map(t=>({id:t.id,name:t.name,description:t.description,element:t.element}))
        res.status(200).json(correct)
    }catch(e){
        res.status(500).json(e.message)
    }
});


heroesRouter.delete('/heroes', async (req,res)=>{
      try{
          const {id} = req.query
          await Hero.deleteOne({id})
          res.status(200).json('success')
      } catch (e) {
          res.status(500).json(e.message)
      }

});



heroesRouter.post('/heroes', async (req, res) => {
        try {
            const {id, name, description, element} = req.body
            const newHero = await Hero.create({id, name, description, element})
            res.status(200).json(newHero)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
);


export default heroesRouter