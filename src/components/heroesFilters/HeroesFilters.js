
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { filtersFetched, filtersFetching, filtersFetchingError } from "../../actions";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
    const { filters, filterLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();



    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
        // eslint-disable-next-line

    }, []);

    if (filterLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filterLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Помилка завантаження</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Немає фільтрів</h5>
        }

        return arr.map(({ id, lable, className }) => {
            <button
                key={id}
                id={id}
                className={className}
            >{lable}</button>
        })
    }

    const elements = renderFilters(filters)


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button>
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;