import { useState } from "react"

type prop = {
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

function UserReview({ author, summary, text, authorRating, submissionDate }: prop) {
    const [ seeMore, setSeeMore ] = useState(false)

    return (
        <div className="border border-white rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
                <img 
                    src="/error-placeholder.png" 
                    className='w-12 h-12 bg-white rounded-full'
                />

                <div>
                    <p className="font-bold">
                        { author.nickName } 
                    </p>
                    <p className="text-xs">{submissionDate}</p>
                </div>
            </div>

            <div>
                <p className="flex mb-2 font-bold text-lg">
                    {summary.originalText}
                    <span className="flex gap-2 items-center ml-4">
                        {authorRating}
                        <img src="/star-icon.png" alt="stars" className="w-4 h-4"/>
                    </span>
                </p>
                
                <>
                    { text.originalText.plainText &&
                        <div onClick={() => setSeeMore(!seeMore)}>
                            {
                                !seeMore ?
                                <span>
                                    {text.originalText.plainText.slice(0, 499)}
                                </span>
                                :
                                <span>
                                    {text.originalText.plainText}
                                </span>
                            }
                            {
                                text.originalText.plainText.length < 499 ?
                                <></>
                                :
                                <span className="opacity-65 ml-2 cursor-pointer">{ seeMore ? 'Close' : '... See more' }</span>
                            }
                        </div>
                    }
                </>
            </div>
        </div>
    )
}

export default UserReview
