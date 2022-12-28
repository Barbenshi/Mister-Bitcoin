import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { Link } from 'react-router-dom'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const ContactIndex = () => {

    const dispatch = useDispatch()
    const contacts = useSelector(state => state.contactModule.contacts)
    const filterBy = useSelector(state => state.contactModule.filterBy)


    useEffect(()=>{
        dispatch(loadContacts())
    },[filterBy])

    const onRemoveContact = async (contactId) => {
        try {
            dispatch(removeContact(contactId))
        } catch (err) {
            console.log('err', err)
        }
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
    }

        if (!contacts) return <div>Loading...</div>
        return (
            <section className='contact-index'>
                <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
                <Link to="/contact/edit">Add new contact</Link>
                <ContactList onRemoveContact={onRemoveContact} contacts={contacts} />
            </section>
        )
}

