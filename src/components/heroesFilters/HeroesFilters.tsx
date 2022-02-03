
import storeMobX from '../../stores/filter';
import {ErrorHandler} from '../errorHandler/ErrorHandler';
import Filter from '../../stores/filter';
import {FilterList} from '../../stores/heroes';
import {observer} from 'mobx-react-lite';


const HeroesFilters = observer(() => {

    const filterList = Filter.filtersList
    const isLoading = Filter.filterFetchStatus === 'loading';
    const isError = Filter.filterFetchStatus === 'error';
    const changeUserFilter = (newFilter: FilterList) => {
        storeMobX.changeFilter(newFilter)
    }



    const btnView = (filterName: FilterList, id:number) => {
        switch (filterName) {
            case 'all':
                return <button key={id}  className="btn btn-outline-dark active"
                               onClick={() => changeUserFilter('all')}>Все</button>
            case 'fire':
                return <button key={id} className="btn btn-danger" onClick={() => changeUserFilter('fire')}>Огонь</button>
            case 'water':
                return <button key={id} className="btn btn-primary" onClick={() => changeUserFilter('water')}>Вода</button>
            case 'wind':
                return <button key={id} className="btn btn-success" onClick={() => changeUserFilter('wind')}>Ветер</button>
            case 'earth':
                return <button key={id} className="btn btn-secondary" onClick={() => changeUserFilter('earth')}>Земля</button>
        }
    }

    const uiBtn = filterList.map((t,i) => btnView(t,i))


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
});

export default HeroesFilters;