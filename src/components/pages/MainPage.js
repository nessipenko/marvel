import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList"
import CharInfo from "../charInfo/CharInfo"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"

import decoration from '../../resources/img/vision.png'
import { useState } from "react"
import CharForm from "../charForm/CharForm"
import Helmet from "react-helmet"

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null)

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal" />
            </Helmet>

            <title>Marvel information portal</title>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div className="char__panel">
                    <ErrorBoundary>
                        <CharInfo
                            charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage


