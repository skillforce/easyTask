import {autorun, makeAutoObservable} from 'mobx';
import {FetchStatus, FilterList} from './heroes';


class Filter {

   constructor() {
       makeAutoObservable(this)
       autorun(()=>{
           this.fetchFilterList()
       })
   }
    actualFilter:FilterList = 'all'
    filtersList:FilterList[] = []
    filterFetchStatus:FetchStatus = 'idle'

   changeFilter(newFilter:FilterList) {
       this.actualFilter=newFilter
   }

   async fetchFilterList(){
       this.filterFetchStatus='loading';
       try {
           const res = await fetch(`http://localhost:3001/filters`, {
               method: 'GET',
               body: null,
               headers: {'Content-Type': 'application/json'}
           });
           this.filtersList = await res.json()
           this.filterFetchStatus='success'
       }catch (err){
           this.filterFetchStatus='error'
       }
   }



}

export default new Filter()