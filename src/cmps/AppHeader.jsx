import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/imgs/logo.svg"

export const AppHeader = () => {
    const navigate = useNavigate()

    function handleClick() {
        navigate('/')
    }
    const user = useSelector(state => state.userModule.loggedInUser)

    return (
        <header className="app-header">
            <section className='container flex space-between align-center'>
                <div className="logo-container flex align-center justify-center">
                    <img src={logo} alt="" />
                    <h1 className="logo" onClick={handleClick}>Mister BITCoin</h1>
                </div>
                <nav className="flex align-center">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/contact">Contacts</NavLink>
                    <NavLink to="/stats">Statistics</NavLink>
                    {user &&
                        <div className="img-container">
                            <img src={`https://robohash.org/set_set5/${user.name}`} alt="" />
                        </div>}
                </nav>
            </section>
        </header>
    )
}
