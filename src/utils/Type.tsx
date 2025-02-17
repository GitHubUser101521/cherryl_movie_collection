export type MovieType = {
    imdbId: string,
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
        },
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
        ratingsSummary: {
            aggregateRating: number,
            voteCount: number
        }
        isAdult: boolean,
        genres: {
            genres: GenreType[]
        },
        plot: {
            plotText: {
                plainText: string
            }
        },
        featuredReviews: {
            edges: ReviewType[]
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
        directors: DirectorsType,
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

type ReviewType = {
    node: {
        author: {
            nickName: string
        },
        summary: {
            originalText: string
        },
        text: {
            originalText: {
                plainText: string
            }
        },
        authorRating: number,
        submissionDate: string
    }
}

export type CastEdge = {
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

type DirectorsType = [
    {
        totalCredits: number,
        credits: CrewType[]
    }
]

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

export type MoreLikeThisTitleType = {
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
        ratingsSummary: {
            aggregateRating: number,
            voteCount: number
        },
        titleGenres: {
            genres: {
                text: string
            }
        }
    }
}