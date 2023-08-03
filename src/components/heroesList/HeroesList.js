import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHero } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './heroesList.scss'

// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE


const HeroesList = () => {
    const { filteredHeroes, heroesLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();


    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        // eslint-disable-next-line
    }, []);


    // Створюємо REDUCER для обробки видалення героя зі стейту. Створюємо ACTION для REDUCERу. Передаєто цю функцію до HeroesListItem. Там викликаємо по кліку, з передачею ID. useCallback ОБОВʼЯЗКОВО передаєто для запобігання перерендеру дочірнього компоненту (оскільки ми передаєто мю функцію як пропс)
    const onRemoveHeroFromState = useCallback((id) => {
        dispatch(deleteHero(id))
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }


    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition classNames="hero" timeout={0} >
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({ ...props }) => {
            return (
                <CSSTransition classNames="hero" timeout={500} >
                    <HeroesListItem key={props.id} remove={onRemoveHeroFromState} {...props} />
                </CSSTransition>)
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            <TransitionGroup>
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;