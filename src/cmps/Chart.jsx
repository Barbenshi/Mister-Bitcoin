import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)



export function Chart({ data }) {
  const { values,description, name } = data
  const today = new Date()
  const fiveMonthsAgo =new Date()
  fiveMonthsAgo.setMonth(today.getMonth() - 5)
  let currentDate = fiveMonthsAgo;
  const labels = []
  while(currentDate<=today){
    labels.push(currentDate.toLocaleDateString('en-US',{month:'long',day:'2-digit'}))
    currentDate.setDate(currentDate.getDate() + 1);
  }
  const datasets =[

  
  {
    label: name,
    data: values,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  }
]

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display:false
      },
      title: {
        display: true,
        text: description,
      },
      scales:{
        y:{
          title:{
            display:true,
            text:"Hello axis Ydsadasd"
          }
        }
      }
    },
  }
  return (
    <Line
      options={options}
      data={{ labels, datasets }}
    />
  )
}
