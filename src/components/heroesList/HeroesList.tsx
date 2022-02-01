import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../spinner/Spinner';
import {heroesInit, ModifyHeroes} from '../../reducers/heroesSlice';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import {RootState, useAppDispatch, useAppSelector} from '../../store/storeToolKit';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const heroes = useAppSelector(state => state.heroes.heroes);
    const heroesLoadingStatus = useAppSelector(state => state.heroes.heroesLoadingStatus)
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(heroesInit())
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === 'loading') {
        return <Spinner/>;
    } else if (heroesLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr: ModifyHeroes[]) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map((props) => {
            return <HeroesListItem key={props.id} {...props}/>
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;