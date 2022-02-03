import {autorun, makeAutoObservable} from 'mobx';
import {FetchStatus, FilterList} from './heroes';
import {filtersAPI} from '../apiService/apiService';


class Filter {

    constructor() {
        makeAutoObservable(this)
        autorun(() => {
            this.fetchFilterList()
        })
    }

    actualFilter: FilterList = 'all'
    filtersList: FilterList[] = []
    filterFetchStatus: FetchStatus = 'idle'

    changeFilter(newFilter: FilterList) {
        this.actualFilter = newFilter
    }

    async fetchFilterList() {
        this.filterFetchStatus = 'loading';
        try {
            const res = await filtersAPI.getFilters();
            this.filtersList = res.data

            this.filterFetchStatus = 'success'
        } catch (err) {
            this.filterFetchStatus = 'error'
        }
    }


}

export default new Filter()