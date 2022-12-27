import { storageService } from "./storage.service"

export const userService = {
    query,
    signup,
    addMove
}

let loggedInUser = storageService.load('loggedinUser')

function query() {
    // return { name: "Mister Bit", coins: 120, moves: [] }
    return loggedInUser
}

function signup(name) {
    loggedInUser = { name, coins: 100, moves: [] }
    storageService.store('loggedinUser',loggedInUser)
    return loggedInUser
}

function addMove(contact, amount) {
    loggedInUser.moves.push({ toId: contact._id, to: contact.name, at: Date.now(), amount })
    loggedInUser.coins -= amount
    storageService.store('loggedinUser',loggedInUser)
    return loggedInUser
}