import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './heroesList.scss'
import { fetchHeroes, filteredHeroesSelector, heroDeleted, } from './heroesSlice';

const HeroesList = () => {




    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();


    useEffect(() => {
        dispatch(fetchHeroes());

        // eslint-disable-next-line
    }, []);


    // Створюємо REDUCER для обробки видалення героя зі стейту. Створюємо ACTION для REDUCERу. Передаєто цю функцію до HeroesListItem. Там викликаємо по кліку, з передачею ID. useCallback ОБОВʼЯЗКОВО передаєто для запобігання перерендеру дочірнього компоненту (оскільки ми передаєто мю функцію як пропс)
    const onRemoveHeroFromState = useCallback((id) => {
        dispatch(heroDeleted(id))
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
                <CSSTransition key={props.id} classNames="hero" timeout={500} >
                    <HeroesListItem remove={onRemoveHeroFromState} {...props} />
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