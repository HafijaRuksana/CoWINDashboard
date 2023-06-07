// Write your code here
import {Pie, PieChart, Cell, Legend, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {dataByGender} = props

  return (
    <div className="gender-container">
      <h1 className="gender-heading">Vaccination by gender</h1>
      <ResponsiveContainer height={300} width={1000}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            startAngle={0}
            endAngle={180}
            innerRadius="30%"
            outerRadius="50%"
            data={dataByGender}
            dataKey="count"
          >
            <Cell data="others" name="others" fill="#2cc6c6" />
            <Cell data="female" name="female" fill="#5a8dee" />
            <Cell data="male" name="male" fill="#f54394" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByGender
