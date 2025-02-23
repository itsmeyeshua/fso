import { useState } from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
  let percentage;
  text === "positive" ? percentage = " %" : "";
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}{percentage}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  return (
    <div>
      <h1>Statistic</h1>
      {total === 0 && <p>No feedback given</p>}
      {total > 0 &&
        <table>
          <tbody>
            <StatisticLine text="good" value ={good} />
            <StatisticLine text="neutral" value ={neutral} />
            <StatisticLine text="bad" value ={bad} />
            <StatisticLine text="total" value ={total} />
            <StatisticLine text="average" value ={average} />
            <StatisticLine text="positive" value ={positive} />
          </tbody>
        </table>
      }      
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1;
    setGood(newGood);
  }
  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
  }
  const handleBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
  }

  let total = good + neutral + bad;
  let positive = total === 0 ? 0 : (good * 100) / (total);
  const average = total === 0 ? 0 : (good + (bad * -1)) / total;

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App