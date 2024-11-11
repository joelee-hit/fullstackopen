import React, { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total_feedback = good + neutral + bad
  const average_score = total_feedback > 0 ? (good - bad) / total_feedback : 0
  const good_rate = total_feedback > 0 ? (good / total_feedback) * 100 : 0
  if (total_feedback === 0) return <div>No feedback given</div>
  return(
    <table>
      <StatisticLine text='good' value={good}></StatisticLine>
      <StatisticLine text='neutral' value={neutral}></StatisticLine>
      <StatisticLine text='bad' value={bad}></StatisticLine>
      <StatisticLine text='all' value={total_feedback}></StatisticLine>
      <StatisticLine text='average' value={average_score}></StatisticLine>
      <StatisticLine text='positive' value={good_rate + ' %'}></StatisticLine>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const state_factory = (setState) => () => setState((prevState) => prevState + 1)

  return (
    <div>
      <Header text='give feedback'></Header>
      <Button onClick={state_factory(setGood)} text='good'></Button>
      <Button onClick={state_factory(setNeutral)} text='neutral'></Button>
      <Button onClick={state_factory(setBad)} text='bad'></Button>
      <Header text='statistics'></Header>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App