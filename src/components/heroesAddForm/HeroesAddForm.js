
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addHero } from "../../actions";


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:


const HeroesAddForm = () => {
    const { filters, filterLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();

    const [hero, setHero] = useState({ id: '', name: '', description: '', element: 'fire' });

    const onSubmitNewHero = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: hero.name,
            description: hero.description,
            element: hero.element
        }
        // відправляєто форму
        dispatch(addHero(newHero));

        //видаляємо донні з форми
        setHero({ name: '', description: '', element: 'fire' })
    }

    const renderFiltersList = (filter, status) => {
        if (status === "loading") {
            return <option>Завантаження елементів</option>
        } else if (status === "error") {
            return <option>Помилка завантаження</option>
        }

        return filter.map(({ id, lable }) => {
            if (id === 'all') return
            return <option
                key={id}
                id={id} value={id} >{lable}</option>
        })
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitNewHero}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={hero.name}
                    onChange={e => setHero({ ...hero, name: e.target.value })}
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    value={hero.description}
                    onChange={e => setHero({ ...hero, description: e.target.value })}
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={hero.element}
                    onChange={e => setHero({ ...hero, element: e.target.value })}>
                    {renderFiltersList(filters, filterLoadingStatus)}
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
            >Создать</button>
        </form>
    )
}

export default HeroesAddForm;