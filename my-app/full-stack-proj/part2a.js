const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  const parts = props.course.parts
  const total = parts.reduce((s, p) => {
    return (s+p.exercises)
  }, 0)
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
      <p>total of {total} exercises</p>
    </div>
  )
}

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Course = ({course}) => {
  return (
    <div>
      <Header  course={course} />
      <Content course={course} />    
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}   
export default App