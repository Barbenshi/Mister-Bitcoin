import { Component, useState } from "react"
import { connect, useSelector } from "react-redux"
import { MovesList } from "../cmps/MovesList"
import { bitcoinService } from "../services/bitcoin.service"
import bee from '../assets/imgs/bee.svg'
import { useEffect } from "react"

export const Home = () => {

    const [btc, setBtc] = useState(null)

    const user = useSelector(state => state.userModule.loggedInUser)

    useEffect(() => {
        setBTC()
    }, [])

    const setBTC = async () => {
        const { coins } = user
        try {
            const btc = await bitcoinService.getRate(coins)
            setBtc(btc)
        } catch (err) {
            console.log('err :>> ', err)
        }
    }

    const moves = () => {
        if (user.moves.length <= 3) return user.moves
        return user.moves.slice(-3).sort((a, b) => b.at - a.at)
    }

    if (!user || !btc) return <div>Loading...</div>
    const { name, coins } = user
    return (
        <div className="home-page flex column align-center
            justify-center">
            <h1>Hello {name}!</h1>
            <div className="content-container flex column justify-center">

                <img src={`https://robohash.org/set_set5/${name}`} alt="" />
                <div className="details-container">

                <span>Coins: {coins}</span>
                <div className="btc">
                    <span>BTC: {btc}</span> <img src={bee} alt="" />
                </div>
                </div>
                <MovesList moves={moves()} title={true} />
            </div>
        </div>
    )
}




