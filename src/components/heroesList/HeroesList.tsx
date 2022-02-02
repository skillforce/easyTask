import Spinner from '../spinner/Spinner';
import {ModifyHeroes} from '../../reducers/heroesSlice';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import {useGetHeroesQuery} from '../../API/apiSlice';
import {useAppSelector} from '../../store/storeToolKit';
import {ErrorHandler} from '../errorHandler/ErrorHandler';


const HeroesList = () => {
    const {
        data: defaultHeroes = [],
        error,
        isError,
        isLoading
    } = useGetHeroesQuery();
    const actualFilter = useAppSelector(state => state.heroes.actualFilter)

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
            {ErrorHandler(isLoading,isError)}
        </ul>
    )
}

export default HeroesList;