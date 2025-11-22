// RESTAURANDO CONSTANTES DE LA API
const API_KEY = "8bc60b29ddc58dc37deac755c3ad0353"
const BASE_URL = "https://api.Themoviedb.org/3"
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`

const movieCatalog = document.getElementById('movie-catalog')
const searchInput = document.getElementById('searchInput')

let allMovies = []; // Almacenará los datos REALES de la API

// Función para crear la tarjeta de película (Adaptada a la nueva estructura)
const createMovieCard = (element) => {
    const card = document.createElement('div')
    card.classList.add('movie-card')
    
    const poster = document.createElement('img')
    poster.classList.add('movie-poster')
    
    const title = document.createElement('h3') 
    title.classList.add('movie-title')
    
    const button = document.createElement('button')
    button.textContent = 'Ver'

    poster.src = `${IMAGE_BASE_URL}${element.poster_path}`
    poster.alt = `Poster de ${element.title}`
    title.textContent = `${element.title}`
    
    card.appendChild(poster)
    card.appendChild(title)
    card.appendChild(button)

    return card;
}

// Función para crear una fila de "pasillo" (NETFLIX STYLE)
const createMovieRow = (title, movies) => {
    const section = document.createElement('section')
    section.classList.add('movie-section')

    const rowTitle = document.createElement('h2')
    rowTitle.classList.add('section-title')
    rowTitle.textContent = title
    
    const rowContainer = document.createElement('div')
    rowContainer.classList.add('movie-row')

    movies.forEach(movie => {
        rowContainer.appendChild(createMovieCard(movie))
    })

    section.appendChild(rowTitle)
    section.appendChild(rowContainer)
    return section
}

// Función para renderizar las categorías usando los datos reales
const renderMovieCategories = (movies) => {
    movieCatalog.innerHTML = ''; 

    if (movies.length === 0) {
        movieCatalog.innerHTML = `<p class="no-results">No se encontraron películas para mostrar.</p>`;
        return;
    }
    
    // Creamos las filas cortando el array de películas reales
    const section1 = createMovieRow("💎 Tendencias VIP", movies.slice(0, 10)); 
    movieCatalog.appendChild(section1);

    const section2 = createMovieRow("🎬 Clásicos Esenciales", movies.slice(5, 15));
    movieCatalog.appendChild(section2);

    const section3 = createMovieRow("🔥 Acción Exclusiva", movies.slice(10, 20));
    movieCatalog.appendChild(section3);
}

// Lógica de búsqueda y filtrado
if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();

        if (searchTerm === "") {
            // Si el campo está vacío, restaurar las filas de categorías
            renderMovieCategories(allMovies); 
            return;
        }
        
        // Si hay búsqueda, filtrar y mostrar los resultados en una sola fila
        const filteredMovies = allMovies.filter(movie => {
            return movie.title.toLowerCase().includes(searchTerm);
        });

        movieCatalog.innerHTML = '';
        
        if (filteredMovies.length > 0) {
            movieCatalog.appendChild(createMovieRow(`Resultados para "${event.target.value}"`, filteredMovies));
        } else {
            movieCatalog.innerHTML = `<p class="no-results">No se encontraron películas que coincidan con su búsqueda.</p>`;
        }
    });
}

// Función principal para obtener datos de la API
const obtenerDatosAPI = async () => {
    try {
        const response = await fetch(url)
        
        if (!response.ok) {
            // Manejo de error HTTP (por ejemplo, clave no autorizada 401)
            throw new Error(`Error HTTP: ${response.status}. Verifique su clave API.`);
        }
        
        const data = await response.json()
        
        allMovies = data.results; 
        
        // Renderiza el catálogo
        renderMovieCategories(allMovies); 

    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        movieCatalog.innerHTML = `<p class="error-message">
            ⚠️ Error al cargar las películas: ${error.message}.
            <br>
            Asegúrese de que su clave API es válida y que tiene conexión a internet.
        </p>`;
    }
}

// Inicia la aplicación
obtenerDatosAPI()
