import { useEffect } from 'react'
import { CastEdge } from '../../utils/Type'
import { useNavigate } from 'react-router-dom'

function CastDetails(cast: CastEdge) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!cast) {
            navigate(-1)
        }
    }, [])

    return (
        <div className='flex items-center gap-4'>
            <img 
                src={cast.node.name.primaryImage?.url || "/error-placeholder.png"} 
                alt={cast.node.name.nameText.text}
                className='w-30 aspect-square rounded-full border border-white' 
            />

            <div>
                <h1 className='font-bold text-xl'>{cast.node.name.nameText.text}</h1>
                <div>
                {
                    cast.node.characters.map(c => (
                        <span className='opacity-65'>{c.name} </span>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default CastDetails
