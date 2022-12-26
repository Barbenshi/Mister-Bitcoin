import { Component } from 'react'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { contactService } from '../services/contact.service'
import { Link } from 'react-router-dom'

export class ContactIndex extends Component {

    state = {
        contacts: null,
        filterBy: {
            term: ''
        }
    }

    componentDidMount() {
        this.loadContacts()
    }

    loadContacts = async () => {
        try {
            const contacts = await contactService.getContacts(this.state.filterBy)
            this.setState({ contacts })
        } catch (err) {
            console.log('err:', err)
        }
    }

    onRemoveContact = async (contactId) => {
        try {
            await contactService.deleteContact(contactId)
            this.setState(({ contacts }) => ({
                contacts: contacts.filter(contact => contact._id !== contactId)
            }))
        } catch (err) {
            console.log('err:', err)
        }
    }

    onChangeFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadContacts)
    }

    render() {
        const { contacts, filterBy } = this.state
        if (!contacts) return <div>Loading...</div>
        return (
            <section className='contact-index'>
                        <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={filterBy} />
                        <Link to="/contact/edit">Add new contact</Link>
                        <ContactList onRemoveContact={this.onRemoveContact} contacts={contacts} />
            </section>
        )
    }
}

