import { NavLink, withRouter } from "react-router-dom"

function _AppHeader(props) {
    function handleClick(){
        props.history.push('/')
    }
    return (
        <header className="app-header">
            <section className='container flex space-between align-center'>
                <h1 className="logo" onClick={handleClick}>Mister BITCoin</h1>
                <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/contact">Contacts</NavLink>
                <NavLink to="/stats">Statistics</NavLink>
                </nav>
            </section>
        </header>
    )
}

export const AppHeader = withRouter(_AppHeader)