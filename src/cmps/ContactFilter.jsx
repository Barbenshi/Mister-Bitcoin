import {createRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export const ContactFilter= (props) => {

    const [filterBy, setFilterBy] = useState(null)

    const typeInputRef = createRef()

    useEffect(()=>{
        const { filterBy } = props
        setFilterBy({...filterBy})
    },[])

    useEffectUpdate(()=>{
        props.onChangeFilter({ ...filterBy })
    },[filterBy])

    const handleRef = (elInput) => {
        elInput?.focus()
    }

    const handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }
        setFilterBy(prevFilterBy=>({...prevFilterBy,[field]:value}))
    }

        if (!filterBy) return <div>Loading...</div>

        const { term } = filterBy
        return (
            <form className='contact-filter'>
                <section>
                    <label htmlFor="term">Search Contact</label>
                    <input ref={handleRef} onChange={handleChange}
                    placeholder="Puki Ben David for example..." value={term} type="text" name="term" id="term" />
                </section>
            </form>
        )
}
