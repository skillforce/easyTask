const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}
export const heroesListActionType = {
    DELETE_USER: 'HeroesList/DELETE_ITEM',
    HEROES_FETCHING: 'HeroesList/HEROES_FETCHING',
    HEROES_FETCHED: 'HeroesList/HEROES_FETCHED',
    HEROES_FETCHING_ERROR: 'HeroesList/HEROES_FETCH_ERROR',
    HEROES_DELETE_SUCCESS: 'HeroesList/HEROES_DELETE_SUCCESS'
}

export const heroesFetching = () => ({type: heroesListActionType.HEROES_FETCHING})

export const heroesFetched = (heroes) => ({type: heroesListActionType.HEROES_FETCHED, payload: heroes})

export const heroesFetchingError = () => ({type: heroesListActionType.HEROES_FETCHING_ERROR})

export const deleteHeroesAC = (id) => ({type: heroesListActionType.DELETE_USER, id})

export const deleteHeroesSuccess = () => ({type: heroesListActionType.HEROES_DELETE_SUCCESS})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case heroesListActionType.HEROES_FETCHING:
            return {...state, heroesLoadingStatus: 'loading'}

        case heroesListActionType.HEROES_FETCHED:
            return {
                ...state, heroes: action.payload, heroesLoadingStatus: 'idle'
            }
        case heroesListActionType.HEROES_FETCHING_ERROR:
            return {
                ...state, heroesLoadingStatus: 'error'
            }
        case heroesListActionType.DELETE_USER:
            return {...state, heroes: state.heroes.filter(t => t.id !== action.id)}
        case heroesListActionType.HEROES_DELETE_SUCCESS:
            return {...state, heroesLoadingStatus: 'idle'}
        default:
            return state
    }
}



export const createHeroes =(id,name,description,element)=>{
    return async dispatch=>{
        dispatch(heroesFetching());
        try {
            await fetch(`http://localhost:3001/heroes`, {
                method: 'POST',
                body:{
                    id,
                    name,
                    description,
                    element
                }
            });
        }catch (err){
            dispatch(heroesFetchingError);
        }
    }
}



export const deleteHeroes = (id) => {
    return async (dispatch, getState) => {
        dispatch(heroesFetching());
        try {
            await fetch(`http://localhost:3001/heroes/${id}`, {
                method: 'DELETE',
            });
            dispatch(deleteHeroesAC(id))
            dispatch(deleteHeroesSuccess())
        } catch (err) {
            dispatch(heroesFetchingError);
        }
    }
}

export const heroesInit = () => {
    return async dispatch => {
        dispatch(heroesFetching());
        try {
            const res = await fetch(`http://localhost:3001/heroes`, {
                method: 'GET',
                body: null,
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json()
            dispatch(heroesFetched(data))
        } catch (err) {
            dispatch(heroesFetchingError);
        }
    }
}


export default reducer;