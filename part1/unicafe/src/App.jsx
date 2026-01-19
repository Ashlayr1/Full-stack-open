import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={props.good} />
          <StatisticsLine text="Neutral" value={props.neutral} />
          <StatisticsLine text="Bad" value={props.bad} />
          <StatisticsLine text="All" value={props.all} />
          <StatisticsLine text="Average" value={props.average} />
          <StatisticsLine text="Positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const averageStats = () => {
    if (all === 0) return 0
    const totalScore = (good * 1) + (neutral * 0) + (bad * -1)
    return totalScore / all
  }

  const positiveStats = () => {
    if (all === 0) return 0
    return (good / all) * 100
  }

  return (
    <div>
      <h2>Give Feedback</h2>

      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad"/>

      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={averageStats()}
        positive={positiveStats()}
      />
    </div>
  )
}

export default App
