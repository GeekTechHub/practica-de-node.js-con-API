const API_KEY = "8bc60b29ddc58dc37deac755c3ad0353"
const BASE_URL = "https://api.Themoviedb.org/3"
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`
const root = document.getElementById('root')

const obtenerDatosAPI = async() => {  

    const response = await fetch(url)
    const data = await response.json()

    data.results.forEach(element => {
        const poster = document.createElement('img')
        const title = document.createElement('h2')
        const overview = document.createElement('p')

        poster.src = `${IMAGE_BASE_URL}${element.poster_path}`
        title.textContent = `${element.title}`
        overview.textContent = `${element.overview}`

        root.appendChild(poster)
        root.appendChild(title)
        root.appendChild(overview)
    });
}

obtenerDatosAPI()