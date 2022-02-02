import {useDispatch} from 'react-redux';
import {changeFilter, FilterList} from '../../reducers/heroesSlice';
import {useGetFilterListQuery} from '../../API/apiSlice';
import Spinner from '../spinner/Spinner';
import {ErrorHandler} from '../errorHandler/ErrorHandler';


const HeroesFilters = () => {


    const {
        data: filterList = [],
        isLoading,
        isError
    } = useGetFilterListQuery()


    const dispatch = useDispatch();

    const changeUserFilter = (newFilter: FilterList) => {
        dispatch(changeFilter({newFilter}))
    }


    const btnView = (filterName: FilterList) => {
        switch (filterName) {
            case 'all':
                return <button className="btn btn-outline-dark active"
                               onClick={() => changeUserFilter('all')}>Все</button>
            case 'fire':
                return <button className="btn btn-danger" onClick={() => changeUserFilter('fire')}>Огонь</button>
            case 'water':
                return <button className="btn btn-primary" onClick={() => changeUserFilter('water')}>Вода</button>
            case 'wind':
                return <button className="btn btn-success" onClick={() => changeUserFilter('wind')}>Ветер</button>
            case 'earth':
                return <button className="btn btn-secondary" onClick={() => changeUserFilter('earth')}>Земля</button>
        }
    }

    const uiBtn = filterList.map(t => btnView(t))


    return (
    <>
        {!isLoading && !isError && <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {uiBtn && uiBtn}
                </div>
            </div>
        </div>}
        {ErrorHandler(isLoading, isError)}
    </>)
}

export default HeroesFilters;