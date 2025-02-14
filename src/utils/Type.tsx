export type MovieType = {
    short: {
        url: string,
        name: string,
        image: string,
        review: {
            author: string,
            dateCreated: string,
            name: string,
            reviewBody: string,
            reviewRating: {
                ratingValue: string
            }
        },
        trailer: {
            embedUrl: string
        }
    },
    top: {
        categories: CategoryType[],
        releaseDate: {
            day: number,
            month: number,
            year: number
        },
        runtime: {
            seconds: number
        },
        ratingsSummary: RatingsSummaryType
        isAdult: boolean,
        genres: {
            genres: GenreType[]
        },
        plot: {
            plotText: {
                plainText: string
            }
        }
    },
    main: {
        moreLikeThisTitles: {
            edges: MoreLikeThisTitleType[],
        },
        cast: {
            total: number,
            edges: CastEdge[]
        },
        directors: [
            {
                totalCredits: number,
                credits: CrewType[]
            }
        ],
        writers: [
            {
                totalCredits: number,
                credits: CrewType[]
            }
        ] 
    }
}

export type SimpleMovieType = {
    TITLE: string,
    YEAR: string,
    IMDB_ID: string,
    IMDB_IV: string,
    IMG_POSTER: string
}

type CastEdge = {
    node: {
        name: {
            id: string,
            nameText: {
                text: string
            },
            primaryImage: {
                url: string,

            }
        },
        attributes: MiscellaneousCreditAttribute[],
        category: {
            id: string
            // ex. actor (not unique id)
        },
        characters: Character[],
    }
}

type CrewType = {
    name: {
        id: string,
        nameText: {
            text: string
        }
    }
}

type CategoryType = {
    value: string
}

type GenreType = {
    text: string,
    id: string
}

type MiscellaneousCreditAttribute ={
    text: string, 
}

type Character = {
    name: string
}

type RatingsSummaryType = {
    aggregateRating: number,
    voteCount: number
}

type MoreLikeThisTitleType = {
    node: {
        id: string,
        titleText: {
            text: string
        }
        titleType: {
            id: string,
            text: string
        },
        primaryImage: {
            id: string,
            url: string
        },
        releaseYear: {
            year: number,
            endYear: number
        },
        ratingsSummary: RatingsSummaryType,
        titleGenres: {
            genres: {
                text: string
            }
        }
    }
}