const Course = ({course}) => {
    return (
        <>
            <Header course={course.name} />
            <Content part={course.parts} />
        </>
    )
}

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            {props.part.map((part) => (
                <Part key={part.id} part={part.name} exercise={part.exercises} />
                ))}
            <Total numEx={props.part.reduce((total, item) => total + item.exercises, 0)} />
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part} {props.exercise}</p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <strong>Number of exercises {props.numEx}</strong>
        </>
    )
}

export default Course