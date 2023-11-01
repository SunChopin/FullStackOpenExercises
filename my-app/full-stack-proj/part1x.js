import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <div>
    <button onClick={handleClick}>
    {text}
    </button>
  </div>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(8).fill(0))

  
  const handleRandClick = () => {
    const randNum = getRandomIntInclusive(0, 7)
    console.log('before :', selected)
    setSelected(randNum)
    console.log('after :', selected)
  }

  const handleVoteClick = () => {
    const copyVote = [...vote]
    copyVote[selected]+=1
    setVote(copyVote)
  }

  const maxVote = Math.max(...vote)
  const maxVoteInd = vote.indexOf(maxVote)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleRandClick} text='next anecdote' />
      <h1>Anecdote with the most votes</h1>
      {anecdotes[maxVoteInd]}
      <p>has {maxVote} votes</p>
    </div>
  )
}

export default App