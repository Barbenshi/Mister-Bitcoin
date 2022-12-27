import { connect } from "react-redux"
import { NavLink, withRouter } from "react-router-dom"
import logo from "../assets/imgs/logo.svg"

function _AppHeader(props) {
    function handleClick() {
        props.history.push('/')
    }
    return (
        <header className="app-header">
            <section className='container flex space-between align-center'>
                <div className="logo-container flex align-center justify-center">
                    <img src={logo} alt="" />
                <h1 className="logo" onClick={handleClick}>Mister BITCoin</h1>
                </div>
                <nav className="flex align-center">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/contact">Contacts</NavLink>
                    <NavLink to="/stats">Statistics</NavLink>
                    {props.user &&
                        <div className="img-container">
                            <img src={`https://robohash.org/set_set5/${props.user.name}`} alt="" />
                        </div>}
                </nav>
            </section>
        </header>
    )
}

const mapStateToProps = state => ({
    user: state.userModule.loggedInUser,
})

export const AppHeader = connect(mapStateToProps)(withRouter(_AppHeader))