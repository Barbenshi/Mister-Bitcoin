import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { Link } from 'react-router-dom'
import { MovesList } from '../cmps/MovesList'
import { userService } from '../services/user.service'
import { TransferFund } from '../cmps/TransferFund'
import { spendBalance } from '../store/actions/user.actions'
import { connect } from 'react-redux'
import { SignUp } from './SignUp'

class _ContactDetails extends Component {

    state = {
        contact: null
    }

    componentDidMount() {
        this.loadContact()
    }

    loadContact = async () => {
        const { id: contactId } = this.props.match.params
        try {
            const contact = await contactService.getContactById(contactId)
            this.setState({ contact })
        } catch (err) {
            console.log('err', err)
        }
    }

    onBack = () => {
        this.props.history.push('/contact')
    }

    onTransferCoins = (ev) => {
        ev.preventDefault()
        const amount = +ev.target[0].value
        this.props.spendBalance({ ...this.state.contact }, amount)
        ev.target[0].value = ''
    }

    get moves() {
        const { user } = this.props
        return user.moves.filter(move => move.toId === this.state.contact._id)
    }

    render() {
        const { contact } = this.state
        if (!contact) return <div>Loading...</div>
        if (!this.props.user) return <div><p>Must Sign-Up First...</p><SignUp /></div>
        return (
            <section className='contact-details'>
                <div className="img-container">
                    <img src={`https://robohash.org/set_set5/${contact._id}`} alt="" />
                    <Link title='Edit contact' to={`/contact/edit/${contact._id}`} className="simple-button medium-button">📝</Link>
                </div>
                <section>
                    <h3>Name: {contact.name}</h3>
                </section>
                <section>
                    <h3>Phone number: {contact.phone}</h3>
                </section>
                <section>
                    <address>Email address: {contact.email}</address>
                </section>
                <TransferFund onTransferCoins={this.onTransferCoins} name={contact.name} />
                {this.moves && <MovesList moves={this.moves} />}
                <button onClick={this.onBack}>Back</button>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userModule.loggedInUser,
})

const mapDispatchToProps = {
    spendBalance,
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)