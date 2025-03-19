import React from 'react';
import { Link, useParams } from "react-router-dom";
import { getOneCountry } from "../http/http.js";

const Details = () => {
    const { id } = useParams();
    const [country, setCountry] = React.useState(null);

    React.useEffect(() => {
        getOneCountry(id).then((data) => {
            setCountry({
                name: data[0].translations.rus.common,
                flag: data[0].flags.svg,
                capital: data[0].capital ? data[0].capital[0] : "Нет данных",
                population: data[0].population,
                region: data[0].region,
                subregion: data[0].subregion || "Нет данных",
                languages: data[0].languages ? Object.values(data[0].languages).join(", ") : "Нет данных",
                currencies: data[0].currencies ? Object.values(data[0].currencies).map(c => c.name).join(", ") : "Нет данных",
            });
        });
    }, [id]);

    if (!country) return <p className="loading">Загрузка...</p>;

    return (
        <div className="details-container" style={{ backgroundImage: `url(${country.flag})` }}>
            <Link to="/" className="back-button">Назад</Link>
            <div className="details-card">
                <h1 className="country-name">{country.name}</h1>
                <table className="details-table">
                    <tbody>
                    <tr><td><b>Столица:</b></td><td>{country.capital}</td></tr>
                    <tr><td><b>Регион:</b></td><td>{country.region}</td></tr>
                    <tr><td><b>Подрегион:</b></td><td>{country.subregion}</td></tr>
                    <tr><td><b>Население:</b></td><td>{country.population.toLocaleString()}</td></tr>
                    <tr><td><b>Языки:</b></td><td>{country.languages}</td></tr>
                    <tr><td><b>Валюта:</b></td><td>{country.currencies}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Details;