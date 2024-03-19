const Projects = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
        height: '100%',
        transition: 'all 0.5s ease'
      }}>
      <h1>Projects</h1>
      <div
        style={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'space-evenly',
          height: '100%'
        }}>
        <div
          style={{
            borderTop: '1px solid black'
          }}>
          <h2>Project 1</h2>
          <p>Project 1 description</p>
        </div>
        <div>
          <h2>Project 2</h2>
          <p>Project 2 description</p>
        </div>
        <div>
          <h2>Project 3</h2>
          <p>Project 3 description</p>
        </div>
      </div>
    </div>
  )
}
export default Projects
