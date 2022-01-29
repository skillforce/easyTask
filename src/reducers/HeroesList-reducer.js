const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: 'all'
}
export const heroesListActionType = {
    DELETE_USER: 'HeroesList/DELETE_ITEM',
    HEROES_FETCHING: 'HeroesList/HEROES_FETCHING',
    HEROES_FETCHED: 'HeroesList/HEROES_FETCHED',
    HEROES_FETCHING_ERROR: 'HeroesList/HEROES_FETCH_ERROR',
    HEROES_DELETE_SUCCESS: 'HeroesList/HEROES_DELETE_SUCCESS',
    HEROES_CREATE_USER: 'HeroesList/HEROES_CREATE_USER',
    HEROES_CHANGE_FILTER: 'HeroesList/HEROES_CHANGE_FILTER'
}

export const heroesFetching = () => ({type: heroesListActionType.HEROES_FETCHING})

export const heroesFetched = (heroes) => ({type: heroesListActionType.HEROES_FETCHED, payload: heroes})

export const heroesFetchingError = () => ({type: heroesListActionType.HEROES_FETCHING_ERROR})

export const deleteHeroesAC = (id) => ({type: heroesListActionType.DELETE_USER, id})

export const deleteHeroesSuccess = () => ({type: heroesListActionType.HEROES_DELETE_SUCCESS})

export const createHeroesSuccess = (newUser) => ({type: heroesListActionType.HEROES_CREATE_USER, newUser})


export const heroesFilterChange = (newFilter) => ({type: heroesListActionType.HEROES_CHANGE_FILTER, newFilter})


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case heroesListActionType.HEROES_FETCHING:
            return {...state, heroesLoadingStatus: 'loading'}

        case heroesListActionType.HEROES_FETCHED:
            const modifyHeroes = action.payload.map(t => ({
                ...t,
                isVisible: t.element === state.filters || state.filters === 'all'
            }))
            return {
                ...state, heroes: modifyHeroes, heroesLoadingStatus: 'idle'
            }
        case heroesListActionType.HEROES_FETCHING_ERROR:
            return {
                ...state, heroesLoadingStatus: 'error'
            }
        case heroesListActionType.DELETE_USER:
            return {...state, heroes: state.heroes.filter(t => t.id !== action.id)}
        case heroesListActionType.HEROES_DELETE_SUCCESS:
            return {...state, heroesLoadingStatus: 'idle'}
        case heroesListActionType.HEROES_CREATE_USER:
            const newUserModify = {...action.newUser,isVisible:action.newUser.element===state.filters||state.filters === 'all'}
            return {...state, heroes: [...state.heroes, newUserModify], heroesLoadingStatus: 'idle'}
        case heroesListActionType.HEROES_CHANGE_FILTER:
            return {...state,filters:action.newFilter, heroes: state.heroes.map(t=>({...t,isVisible:t.element === action.newFilter||action.newFilter==='all'}))}
        default:
            return state
    }
}


export const createHeroes = (newHeroes) => {
    return async dispatch => {
        dispatch(heroesFetching());
        try {
            await fetch(`http://localhost:3001/heroes`, {
                method: 'POST',
                body: JSON.stringify(newHeroes),
                headers: {'Content-Type': 'application/json'}
            });
            dispatch(createHeroesSuccess(newHeroes))
        } catch (err) {
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