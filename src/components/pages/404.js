import { Link } from "react-router-dom"
import Error from "../error/Error"
import Helmet from "react-helmet"



const Page404 = () => {

    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Error page"
                />
                <title>Error</title>
            </Helmet>

            <Error />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
            <Link style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px' }} to="..">Back to main page</Link>

        </div>
    )
}

export default Page404