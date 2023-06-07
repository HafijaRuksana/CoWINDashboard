// Write your code here
import {
  Bar,
  ResponsiveContainer,
  BarChart,
  Legend,
  XAxis,
  YAxis,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {lastWeekVaccinationData} = props
  console.log(lastWeekVaccinationData)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer height={300} width={800}>
        <BarChart data={lastWeekVaccinationData}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: '#94a3b8', strokeWidth: 0.5}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: '#94a3b8', strokeWidth: 0.5}}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationCoverage
