import React, { useState, useEffect } from "react"
import Error from "../error/Error"

const ErrorBoundary = ({ children }) => {
    const [error, setError] = useState(false)

    useEffect(() => {
        const handleError = () => {
            setError(true)
        }
        window.addEventListener("error", handleError)

        return () => {
            window.removeEventListener("error", handleError)
        }
    }, [])

    if (error) {
        return <Error />
    }

    return children
}

export default ErrorBoundary
