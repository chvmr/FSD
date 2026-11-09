function Student(props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        width: "200px",
      }}>
      <h2>Name: {props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}

export default Student;