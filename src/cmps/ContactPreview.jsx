import { Link } from "react-router-dom"

export function ContactPreview({ contact, onRemoveContact }) {


    const previewStyle = { backgroundImage: `url(https://robohash.org/set_set5/${contact._id})` }
    return (
        <section style={previewStyle} className="contact-preview">
            <Link className="info" to={`/contact/${contact._id}`}>
                <h2>{contact.name}</h2>
            </Link>
            <section className="actions">
                <button onClick={() => onRemoveContact(contact._id)}>X</button>
            </section>
        </section>
    )
}
