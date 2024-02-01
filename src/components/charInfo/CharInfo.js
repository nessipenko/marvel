import { useEffect, useState } from 'react'
import setContent from '../../utils/setContent'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService'
import './charInfo.scss'

const CharInfo = (props) => {

    const [char, setChar] = useState(null)


    const { getCharacter, clearError, process, setProcess } = useMarvelService()

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return
        }

        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char
    const imgStyle = {
        objectFit: thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover'
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        {renderButton('Homepage', homepage, 'button__main')}
                        {renderButton('Wiki', wiki, 'button__secondary')}
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}</div>
            <div className="char__comics">Comics:</div>

            <ul className="char__comics-list">
                {comics.length > 0 ? (
                    comics.slice(0, 10).map((item) => {
                        const comicId = item.resourceURI.match(/\d{3,5}/).join("")
                        return (
                            <Link to={`/comics/${comicId}`} key={comicId} className="char__comics-item">
                                {item.name}
                            </Link>
                        )
                    })
                ) : (
                    <li className="char__comics-item">There are no comics with this character</li>
                )}
            </ul>
        </>
    )
}
const renderButton = (label, href, className) => (
    <a href={href} className={`button ${className}`}>
        <div className="inner">{label}</div>
    </a>
)


CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo