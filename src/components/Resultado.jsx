
const Resultado = ({resultado, modoOscuro}) => {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado

    return (

        <div className='d-flex gap-3 flex-column align-items-center'>

            <img className={modoOscuro? 'w-25 h-auto p-1 bg-white rounded-circle' : 'w-25 h-auto p-1 bg-dark rounded-circle'} src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto" />

            <div className={modoOscuro ? 'text-light d-flex flex-row flex-wrap align-items-bottom justify-content-center my-4' : 'text-dark d-flex flex-row flex-wrap align-items-bottom justify-content-center my-4'}>

                <div className='text-center mx-auto p-4 border-end border-bottom w-50'>
                    <p>Precio actual</p>
                    <span>{PRICE}</span>
                </div>

                <div className='text-center mx-auto p-4 border-bottom w-50'>
                    <p>Precio más alto diario</p>
                    <span>{HIGHDAY}</span>
                </div>

                <div className='text-center mx-auto border-end p-4 w-50'>
                    <p>Precio más bajo diario</p>
                    <span>{LOWDAY}</span> 
                </div>

                <div className='text-center mx-auto p-4 w-50'>
                    <p>Variación últimas 24h</p>
                    <span>{CHANGEPCT24HOUR} %</span> 
                </div>

                <div className='text-center mx-auto border-top p-4 w-50'>
                    <p>Última actualización</p> 
                    <span>{LASTUPDATE}</span> 
                </div>

            </div>

        </div>


    )
}

export default Resultado
