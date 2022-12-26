import { Component } from 'react'
import { contactService } from '../services/contact.service'

export class ContactEdit extends Component {
    state = {
        contact: contactService.getEmptyContact()
    }
    componentDidMount() {
        const { id: contactId } = this.props.match.params
        console.log(this.props)
        if (contactId) this.loadContact(contactId)
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        contactService.saveContact({ ...this.state.contact })
        this.props.history.push('/contact')
    }

    loadContact = async (contactId) => {
        try {
            const contact = await contactService.getContactById(contactId)
            this.setState({ contact })
        } catch (err) {
            console.log('err', err)
        }
    }

    onBack = () => {
        const path = this.state.contact._id ? this.state.contact._id : ''
        this.props.history.push(`/contact/${path}`)
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }
        this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
    }

    render() {
        const { contact } = this.state
        if (!contact) return <div>Loading...</div>

        const { name, phone, email, _id } = contact
        return (
            <section className='contact-edit '>
                <div className="content-container flex">
                <button onClick={this.onBack} className="simple-button medium-button">🔙</button>
                <h1>{_id ? 'Edit' : 'Add'} your Contact</h1>
                </div>
                <form onSubmit={this.onSubmit} className='flex column align-start'>
                    <section className='flex column'>
                        <label htmlFor="name">Name</label>
                        <input onChange={this.handleChange} value={name} type="text" name='name' id='name' />
                    </section>
                    <section className='flex column'>
                        <label htmlFor="email">Email Address</label>
                        <input onChange={this.handleChange} value={email} type="email" name="email" id="email" />
                    </section>
                    <section className='flex column'>
                        <label htmlFor="phone">Phone Number </label>
                        <input onChange={this.handleChange} value={phone} type="tel" name="phone" id="phone" />
                    </section>
                    <button>Save</button>
                </form>
            </section>
        )
    }
}