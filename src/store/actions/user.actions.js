import { userService } from "../../services/user.service"

export function spendBalance(contact, amount) {
    return async (dispatch) => {
        const user = userService.addMove(contact, amount)
        // dispatch({ type: 'SPEND_BALANCE', amount })
        dispatch({ type: 'SET_USER', user })
    }
}

export function setUser(name) {
    return async (dispatch) => {
        const user = userService.signup(name)
        dispatch({ type: 'SET_USER', user })
    }
}