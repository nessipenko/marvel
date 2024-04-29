import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import Error from '../error/Error'
import Spinner from '../spinner/Spinner'

import './comicsList.scss'
import { Link } from 'react-router-dom'

const setContent = (process, Component, newItemsLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemsLoading ? <Component /> : <Spinner />
        case 'confirmed':
            return <Component />
        case 'error':
            return <Error />
        default: throw new Error('Unexpected process state')
    }
}

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false)
    const [offset, setOffset] = useState(250)

    const { getAllComics, process, setProcess } = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))

    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false
        if (newComicsList.length < 8) {
            ended = true
        }
        setComicsList([...comicsList, ...newComicsList])
        setNewItemsLoading(false)
        setOffset(offset + 8)
        setComicsEnded(ended)
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item"
                    key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li >
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul >
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemsLoading)}


            <button
                disabled={newItemsLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList