import axios from "axios";
import { renderGallery } from "./render-gallery";


export const IMG_URL = 'https://image.tmdb.org/t/p/w500'

export async function renderHomePageGallery() {
   const payload = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=7e0fc0f40a1f522dce260b9a97593bef')
   const films = payload.data.results

    films.map(async film =>{
        const genresArr = []
        const payload = await axios.get(`
        https://api.themoviedb.org/3/movie/${film.id}?api_key=7e0fc0f40a1f522dce260b9a97593bef&language=en-US`)
        const genres = payload.data.genres
        genres.map(data => genresArr.push(data.name))
        const genreStr = genresArr.join(', ')
        renderGallery(film, genreStr)
    })
}
