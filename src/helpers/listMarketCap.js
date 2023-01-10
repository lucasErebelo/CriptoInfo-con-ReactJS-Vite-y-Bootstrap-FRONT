const options = {method: 'GET'};

fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


  