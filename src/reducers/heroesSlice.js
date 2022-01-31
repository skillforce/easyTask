import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: 'all',
    filterList: []
}

export const filterListInit = createAsyncThunk('filters/filtersInit',async (arg,{dispatch,rejectWithValue}) => {
    dispatch(fetchingHeroes());
    try {
        const res = await fetch(`http://localhost:3001/filters`, {
            method: 'GET',
            body: null,
            headers: {'Content-Type': 'application/json'}
        });
        return await res.json()
    }catch(err){
        dispatch(fetchingHeroesError({}))
        return rejectWithValue(null)
    }
});


export const heroesInit = createAsyncThunk('heroes/HeroesInit', async (arg, {dispatch, rejectWithValue}) => {
    dispatch(fetchingHeroes());
    try {
        const res = await fetch(`http://localhost:3001/heroes`, {
            method: 'GET',
            body: null,
            headers: {'Content-Type': 'application/json'}
        });
        const heroes =  await res.json();
        console.log(heroes)
        return heroes
    } catch (err) {
        dispatch(fetchingHeroesError({}))
        return rejectWithValue(null)
    }

});


export const deleteHeroes = createAsyncThunk('heroes/deleteHeroes', async ({id}, {dispatch, rejectWithValue}) => {
    dispatch(fetchingHeroes());
    try {
        await fetch(`http://localhost:3001/heroes/${id}`, {
            method: 'DELETE',
        });
        return id
    } catch (err) {
        dispatch(fetchingHeroesError({}))
        return rejectWithValue(null)
    }
});


export const createHeroes = createAsyncThunk('heroes/createHeroes', async ({newHeroes}, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(fetchingHeroes());
    try {
        await fetch(`http://localhost:3001/heroes`, {
            method: 'POST',
            body: JSON.stringify(newHeroes),
            headers: {'Content-Type': 'application/json'}
        });
        return newHeroes
    } catch (err) {
        dispatch(fetchingHeroesError({}))
        return rejectWithValue(null)
    }
});


const heroesSlice = createSlice({
    name: 'heroesSlice',
    initialState,
    reducers: {
        changeFilter:(state,action)=>{
            state.filters = action.payload.newFilter
            const modifyHeroes = state.heroes.map(t => ({
                ...t,
                isVisible: t.element === action.payload.newFilter || action.payload.newFilter === 'all'
            }))
            state.heroes =modifyHeroes;
        },
        fetchingHeroes: (state) => {
            state.heroesLoadingStatus = 'loading';
        },
        fetchingHeroesError: (state) => {
            state.heroesLoadingStatus = 'error';
        },
    },
    extraReducers: builder => {
        builder.addCase(heroesInit.fulfilled, (state, action) => {
            const modifyHeroes = action.payload.map(t => ({
                ...t,
                isVisible: t.element === state.filters || state.filters === 'all'
            }))
            state.heroes = modifyHeroes;
            state.heroesLoadingStatus = 'idle';
        });
        builder.addCase(deleteHeroes.fulfilled, (state, action) => {
            debugger
            const index = state.heroes.findIndex(t => t.id === action.payload);
            state.heroes.splice(index, 1);
            state.heroesLoadingStatus = 'idle'
        });
        builder.addCase(createHeroes.fulfilled, (state, action) => {
            const newUserModify = {
                ...action.payload,
                isVisible: action.payload.element === state.filters || state.filters === 'all'
            }
            state.heroes = [...state.heroes, newUserModify];
            state.heroesLoadingStatus = 'idle';
        });
        builder.addCase(filterListInit.fulfilled,(state,action)=>{
            state.filterList = action.payload;
            state.heroesLoadingStatus = 'idle';
        });
    }
});


export const {fetchingHeroes, fetchingHeroesError, changeFilter} = heroesSlice.actions


export const heroesReducer = heroesSlice.reducer