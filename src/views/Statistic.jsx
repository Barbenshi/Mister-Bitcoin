import { Component } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin.service'

export class Statistic extends Component {
    state = {
        marketPriceData: null,
        transactionsData: null
    }

    async componentDidMount() {
        try {
            const marketPriceData = await bitcoinService.getMarketPrice()
            const transactionsData = await bitcoinService.getConfirmedTransactions()
            this.setState({ marketPriceData, transactionsData })
        } catch (err) {
            console.log('err :>> ', err)
        }
    }

    render() {
        const { marketPriceData, transactionsData } = this.state
        if (!marketPriceData || !transactionsData) return <div>Loading statistics...</div>
        return (
            <section>
                <h2>Statistics</h2>
                <Chart data={marketPriceData} />
                <Chart data={transactionsData} />
            </section>
        )
    }
}
