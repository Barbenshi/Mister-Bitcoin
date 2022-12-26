import { Component } from "react"
import { bitcoinService } from "../services/bitcoin.service"
import { userService } from "../services/user.service"

export class Home extends Component {
    state = {
        user: null,
        btc: null
    }

    componentDidMount() {
        this.setState({ user: userService.query() }, this.setBTC)
    }

    async setBTC() {
        const { coins } = this.state.user
        try {
            const btc = await bitcoinService.getRate(coins)
            this.setState({ btc })
        } catch (err) {
            console.log('err :>> ', err)
        }
    }

    render() {
        const { user, btc } = this.state
        if (!user || !btc) return <div>Loading...</div>
        const { name, coins } = user
        return (
            <div className="home-page flex column">
                <h1>Hello {name}!</h1>
                <div className="content-container flex column justify-center">

                <img src={`https://robohash.org/set_set5/${name}`} alt="" />
                <span>Coins: {coins}</span>
                <span>BTC: {btc}</span>
                </div>
            </div>
        )
    }
}


