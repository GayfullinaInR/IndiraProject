import axios from "axios";

export const getAllCountries = async () => {
    const {data} = await axios.get("https://restcountries.com/v3.1/all")
    return data
}

export const getOneCountry = async (id) => {
    const {data} = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
    return data
}