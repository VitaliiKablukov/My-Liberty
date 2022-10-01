import axios from "axios";


export async function saveGenresToStorage() {
    const genres = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=7e0fc0f40a1f522dce260b9a97593bef&language=en-US'
    );
    const genresArr = [];
  
    genres.data.genres.map(genre => {
      genresArr.push(genre);
    });
    localStorage.setItem('genres', JSON.stringify(genresArr));
  }