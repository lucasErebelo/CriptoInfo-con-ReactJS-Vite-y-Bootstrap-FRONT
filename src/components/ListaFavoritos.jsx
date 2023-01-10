
const ListaFavoritos = ({monedasFavoritas, setMonedasFavoritas, eliminarCriptoFav, modoOscuro}) => {

    // console.log(monedasFavoritas);

    const confirmarEliminar = (monedaFav) => {
        const respuesta = confirm('¿Deseas quitar esta criptomoneda de tus favoritas?');
    
        if (respuesta){
            delete monedaFav.key;
            eliminarCriptoFav(monedaFav.id);
        }
      }

    const confirmarVaciarLista = () =>{
        const confirmacion = confirm('¿Deseas eliminar todas las criptomonedas de tus favoritas?');

        if(confirmacion){
            setMonedasFavoritas([])
        }
    }

    return (
        <>
            <h1 className={modoOscuro ? 'bg-dark fs-5 p-3 text-light fw-bold' : 'bg-light fs-5 p-3 text-dark fw-bold'} >Tus criptomonedas favoritas</h1>

            {monedasFavoritas.map(monedaFav => (

                <div key={monedaFav.id} className='d-flex flex-row justify-content-between align-items-center text-start border-bottom mb-1 py-2'>

                    <p className={modoOscuro ? 'bg-dark text-light d-flex flex-row align-items-center m-0 fw-bold' : 'bg-light d-flex flex-row align-items-center m-0 fw-bold'}>{monedaFav.name}
                            <span className='text-uppercase text-secondary ms-2'>{monedaFav.symbol}</span>
                    </p>
                        
                    <div className=' w-50 d-flex gap-3 flex-row align-items-center justify-content-between'>
                        <span className={modoOscuro ? 'text-light fw-bold' : 'text-dark fw-bold'}>{monedaFav.current_price.toLocaleString('en-IN', {style: 'currency',currency: 'USD', minimumFractionDigits: 2})}</span>
                    
                    
                        <div className='d-flex flex-row gap-3'>
                            <span className={monedaFav.price_change_percentage_24h > 0 ? 'bg-success m-0 text-light fw-bold p-1 rounded' : 'bg-danger m-0 text-light fw-bold p-1 rounded'}>{monedaFav.price_change_percentage_24h.toFixed(2)}%</span>
                            
                            <button onClick={() => confirmarEliminar(monedaFav)} className={modoOscuro ? 'bg-dark border-0 me-1' : 'bg-light border-0 me-1'}>
                            <box-icon color={modoOscuro ? 'white' : 'black'} name='x'></box-icon>
                            </button>
                        </div>
                    
                    </div>

                </div>
                
            ))}

            <button onClick={confirmarVaciarLista} className={modoOscuro? 'btn btn-light' : 'btn btn-dark'}>Eliminar lista completa</button>
        </>
    )
}

export default ListaFavoritos
