import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'

import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import setContent from '../../utils/setContent'

const RandomChar = () => {
    const [char, setChar] = useState({})

    const { getCharacter, clearError, process, setProcess } = useMarvelService()

    useEffect(() => {
        updateChar()
        const timerId = setInterval(updateChar, 80000)
        return () => clearInterval(timerId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar}
                    className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char
    const imgStyle = {
        objectFit: thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover',
    }
    // let imgStyle = { 'objectFit': 'cover' }
    // if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    //     imgStyle = { 'objectFit': 'contain' }
    // }
    return (
        <div className="randomchar__block">
            <img src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description} </p>
                <div className="randomchar__btns">
                    {renderButton('homepage', homepage, 'button__main')}
                    {renderButton('Wiki', wiki, 'button__secondary')}
                    {/* <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a> */}
                </div>
            </div>
        </div>)
}
const renderButton = (label, href, className) => (
    <a href={href} className={`button ${className}`}>
        <div className="inner">{label}</div>
    </a>
)
export default RandomChar