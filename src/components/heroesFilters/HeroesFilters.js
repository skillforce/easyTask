
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом



import {heroesFilterChange} from "../../reducers/HeroesList-reducer";
import {useDispatch} from "react-redux";




const HeroesFilters = () => {

const dispatch = useDispatch();

    const changeUserFilter =(newFilter)=>{
        dispatch(heroesFilterChange(newFilter))
    }


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button className="btn btn-outline-dark active" onClick={()=>changeUserFilter('all')}>Все</button>
                    <button className="btn btn-danger" onClick={()=>changeUserFilter('fire')}>Огонь</button>
                    <button className="btn btn-primary" onClick={()=>changeUserFilter('water')}>Вода</button>
                    <button className="btn btn-success" onClick={()=>changeUserFilter('wind')}>Ветер</button>
                    <button className="btn btn-secondary" onClick={()=>changeUserFilter('earth')}>Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;