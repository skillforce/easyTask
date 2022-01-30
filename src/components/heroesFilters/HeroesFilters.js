// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


import reducer, {heroesFilterChange} from "../../reducers/HeroesList-reducer";
import {useDispatch, useSelector} from "react-redux";


const HeroesFilters = () => {

    const dispatch = useDispatch();
    const filterList =useSelector(state => state.filterList)
    const changeUserFilter = (newFilter) => {
        dispatch(heroesFilterChange(newFilter))
    }


    const btnView = (filterName) => {
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

    const uiBtn = filterList.map(t=>btnView(t))


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {uiBtn}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;