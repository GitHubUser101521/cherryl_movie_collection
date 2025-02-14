import Swal from "sweetalert2"
import axios from 'axios'
import { SimpleMovieType } from "./Type";

export async function fetchMovies(query: string) {
    try {
        Swal.showLoading(null)

        const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${query}`)

        if (response.status === 200) {
            const returnedResponse: SimpleMovieType[] = []
            for ( let i = 0; i < response.data.description.length; i++) {
                const convertedData = {
                    TITLE: response.data.description[i]['#TITLE'],
                    YEAR: response.data.description[i]['#YEAR'],
                    IMDB_ID: response.data.description[i]['#IMDB_ID'],
                    IMDB_IV: response.data.description[i]['#IMDB_IV'],
                    IMG_POSTER: response.data.description[i]['#IMG_POSTER']
                }

                returnedResponse.push(convertedData)
            }
            Swal.hideLoading()
            Swal.close()
            return returnedResponse
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            })
            return []
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        })
        return []
    }
}

export async function fetchMovieDetails(movieId: string) {
    try {
        Swal.showLoading(null)
        const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?tt=${movieId}`)

        if (response.status === 200) {
            Swal.hideLoading()
            Swal.close()
            return response.data
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            })
            return {}
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        })
        return {}
    }
}