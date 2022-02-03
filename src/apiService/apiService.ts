import axios from 'axios';
import {NewHeroes} from '../stores/heroes';

const base_url = 'http://localhost:5000'

const instance = axios.create({
      baseURL:'http://localhost:5000'
    })

export const heroesAPI={
    getHeroes: async ()=>{
       return await instance.get('/heroes')
    },
    postHeroes: async (newHero:NewHeroes)=>{
       return await instance.post('/heroes',newHero)
    },
    deleteHeroes: async (id:string)=>{
       return await instance.delete('/heroes',{params:{
           "id":id}})
    }
}


export const filtersAPI = {
    getFilters: async()=>{
        return await instance.get('/filters')
    }
}