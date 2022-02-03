import HeroesListItem from '../heroesListItem/HeroesListItem';
import {ErrorHandler} from '../errorHandler/ErrorHandler';
import Filter from '../../stores/filter';
import Heroes, {ModifyHeroes} from '../../stores/heroes';
import {observer} from 'mobx-react-lite'

const HeroesList = observer(() => {

    const defaultHeroes = Heroes.heroes
    const isLoading = Heroes.heroesFetchStatus === 'loading';
    const isError = Heroes.heroesFetchStatus === 'error';


    const actualFilter = Filter.actualFilter

    const modifyHeroes: ModifyHeroes[] = defaultHeroes.map(t => ({
        ...t,
        isVisible: t.element === actualFilter || actualFilter === 'all'
    }))


    const renderHeroesList = (arr: ModifyHeroes[]) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map((props) => {
            return <HeroesListItem key={props.id} {...props}/>
        })
    }

    const elements = renderHeroesList(modifyHeroes);
    return (
        <ul>
            {!isError && elements}
            {ErrorHandler(isLoading, isError)}
        </ul>
    )
})

export default HeroesList;