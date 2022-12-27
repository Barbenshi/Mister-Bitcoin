import { Component } from 'react'
import { userService } from '../services/user.service'
import { setUser } from '../store/actions/user.actions'
import { connect } from 'react-redux'
import bitcoin from '../assets/imgs/bitcoin.png'

class _SignUp extends Component {
    state = {
        name: ''
    }
    componentDidMount() {}
    onSubmit = (ev) => {
        ev.preventDefault()
        const name = ev.target[0].value
        this.props.setUser(name)
        this.props.history.push('/')
    }

    render() {
        return (
            <section className='sign-up'>
                <h1>SignUp</h1>
                <div className="img-container">
                    <img src={bitcoin} alt="" />
                </div>
                <form onSubmit={this.onSubmit} >
                    <label htmlFor="name">Name:</label>
                    <input type="text" placeholder='Enter your name here...' id='name' name='name' />
                    <button>Save</button>
                </form>
            </section>
        )
    }
}

const mapDispatchToProps = {
    setUser,
}

export const SignUp = connect(null, mapDispatchToProps)(_SignUp)