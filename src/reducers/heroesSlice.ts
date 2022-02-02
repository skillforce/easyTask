import { createSlice, PayloadAction} from '@reduxjs/toolkit'


export type NewHeroes = {
    id: string,
    name: string,
    description: string,
    element: string
}
export type ModifyHeroes = NewHeroes & { isVisible: boolean }

export type FilterList = 'fire' | 'water' | 'wind' | 'earth' | 'all'

type InitialState = {
    actualFilter: FilterList
}


const initialState: InitialState = {
    actualFilter: 'all',
}


const heroesSlice = createSlice({
    name: 'heroesSlice',
    initialState,
    reducers: {
        changeFilter: (state, action: PayloadAction<{ newFilter: FilterList }>) => {
            state.actualFilter = action.payload.newFilter
        }
    },
});


export const {changeFilter} = heroesSlice.actions


export const heroesReducer = heroesSlice.reducer