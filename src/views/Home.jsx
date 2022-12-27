import { Component } from "react"
import { connect } from "react-redux"
import { MovesList } from "../cmps/MovesList"
import { bitcoinService } from "../services/bitcoin.service"
import bee from '../assets/imgs/bee.svg'

class _Home extends Component {
    state = {
        btc: null
    }

    componentDidMount() {
        this.props.user ? this.setBTC() : this.props.history.push('/signup')
    }

    async setBTC() {
        const { coins } = this.props.user
        try {
            const btc = await bitcoinService.getRate(coins)
            this.setState({ btc })
        } catch (err) {
            console.log('err :>> ', err)
        }
    }

    get moves() {
        const { user } = this.props
        if (user.moves.length <= 3) return user.moves
        return user.moves.slice(user.moves.length - 3, user.moves.length).sort((a, b) => b.at - a.at)
    }

    render() {
        const { btc } = this.state
        const { user } = this.props
        if (!user || !btc) return <div>Loading...</div>
        const { name, coins } = user
        return (
            <div className="home-page flex column align-center
            justify-center">
                <h1>Hello {name}!</h1>
                <div className="content-container flex column justify-center">

                    <img src={`https://robohash.org/set_set5/${name}`} alt="" />
                    <span>Coins: {coins}</span>
                    <div className="btc">
                    <span>BTC: {btc}</span> <img src={bee} alt="" />
                    </div>
                    <MovesList moves={this.moves} title={true} />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.userModule.loggedInUser,
})


export const Home = connect(mapStateToProps)(_Home)

