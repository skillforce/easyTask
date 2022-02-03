import {autorun, makeAutoObservable, runInAction} from 'mobx';
import {heroesAPI} from '../apiService/apiService';


export type NewHeroes = {
    id: string,
    name: string,
    description: string,
    element: string
}
export type ModifyHeroes = NewHeroes & { isVisible: boolean }

export type FilterList = 'fire' | 'water' | 'wind' | 'earth' | 'all'


export type FetchStatus = 'idle' | 'loading' | 'error' | 'success'

class Heroes {

    constructor() {
        makeAutoObservable(this)

        autorun(() => {
            this.fetchHeroes()
        })
    }

    heroes: NewHeroes[] = []
    heroesFetchStatus: FetchStatus = 'idle'


    async fetchHeroes() {
        this.heroesFetchStatus = 'loading';
        try {
            const res = await heroesAPI.getHeroes()
            this.heroes = res.data
            runInAction(() => this.heroesFetchStatus = 'success')

        } catch (err) {
            runInAction(() => this.heroesFetchStatus = 'error')
        }
    }

    async createHeroes(newHero: NewHeroes) {
        this.heroesFetchStatus = 'loading';
        try {
           const res = await heroesAPI.postHeroes(newHero)
            this.heroes.push(newHero);
            runInAction(() => this.heroesFetchStatus = 'success')
        } catch (err) {
            runInAction(() => this.heroesFetchStatus = 'error')
        }
    }

    async deleteHeroes(id: string) {
        this.heroesFetchStatus = 'loading';
        try {
            const res = await heroesAPI.deleteHeroes(id)
            this.heroes = this.heroes.filter(t => t.id !== id)
            this.heroesFetchStatus = 'success'
        } catch (err) {
            this.heroesFetchStatus = 'error'
        }
    }


}

export default new Heroes();