import {generarId } from '../helpers/index'

const RenglonCriptos = ({moneda, index, modoOscuro, setMonedasFavoritas, monedasFavoritas}) => {
    // console.log(moneda,index)

    const agregarMonedaFav = () => {    
        if(moneda.key){
            alert('Ya agregaste esta criptomoneda a tu lista de favoritos.');
            return
        }else{
            moneda.key = generarId();
            setMonedasFavoritas([... monedasFavoritas, moneda]);
        }
    };
    
    return (
    <tr>
        <td className='p-1 py-3'>
            <span className='p-2'>
                {moneda.market_cap_rank}
            </span>
           
        </td>

        <td className='p-1 py-2 w-50'>
            
            <div className='py-2'>
                <img className={modoOscuro ? 'bg-dark img-fluid me-2' : 'bg-light img-fluid me-2'} style={{width: '1rem'}} src={moneda.image} alt={moneda.name} />
                
                <span className={modoOscuro ? 'bg-dark' : 'bg-light'} style={{fontSize: '.8rem'}}>{moneda.name}</span>
                
                <span className={modoOscuro ? 'fw-bold bg-dark text-uppercase text-muted ms-1' : 'fw-bold bg-light text-uppercase text-muted ms-1'} style={{fontSize: '.8rem'}}>{moneda.symbol}</span>
            </div>

        </td>

        <td className='p-1 py-2'> 
            <div className={modoOscuro ? 'text-light d-flex flex-row justify-content-start p-1 py-2' : 'text-dark d-flex flex-row justify-content-start p-1 py-2'} style={{fontSize: '.8rem'}}>
                {moneda.current_price
                .toLocaleString('en-IN', 
                    {style: 'currency',
                    currency: 'USD', 
                    minimumFractionDigits: 3})
                }
            </div>
            
        </td>

        <td className='p-1 py-2'>

            <div className={
            moneda.price_change_percentage_24h > 0 ? 
            'text-success px-1 py-2 d-flex flex-row align-items-center justify-content-end fw-bold' : 
            'text-danger px-1 py-2 d-flex flex-row align-items-center justify-content-end fw-bold'
            }
            style={{fontSize: '.8rem'}}>
                {moneda.price_change_percentage_24h.toFixed(2)}%
                
                <span className='ms-2'>
                    {
                    moneda.price_change_percentage_24h > 0 ? 
                        (<box-icon color="#198754" type='solid' name='up-arrow'></box-icon>) 
                        : 
                        (<box-icon color="#dc3545" name='down-arrow' type='solid'></box-icon>)
                    }
                </span>
            </div>
            
        </td>        
    </tr>
    )
}

export default RenglonCriptos
