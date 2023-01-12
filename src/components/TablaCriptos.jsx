import { useState } from 'react';
import RenglonCriptos from './RenglonCriptos';
import ListaFavoritos from './ListaFavoritos';
import { generarId } from '../helpers/index';
import  '../styles/MediaQueries.css'
import '../styles/Transitions.css'
import Button from '@mui/material/Button';

const TablaCriptos = ({monedas, modoOscuro, busqueda, setBusqueda}) => {

    const [top100, setTop100] = useState(false);

    const [orderAtoZ, setOrderAtoZ] = useState(false);
    const [orderZtoA, setOrderZtoA] = useState(false);
    const [menorMayor, setMenorMayor] = useState(false);
    const [mayorMenor, setMayorMenor] = useState(false);
    const [filtro, setFiltro] = useState('');
    const [monedasFavoritas, setMonedasFavoritas] = useState([]);

    const eliminarOrdenesAlf = () => {
        setOrderAtoZ(false);
        setOrderZtoA(false);
    }

    const eliminarOrdenPrecio = () => {
        setMenorMayor(false);
        setMayorMenor(false);

    }

    const activarAtoZ = () => {
        setOrderAtoZ(true);
        setOrderZtoA(false);
        setMenorMayor(false);
    }

    const activarZtoA = () => {
        setOrderAtoZ(false);
        setOrderZtoA(true);
        setMayorMenor(false);
    }

    const activarMenorMayor = () => {
        setMenorMayor(true);
        setMayorMenor(false);
        setOrderAtoZ(false);
        setOrderZtoA(false);
    }

    const activarMayorMenor = () => {
        setMenorMayor(false);
        setMayorMenor(true);
        setOrderAtoZ(false);
        setOrderZtoA(false);
    }

    if(top100){
        var monedasBuscadas = monedas.filter( (moneda) => moneda.name.toLowerCase().includes(busqueda.toLowerCase()) | moneda.symbol.toLowerCase().includes(busqueda.toLowerCase()));
    }
    else if (top100 === false){
        const top10 = monedas.slice(0,10);
        var monedasBuscadas = top10.filter( (moneda) => moneda.name.toLowerCase().includes(busqueda.toLowerCase()) | moneda.symbol.toLowerCase().includes(busqueda.toLowerCase()));
    }
    
    if(menorMayor){
        monedasBuscadas.sort(function(a,b){
            if (a.current_price > b.current_price) {
                return 1;
              }
              if (a.current_price < b.current_price) {
                return -1;
              }
              return 0;
        })
    }else if (menorMayor === false){
        var monedasBuscadas = monedasBuscadas;
    }

    if(mayorMenor){
        monedasBuscadas.sort(function(a,b){
            if (a.current_price > b.current_price) {
                return 1;
              }
              if (a.current_price < b.current_price) {
                return -1;
              }
              return 0;
        }).reverse()
        // console.log(monedasBuscadas)
    }else if (mayorMenor === false){
        var monedasBuscadas = monedasBuscadas;
    }

    if(orderAtoZ){
        monedasBuscadas.sort(function(a,b){
            if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
        })
    }else if (orderAtoZ === false){
        var monedasBuscadas = monedasBuscadas;
    }

    if(orderZtoA){
        monedasBuscadas.sort(function(a,b){
            if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
        }).reverse()
        // console.log(monedasBuscadas)
    }else if (orderAtoZ === false){
        var monedasBuscadas = monedasBuscadas;
    }

    switch(filtro){
        case 'favs':
            monedasBuscadas = monedasFavoritas;
        break;
        case 'pos':
            monedasBuscadas = monedasBuscadas.filter( moneda => moneda.price_change_percentage_24h > 0)
        break;
        case 'neg':
            monedasBuscadas = monedasBuscadas.filter( moneda => moneda.price_change_percentage_24h < 0)
        break;
    }

    return (
        <>
            <div className='div-tabla d-flex flex-column pb-5'>

                <div className='d-flex flex-column'>
                    <h1 className={modoOscuro ? 'bg-dark fs-5 pb-3 text-light fw-bold' : 'bg-light fs-5 pb-3 text-dark fw-bold'}>Criptomonedas principales (Top 10)</h1> 
                    
                    <div className={modoOscuro ? 'bg-dark d-flex gap-4 flex-column justify-content-between' : 'bg-light d-flex gap-4 flex-column align-items-start justify-content-between'}>
                    
                        <input type="text"  className='text-center w-100 rounded fw-6 p-1 ps-3' placeholder='Buscá una cripto' onChange={e => setBusqueda(e.target.value)}/> 
                    
                        <div className={modoOscuro ? 'd-flex flex-row align-items-center justify-content-center gap-3 mb-4 w-100': 'd-flex flex-row align-items-center justify-content-center gap-3 mb-4 w-100'}>
                    
                            {top100 ? (
                            <Button title='Top 10' onClick={() => setTop100(false)} color='inherit' variant='contained' className={modoOscuro ? 'btn btn-light w-50 pb-1 botonesTop' : 'btn btn-dark w-50 pb-1 botonesTop'}>Top 10</Button>
                            ) : (
                            <Button title='Top 50' onClick={() => setTop100(true)} color='inherit' variant='contained' className={modoOscuro ? 'btn btn-light w-50 pb-1 botonesTop' : 'btn btn-dark w-50 pb-1 botonesTop'}>Top 50</Button>
                            )}
                                
                            <select title='Filtros' onChange={(e) => setFiltro(e.target.value)} className={modoOscuro ? 'btn btn-light text-center w-50' : 'btn btn-dark text-center w-50'} name="" id="">
                                <option value="">Filtros</option>
                                <option value="pos">Positivas</option>
                                <option value="neg">Negativas</option>
                            </select>
                            
                        </div>
                    </div>
                </div>

                {monedasBuscadas.length > 0 ? (
                    <table className={
                    modoOscuro ? 'table table-dark' : 'table table-light'
                    }>
                
                    <thead>

                        <tr>
                            <td className='p-1 py-3'>
                                <span className='p-1'>
                                #
                                </span> 
                            </td>

                            <td className='p-1 py-3'>
                                <div className='d-flex gap-3 align-items-center'>
                                    <span 
                                        className={modoOscuro ? 'bg-dark border-0 text-light w-30' : 'bg-light border-0 text-dark w-30'}
                                    >
                                        Nombre
                                    </span> 

                                    <div 
                                        className={modoOscuro ? 
                                        'bg-light text-dark rounded px-2 d-flex align-items-center justify-content-around' 
                                        :
                                        'bg-dark text-light rounded px-2 d-flex align-items-center justify-content-around'}
                                    >
                                        <button
                                            title='A-Z'
                                            onClick={activarAtoZ}
                                            className={modoOscuro ? 'bg-light text-dark border-0 rounded mt-1' : 'bg-dark text-light border-0 rounded mt-1' } >
                                                <box-icon color={modoOscuro ? 'black' : 'white'} name='sort-a-z' ></box-icon>
                                        </button>
                                        <button
                                            title='Z-A'
                                            onClick={activarZtoA}
                                            className={modoOscuro ? 'bg-light text-dark border-0 ms-1 rounded mt-1' : 'bg-dark text-light border-0 ms-2 rounded mt-1' } >
                                                <box-icon color={modoOscuro ? 'black' : 'white'} name='sort-z-a' ></box-icon>
                                        </button>

                                        {orderAtoZ || orderZtoA ? (
                                            <button 
                                            title='Cerrar orden alfabético'
                                            onClick={eliminarOrdenesAlf} className={modoOscuro ? 'bg-light border-0 ms-1 d-flex' : 'bg-dark border-0 ms-1 d-flex'}>
                                                <box-icon color={modoOscuro ? 'black' : 'white'} name='x'></box-icon>
                                            </button>
                                        ) : (
                                            ''
                                        )}

                                    </div>

                                </div>
                            </td>

                            <td className='py-3'>
                                <div className='d-flex gap-3 align-items-center'> 
                                    <span 
                                        className={modoOscuro ? 'bg-dark border-0 text-light w-30' : 'bg-light border-0 text-dark w-30'}>
                                            Precio
                                        </span>

                                        <div className={modoOscuro ? 
                                            'bg-light text-dark rounded px-2 d-flex align-items-center justify-content-around' 
                                            :
                                            'bg-dark text-light rounded px-2 d-flex align-items-center justify-content-around'}>
                                            <button 
                                            title='Menor a mayor'
                                            onClick={activarMenorMayor}
                                            className={modoOscuro ? 'border-0 bg-light mt-1' : 'border-0 bg-dark mt-1'}>
                                            <box-icon color={modoOscuro ? 'black' : 'white'} name='sort-up'></box-icon>
                                            </button>
                                            <button 
                                            title='Mayor a menor'
                                            onClick={activarMayorMenor}
                                            className={modoOscuro ? 'border-0 bg-light ms-1 mt-1' : 'border-0 bg-dark ms-1 mt-1'}>
                                            <box-icon color={modoOscuro ? 'black' : 'white'} name='sort-down'></box-icon>
                                            </button>
                                            {menorMayor || mayorMenor ? (
                                                <button 
                                                title='Orden default'
                                                onClick={eliminarOrdenPrecio}
                                                className={modoOscuro ? 'border-0 bg-light mt-1' : 'border-0 bg-dark mt-1'}>
                                                    <box-icon color={modoOscuro ? 'black' : 'white'} name='x'></box-icon>
                                                </button>
                                            ):(
                                                ''
                                            )}
  
                                        </div>

                                </div>
                                </td>
                            <td className='text-end py-3'>24h %</td>
                            <td className='py-3'></td>
                        </tr>
                    </thead>
                
                    <tbody>
                        {monedasBuscadas.map((moneda,index) =>(
                            <RenglonCriptos modoOscuro={modoOscuro} moneda={moneda} key={generarId()} index={index} setMonedasFavoritas={setMonedasFavoritas} monedasFavoritas={monedasFavoritas}/>
                        ))}
                    </tbody>
                
                    </table>    
                ) : (
                    <div className='m-auto my-5'>
                        <h1 className={modoOscuro ? 'text-light fs-5' : 'text-dark fs-5'}>
                            No hay criptos.
                        </h1>
                    </div>
                )}
                
            </div>
        </>
    )
}

export default TablaCriptos
