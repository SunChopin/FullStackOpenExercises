import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

  const totalScore = good*1 + neutral*0 + bad*(-1)
  const average = totalScore/(good+neutral+bad)
  const positiveRate = good/(good+neutral+bad)*100
  
  if (good+neutral+bad ===0) {
    return(
      <p>no feedback given</p>
    )
  }
  return(
    <table>
      <tbody> 
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positve" value ={positiveRate} />
      </tbody> 
    </table> 
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App