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
          <h2>Major System Generator</h2>
          <p>Generate mnemonics using the major system</p>
          <a href="/projects/major-system">Try for yourself</a>
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
