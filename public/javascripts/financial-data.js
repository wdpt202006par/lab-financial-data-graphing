const ctx = document.getElementById('myChart').getContext('2d');

const $start = document.querySelector('input[name="start"]')
const $end = document.querySelector('input[name="end"]')
const $currency = document.querySelector('select[name="currency"]')

// Draw an empty line-chart
const myChart = new Chart(ctx, {
  type: 'line',
    data: {
      labels: [], // empty labels
      datasets: [{
        label: `bitcoin value`,
        data: [] // empty datas
      }]
    }
});

$start.addEventListener('change', getDatasAndUpdateChart)
$end.addEventListener('change', getDatasAndUpdateChart)
$currency.addEventListener('change', getDatasAndUpdateChart)

function getDatasAndUpdateChart() {
  // Our query-string parameters
  const start = `${$start.value}-01`
  const end = `${$end.value}-01`
  const currency = $currency.value

  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(response => {
      console.log(response.data)

      // Extract datas from API response
      const labels = Object.keys(response.data.bpi)
      const data = Object.values(response.data.bpi)

      // Update the line-chart with fresh datas
      myChart.data.labels = labels
      myChart.data.datasets[0].data = data
      myChart.update()
      
    })
    .catch(err => {
      console.log('error while fetching coindesk datas', err)
    })
}

getDatasAndUpdateChart()



  
  