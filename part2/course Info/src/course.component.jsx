const Header = (props) => {
    return <h2>{props.course.name}</h2>;
}

const Part = (props) => {
    return ( 
    <p>
        {props.part} {props.exercises}
    </p>
    );
}

const Content = (props) => {
    const parts = props.course.parts;
    return ( 
    <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} /> )}
    </div>
    );
}

const Total = (props) => {
    const total = props.course.parts.reduce((acc, curr) => {
    acc += curr.exercises
    return acc;
    }, 0);

    return ( 
    <p style={{fontWeight: "bold"}}>
        Number of {total} exercises
    </p>
    );
}


const Course = ({course}) => {
    return (
    <div>
        <Header course={course} />
        <Content course={course}/>
        <Total course={course} />
    </div>
    )
}

export default Course;