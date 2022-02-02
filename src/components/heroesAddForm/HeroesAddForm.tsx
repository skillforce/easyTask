import {useState} from 'react';
import {v4} from 'uuid';
import {useCreateHeroMutation} from '../../API/apiSlice';
import Spinner from '../spinner/Spinner';

const HeroesAddForm = () => {

    const[heroesName,setHeroesName]=useState('')
    const[heroesDescription,setHeroesDescription]=useState('')
    const[heroesElement,setHeroesElement]=useState('')

    const [createHero,{isLoading,isError}]=useCreateHeroMutation();


    const createUser =()=>{
        const newHeroes = {
            id:v4(),
            name:heroesName,
            description:heroesDescription,
            element:heroesElement
        }
        createHero(newHeroes).unwrap()
        setHeroesName('')
        setHeroesDescription('')
        setHeroesElement('')
    }


    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    value={heroesName}
                    onChange={(e)=>setHeroesName(e.target.value)}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    value={heroesDescription}
                    onChange={(e)=>setHeroesDescription(e.target.value)}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    value={heroesElement}
                    onChange={(e)=>setHeroesElement(e.target.value)}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type={'button'} className="btn btn-primary" onClick={createUser}>Создать</button>
        </form>
    )
}

export default HeroesAddForm;