import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { Link } from 'react-router-dom'

export class ContactDetails extends Component {

    state = {
        contact: null
    }

    componentDidMount() {
        this.loadContact()
    }

    loadContact = async () => {
        const {id: contactId} = this.props.match.params
        try{
            const contact = await contactService.getContactById(contactId)
            this.setState({ contact })
        } catch(err){
            console.log('err', err)
        }
    }

    onBack= ()=>{
        this.props.history.push('/contact')
    }

    render() {
        const { contact } = this.state
        if (!contact) return <div>Loading...</div>
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
                <button onClick={this.onBack}>Back</button>
            </section>
        )
    }
}
