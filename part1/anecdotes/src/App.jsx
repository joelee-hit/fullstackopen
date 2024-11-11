import { useState } from 'react'

const Heading = ({heading}) => <h1>{heading}</h1>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const DisplayAnecdote = ({text, vote}) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {vote} votes</p>
    </div>
  )
}
const MostVotedAnecdote = ({anecdotes, votes}) => {
  const max_vote = Math.max(...votes)
  const idx_max_vote = votes.indexOf(max_vote)
  if (max_vote === 0) {
    return (<p>don't have most voted anecdote</p>)
  }
  return (<p>{anecdotes[idx_max_vote]}</p>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [anecdoteVotes, setAnecdoteVotes] = useState(Array.from({length: anecdotes.length}, ()=>0))
  const [selected, setSelected] = useState(0)

  console.log(anecdoteVotes)

  const getRandomInt = () => Math.floor(Math.random() * anecdotes.length)

  const incr_votes = (idx) => () => {
    const copy = [...anecdoteVotes]
    copy[idx] += 1
    setAnecdoteVotes(copy)
  }

  return (
    <div>
      <Heading heading='Anecdote of the day'></Heading>
      <DisplayAnecdote text={anecdotes[selected]} vote={anecdoteVotes[selected]}></DisplayAnecdote>
      <Button text='vote' onClick={incr_votes(selected)}></Button>
      <Button text='next anecdote' onClick={() => setSelected(getRandomInt)}></Button>
      <Heading heading='Anecdote with most votes'></Heading>
      <MostVotedAnecdote anecdotes={anecdotes} votes={anecdoteVotes}></MostVotedAnecdote>
    </div>
  )
}

export default App