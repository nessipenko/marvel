import { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService'
import Error from '../error/Error'
import './charList.scss'
import Spinner from '../spinner/Spinner'

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

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const { getAllCharacters, process, setProcess } = useMarvelService()
    const itemRefs = useRef([])

    useEffect(() => {
        onRequest(offset, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onCharListLoaded = async (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }
        setCharList([...charList, ...newCharList])
        setNewItemsLoading(false)
        setOffset(offset + 9)
        setCharEnded(ended)
    }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    function renderItems(arr) {
        return (
            <ul className="char__grid">
                {arr.map((item, i) => {
                    let imgStyle = { 'objectFit': 'cover' };
                    if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                        imgStyle = { 'objectFit': 'unset' };
                    }

                    return (
                        <li
                            key={item.id}
                            className="char__item"
                            tabIndex={0}
                            ref={(el) => (itemRefs.current[i] = el)}
                            onClick={() => {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === 'Enter') {
                                    props.onCharSelected(item.id);
                                    focusOnItem(i);
                                }
                            }}
                        >
                            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                            <div className="char__name">{item.name}</div>
                        </li>
                    );
                })}
            </ul>
        );
    }


    const element = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemsLoading)
        // eslint-disable-next-line
    }, [process])

    return (
        <div className="char__list">
            {element}
            <button
                disabled={newItemsLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList