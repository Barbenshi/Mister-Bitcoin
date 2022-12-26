import axios from "axios";
import { storageService } from "./storage.service";

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}

const STORAGE_KEY = 'bitcoin'

const gMarketPriceCache = storageService.load(STORAGE_KEY)

function getRate(coins) {
    const btc = storageService.load('user-btc')
    if(btc) return btc
    return axios.get(`https://blockchain.info/tobtc?currency=USD&cors=true&value=${coins}`).then(({ data })=>{
        storageService.store('user-btc',data)
        return data
    })
}

function getMarketPrice() {
    if(gMarketPriceCache) return gMarketPriceCache
    return axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            .then(({data})=>{
                storageService.store(STORAGE_KEY,data)
                return data
            })
}

function getConfirmedTransactions(){
    const transactions = storageService.load('transactions')
    if(transactions) return transactions
   return axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
            .then(({data})=>{
                storageService.store('transactions',data)
                return data
            })
}