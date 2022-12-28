import { useState } from 'react'
import { contactService } from '../services/contact.service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MovesList } from '../cmps/MovesList'
import { TransferFund } from '../cmps/TransferFund'
import { spendBalance } from '../store/actions/user.actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const ContactDetails = () => {

    const [contact, setContact] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    const user = useSelector(state => state.userModule.loggedInUser)
    const dispatch = useDispatch()


    useEffect(() => {
        loadContact()
    }, [])

    const loadContact = async () => {
        const { id: contactId } = params
        try {
            const contact = await contactService.getContactById(contactId)
            setContact(contact)
        } catch (err) {
            console.log('err', err)
        }
    }

    const onBack = () => {
        navigate('/contact')
    }

    const onTransferCoins = (ev) => {
        ev.preventDefault()
        const amount = +ev.target[0].value
        dispatch(spendBalance({ ...contact }, amount))
        ev.target[0].value = ''
    }

    const moves = () => {
        return user.moves.filter(move => move.toId === contact._id)
    }

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
            <TransferFund onTransferCoins={onTransferCoins} name={contact.name} />
            {moves() && <MovesList moves={moves()} />}
            <button onClick={onBack}>Back</button>
        </section>
    )
}
