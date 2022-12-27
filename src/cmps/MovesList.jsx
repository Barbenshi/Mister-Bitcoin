export function MovesList(props) {
    if(!props.moves.length) return
    return (
        <div className="moves-list">
            <h3>{props.title ? 'Your Last 3 Moves:': 'Your Moves:'}</h3>
            <ul>
                {props.moves.map(move =>
                    <li className="flex column" key={move.at}>
                        {props.title && <h4>To: {move.to}</h4>}
                        <span>At: {new Date(move.at).toLocaleString()}</span>
                        <span>Amount: {move.amount} Coins</span>
                    </li>)}
            </ul>
        </div>
    )
}