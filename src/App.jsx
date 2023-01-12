import { useEffect, useState } from 'react'
import TablaCriptos from './components/TablaCriptos'
import Cotizador from './components/Cotizador';
import '../src/styles/MediaQueries.css'
import '../src/styles/Transitions.css'

function App() {

  const BGINITIAL = JSON.parse(localStorage.getItem('modoOscuro')) ?? true;

  const [monedas, setMonedas] = useState([]);
  const [modoOscuro, setModoOscuro] = useState(BGINITIAL);
  const [busqueda, setBusqueda] = useState('');

  //CONSUMIR API//
  const consumirAPI = async () => {

    const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'

    const respuesta = await fetch(URL);

    const resultado = await respuesta.json()

    // console.log(resultado);
    setMonedas(resultado);
  }

  useEffect(()=>{
    consumirAPI()
  },[])

  //LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem('modoOscuro', JSON.stringify(modoOscuro));
  }, [modoOscuro]);

  return (
    
  <div className={modoOscuro ? 'bg-dark px-4' : 'bg-light px-4'} style={{fontSize: '.8rem'}}>
        
    <div className='d-flex flex-column gap-4'>

      <div className='d-flex flex-column gap-3 xl mt-4' style={{height: '5%'}}>  

        <div className='d-flex flex-row align-items-center justify-content-center gap-4'>
          <button onClick={() => setModoOscuro(false)} className={modoOscuro ? 'bg-dark border-0' : 'bg-light border-0'}>
            <box-icon animation='burst-hover' color={modoOscuro ? 'white' : 'black'} name='sun' type='solid' ></box-icon>
          </button>
          <button  onClick={() => setModoOscuro(true)} className={modoOscuro ? 'bg-dark border-0' : 'bg-light border-0'}>
            <box-icon animation='burst-hover' color={modoOscuro ? 'white' : 'black'} type='solid' name='moon'></box-icon>
          </button>
        </div> 
      </div>

      <div className='contenedor'>
        <TablaCriptos
          busqueda={busqueda} 
          setBusqueda={setBusqueda}
          modoOscuro={modoOscuro} 
          monedas={monedas} 
        />
        
        <Cotizador
          modoOscuro={modoOscuro}
        />
      </div>

    </div>

  </div>

  )
}

export default App
