import React from 'react';
import { getAllCountries } from "../http/http.js";
import { Link } from "react-router-dom";

const Home = () => {
    const [countries, setCountries] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem("favorites")) || [])

    React.useEffect(() => {
        getAllCountries().then((data) => {
            const translatedCountries = data.map(country => ({
                name: country.translations.rus.common,
                flag: country.flags.svg,
                code: country.cca3
            }));
            setCountries(translatedCountries);
        });
    }, []);

    const toggleFavorite = (country) => {
        const isFavorite = favorites.some(fav => fav.code === country.code);
        const updatedFavorites = isFavorite
            ? favorites.filter(fav => fav.code !== country.code)
            : [...favorites, country];

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <div className="top-bar">
                <h1>Список стран</h1>
                <Link to="/favourites" className="fav-link">Перейти в избранное</Link>
            </div>
            <input
                type="text"
                placeholder="Поиск по названию..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid">
                {filteredCountries.map(country => {
                    const isFavorite = favorites.some(fav => fav.code === country.code);
                    return (
                        <div key={country.code} className="card">
                            <Link to={`/details/${country.code}`}>
                                <img src={country.flag} alt={country.name}/>
                                <h3>{country.name}</h3>
                            </Link>
                            <button
                                className={isFavorite ? "fav-button remove" : "fav-button add"}
                                onClick={() => toggleFavorite(country)}
                            >
                                {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
