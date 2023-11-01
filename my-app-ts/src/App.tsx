interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirement extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type ContentType =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirement;

interface ContentProps {
  coursePart: ContentType[];
}

interface PartProps {
  part: ContentType;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.coursePart.map((a, i) => (
        <Part key={i} part={a} />
      ))}
    </div>
  );
};

const Part = (props: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <div>
            <i>{props.part.description}</i>
          </div>
          <br />
        </div>
      );
    case "group":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <div>project exercises {props.part.groupProjectCount}</div>
          <br />
        </div>
      );
    case "background":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <div>submit to {props.part.backgroundMaterial}</div>
          <br />
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <div>required skills: {props.part.requirements}</div>
          <br />
        </div>
      );
    default:
      return assertNever(props.part);
  }
};

const Total = (props: ContentProps) => {
  return (
    <div>
      Number of exercises{" "}
      {props.coursePart.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: ContentType[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content coursePart={courseParts} />
      <Total coursePart={courseParts} />
    </div>
  );
};

export default App;
