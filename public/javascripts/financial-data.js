const ctx = document.getElementById('myChart').getContext('2d');

// Our query-string parameters
const start = '2019-10-07'
const end = '2020-10-07'
const currency = 'EUR'

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
  .then(response => {
    console.log(response.data)

    // Extract datas from response
    const labels = Object.keys(response.data.bpi)
    const data = Object.values(response.data.bpi)

    // Draw a line-chart
    const myChart = new Chart(ctx, {
      type: 'line',
        data: {
          labels,
          datasets: [{
            label: `bitcoin value`,
            data
          }]
        }
    });
  })
  .catch(err => {
    console.log('error while fetching coindesk datas', err)
  })

  
  