import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useFormRegister } from '../customHooks/useFormRegister'
import { contactService } from '../services/contact.service'

export const ContactEdit = (props) => {

    const [contact,register,setContact] = useFormRegister(contactService.getEmptyContact())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const { id: contactId } = params
        if (contactId) loadContact(contactId)
    },[])

    const onSubmit = (ev) => {
        ev.preventDefault()
        contactService.saveContact({ ...contact })
        navigate('/contact')
    }

    const loadContact = async (contactId) => {
        try {
            const contact = await contactService.getContactById(contactId)
            setContact(contact)
        } catch (err) {
            console.log('err', err)
        }
    }

    const onBack = () => {
        const path = contact._id ? contact._id : ''
        navigate(`/contact/${path}`)
    }

        if (!contact) return <div>Loading...</div>

        const { _id } = contact
        return (
            <section className='contact-edit '>
                <div className="content-container flex">
                    <button onClick={onBack} className="simple-button medium-button">🔙</button>
                    <h1>{_id ? 'Edit' : 'Add'} your Contact</h1>
                </div>
                <form onSubmit={onSubmit} className='flex column align-start'>
                    <section className='flex column'>
                        <label htmlFor="name">Name</label>
                        <input {...register('name','text')} />
                    </section>
                    <section className='flex column'>
                        <label htmlFor="email">Email Address</label>
                        <input {...register('email','email')} />
                    </section>
                    <section className='flex column'>
                        <label htmlFor="phone">Phone Number </label>
                        <input {...register('phone','phone')} />
                    </section>
                    <button>Save</button>
                </form>
            </section>
        )
}