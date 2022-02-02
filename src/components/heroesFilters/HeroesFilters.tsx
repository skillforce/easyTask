import {useDispatch} from 'react-redux';
import {changeFilter, FilterList} from '../../reducers/heroesSlice';
import {useGetFilterListQuery} from '../../API/apiSlice';
import Spinner from '../spinner/Spinner';


const HeroesFilters = () => {


    const {
        data: filterList=[],
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


    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {uiBtn && uiBtn}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;