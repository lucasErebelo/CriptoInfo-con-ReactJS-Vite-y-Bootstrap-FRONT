import React, { useState } from 'react'
import Error from '../components/Error';

const SeleccionarCriptomoneda = ({criptos, monedas, setPar, modoOscuro}) => {

  const [criptoElegida, setCriptoElegida] = useState('');

  const [monedaElegida, setMonedaElegida] = useState('');

  const [error, setError] = useState(false);

  //VALIDANDO FORMULARIO
  const handleSubmit = (e) =>{
    e.preventDefault();

    if([monedaElegida, criptoElegida].includes('')){

        setError(true);

        return
    }
    
    setError(false);
    setPar({
      monedaElegida,
      criptoElegida
    })
  }

  return (
    <>      

      {error && <Error>Todos los campos son obligatorios</Error>}

      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-4 pb-2">

        <select 
          className='text-center form-select' 
          value={monedaElegida}
          onChange={ e => setMonedaElegida(e.target.value)} 
          style={{fontSize: '.8rem'}}
        >

          <option value="">Seleccione una Moneda FIAT</option>
          
          {monedas.map(moneda => (
            <option key={moneda.id} value={moneda.id}>{moneda.nombre}</option>
          ))}
          
        </select>
        
        <box-icon name='sort-alt-2' rotate='90' color={modoOscuro ? 'white' : 'black'}></box-icon>
        
        <select 
          className='text-center form-select mb-2' value={criptoElegida}
          onChange={ e => setCriptoElegida(e.target.value)} 
          style={{fontSize: '.8rem'}}
        >
          <option value="">Seleccione una Criptomoneda</option>
          {criptos.map(cripto => (
            <option key={cripto.id} value={cripto.id}>{cripto.nombre}</option>
          ))}
        </select>
        
        <input title='Cotizar' type="submit" value={'Cotizar'} className={modoOscuro ? 'w-100 btn btn-light' : 'btn btn-dark w-100'}/>
        
      </form>
    </>
  )
}

export default SeleccionarCriptomoneda
