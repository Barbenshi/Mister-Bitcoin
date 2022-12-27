export function TransferFund(props){
    return (
        <div className="transfer-fund">
            
        <h3>Transfer coins to {props.name}</h3>
        <form onSubmit={props.onTransferCoins}>
            <label htmlFor="amount">Amount</label>
            <input type="number" name="amout" id="amount" min={0} max={100} />
            <button>Transfer</button>    
        </form>
        </div>
    )
}