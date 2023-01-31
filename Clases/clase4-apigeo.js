const API_KEY = 'd2ca0d77898795dc7d10650a026fe7be';

const consultarCoordenadas = async (ciudad, provincia, pais) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${provincia},${pais}&limit=1&appid=${API_KEY}`)

    const datos = await response.json()

    return datos[0]
}

consultarCoordenadas("Cordoba", "Cordoba", "Arg")

const consultarClima = async(ciudad, provincia, pais) => {
    const {lat, lon} = await consultarCoordenadas(ciudad, provincia, pais)
    /* console.log(lat, lon) */
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`)
    const clima = await response.json()
    console.log(clima)
}

consultarClima("Quilmes", "Buenos Aires", "Arg")