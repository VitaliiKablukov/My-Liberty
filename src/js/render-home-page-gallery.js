import axios from "axios";
import { renderGallery } from "./render-gallery";



export async function renderHomePageGallery() {
    const genres = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=7e0fc0f40a1f522dce260b9a97593bef&language=en-US')
    const payload = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=7e0fc0f40a1f522dce260b9a97593bef')
    const films = payload.data.results
    const genresArr = []
    
    genres.data.genres.map(genre => {
        genresArr.push(genre)
    })

    setGenresToStorage(genresArr)
    
    const savedGenres = JSON.parse(localStorage.getItem('genres'))
   
    films.map(film => {
        const genreArr = []
        film.genre_ids.forEach(id => {
            savedGenres.find(genre => {
                if(genre.id === id) {
                    genreArr.push(genre.name)
                }
            })
        })
        const genreStr = genreArr.join(', ')
         renderGallery(film, genreStr)
    })
    
}

function setGenresToStorage(genresArr) {
    localStorage.setItem('genres', JSON.stringify(genresArr))
}
