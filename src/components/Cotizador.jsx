import React, { useState, useEffect } from 'react'
import SeleccionarCriptomoneda from './SeleccionarCriptomoneda';
import Resultado from './Resultado';
import { SpinnerCircularFixed } from 'spinners-react'
import {monedas} from '../data/monedas'
import '../styles/MediaQueries.css'

const Cotizador = ({modoOscuro}) => {

  const [par, setPar] = useState({});

  const [criptos, setCriptos] = useState([]);

  const [resultado, setResultado] = useState({});

  const [cargando, setCargando] = useState(false);

  useEffect(()=>{
    const consultarAPI = async() =>{
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'        
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        
        const arrayCriptos = resultado.Data.map(cripto => {

            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }

            return objeto;
        })

        setCriptos(arrayCriptos);
    }
    consultarAPI();
  },[]);

  useEffect(()=>{
    if(Object.keys(par).length > 0){

      const cotizarCripto = async () => {

        setCargando(true);
        
        setResultado({})
        
        const {monedaElegida, criptoElegida} = par

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoElegida}&tsyms=${monedaElegida}` 

        const respuesta = await fetch(url)

        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptoElegida][monedaElegida])
        // console.log(resultado.DISPLAY[criptoElegida][monedaElegida])

        setCargando(false);
      }

      cotizarCripto();

    }

  }, [par]);


  return (
    <div className='div-cotizador d-flex flex-column justify-content-center'>

      <h2 className={modoOscuro ? 'bg-dark fs-5 pb-3 text-light fw-bold' : 'bg-light fs-5 pb-3 ps-3 text-dark fw-bold'} style={{height: '16%'}}>Cotizá en tiempo real</h2>
     
      <SeleccionarCriptomoneda modoOscuro={modoOscuro} criptos={criptos} monedas={monedas} setPar={setPar}/>

      <div className='text-center py-4'>
        {cargando && <SpinnerCircularFixed color={modoOscuro ? '#fff' : '#000'}/>}
      </div>
    
      {/*{console.log(resultado)} */}

      {resultado.PRICE && <Resultado modoOscuro={modoOscuro} resultado={resultado}/>}
    </div>
  )
}

export default Cotizador
