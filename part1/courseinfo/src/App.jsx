const Header = (props) => {
  return <h1>{props.course.name}</h1>;
}

const Part = (props) => {
  return ( 
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

const Content = (props) => {
  const [part1, part2, part3] = props.course.parts;
  return ( 
    <div>
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
    </div>
  );
}

const Total = (props) => {
  const [ part1, part2, part3 ] = props.course.parts;

  return ( 
    <p>
      Number of exercises {part1.exercises + part2.exercises + part3.exercises}
    </p>
  );
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}

export default App