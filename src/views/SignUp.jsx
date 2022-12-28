import { Component } from 'react'
import { userService } from '../services/user.service'
import { setUser } from '../store/actions/user.actions'
import { connect, useDispatch } from 'react-redux'
import bitcoin from '../assets/imgs/bitcoin.png'
import { useNavigate } from 'react-router'

export const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (ev) => {
        ev.preventDefault()
        const name = ev.target[0].value
        dispatch(setUser(name))
        navigate('/')
    }

        return (
            <section className='sign-up'>
                <h1>SignUp</h1>
                <div className="img-container">
                    <img src={bitcoin} alt="" />
                </div>
                <form onSubmit={onSubmit} >
                    <label htmlFor="name">Name:</label>
                    <input type="text" placeholder='Enter your name here...' id='name' name='name' />
                    <button>Save</button>
                </form>
            </section>
        )
}
