import React from 'react'
import {Link} from "react-router-dom";


const Favourites = () => {
    const [favourites, setFavourites] = React.useState([])

    React.useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem("favorites")) || []
        setFavourites(savedFavourites)
    }, [])

    const removeFavourite = (code) => {
        const updatedFavourites = favourites.filter(country => country.code !== code)
        setFavourites(updatedFavourites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavourites))
    }

    return (
        <div className="container">
            <Link to="/">Назад</Link>
            <h1>Избранные страны</h1>
            <div className="grid">
                {favourites.length === 0 ? <p>Нет избранных стран.</p> :
                    favourites.map(country => (
                        <div key={country.code} className="card">
                            <img src={country.flag} alt={country.name}/>
                            <h3>{country.name}</h3>
                            <button onClick={() => removeFavourite(country.code)}>Удалить</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Favourites;