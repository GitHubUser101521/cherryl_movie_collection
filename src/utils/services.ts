import Swal from "sweetalert2"
import axios from 'axios'
import { MovieType, SimpleMovieType } from "./Type";

export const emptyMovieType: MovieType = {
    imdbId: '',
    short: {
        url: '',
        name: '',
        image: '',
        review: {
            author: '',
            dateCreated: '',
            name: '',
            reviewBody: '',
            reviewRating: {
                ratingValue: ''
            }
        },
        trailer: {
            embedUrl: ''
        },
    },
    top: {
        categories: [],
        releaseDate: {
            day: 0,
            month: 0,
            year: 0
        },
        runtime: {
            seconds: 0
        },
        ratingsSummary: {
            aggregateRating: 0,
            voteCount: 0
        },
        isAdult: false,
        genres: {
            genres: []
        },
        plot: {
            plotText: {
                plainText: ''
            }
        },
        featuredReviews: {
            edges: []
        }
    },
    main: {
        moreLikeThisTitles: {
            edges: [],
        },
        cast: {
            total: 0,
            edges: []
        },
        directors: [
            {
                totalCredits: 0,
                credits: []
            }
        ],
        writers: [
            {
                totalCredits: 0,
                credits: []
            }
        ] 
    }
}

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

            return emptyMovieType
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        })
        return emptyMovieType
    }
}

export function convertDuration(totalSeconds: number) {
    if (totalSeconds < 0) {
        return
    }
  
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    if (hours === 0) return `${minutes}min`
  
    return `${minutes ? `${hours}hr ${minutes}min` : `${hours}hr`}`
}

export function convertTitle(title: string) {
    return title.replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}

