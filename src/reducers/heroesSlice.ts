import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'


export type NewHeroes = {
    id: string,
    name: string,
    description: string,
    element: string
}
export type ModifyHeroes = NewHeroes & { isVisible: boolean }

export type FilterList = 'fire' | 'water' | 'wind' | 'earth' | 'all'

type InitialState = {
    heroes: ModifyHeroes[]
    heroesLoadingStatus: string
    filters: string
    filterList: FilterList[]
}


const initialState: InitialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: 'all',
    filterList: []
}


export const filterListInit = createAsyncThunk('filters/filtersInit', async (arg, {dispatch, rejectWithValue}) => {
    dispatch(fetchingHeroes());
    try {
        const res = await fetch(`http://localhost:3001/filters`, {
            method: 'GET',
            body: null,
            headers: {'Content-Type': 'application/json'}
        });
        return await res.json()
    } catch (err) {
        dispatch(fetchingHeroesError())
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
        return await res.json();
    } catch (err) {
        dispatch(fetchingHeroesError())
        return rejectWithValue(null)
    }

});


export const deleteHeroes = createAsyncThunk('heroes/deleteHeroes', async (arg: { id: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(fetchingHeroes());
    try {
        await fetch(`http://localhost:3001/heroes/${arg.id}`, {
            method: 'DELETE',
        });
        return arg.id
    } catch (err) {
        dispatch(fetchingHeroesError())
        return rejectWithValue(null)
    }
});


export const createHeroes = createAsyncThunk<any, { newHeroes: NewHeroes }>('heroes/createHeroes', async ({newHeroes}: { newHeroes: NewHeroes }, {
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
        dispatch(fetchingHeroesError())
        return rejectWithValue(null)
    }
});


const heroesSlice = createSlice({
    name: 'heroesSlice',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<{ newFilter: string }>) => {
            state.filters = action.payload.newFilter
            state.heroes = state.heroes.map((t: NewHeroes) => ({
                ...t,
                isVisible: t.element === action.payload.newFilter || action.payload.newFilter === 'all'
            }));
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
            state.heroes = action.payload.map((t: NewHeroes) => ({
                ...t,
                isVisible: t.element === state.filters || state.filters === 'all'
            }));
            state.heroesLoadingStatus = 'idle';
        });
        builder.addCase(deleteHeroes.fulfilled, (state, action) => {
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
        builder.addCase(filterListInit.fulfilled, (state, action) => {
            state.filterList = action.payload;
            state.heroesLoadingStatus = 'idle';
        });
    }
});


export const {fetchingHeroes, fetchingHeroesError, changeFilter} = heroesSlice.actions


export const heroesReducer = heroesSlice.reducer