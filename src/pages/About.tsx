import Button from '../components/Button'
const About = () => {
  return (
    <div
      style={{
        overflow: 'scroll',
        height: '100%',
        transition: 'all 0.5s ease'
      }}>
      <h1>ABOUT //</h1>
      <section>
        <p>
          Hello! I'm David Fischer, a software engineer, and allround solution finder. I studied at the University of
          Applied Sciences Kempten (Germany) and graduated with a Master's degree in Computer Science. Deep learning,
          game engineering, and data science are my passions.
        </p>
        <img
          src={'/images/DavidFischer.webp'}
          alt="David Vincent Fischer, Software Engineer"
          about="David Vincent Fischer, Software Engineer"
          accessKey="David Vincent Fischer, Software Engineer"
          style={{
            maxWidth: '40%',
            height: 'auto',
            marginBottom: '1rem'
          }}
        />
        <p>
          I'm currently working at the University of Applied Sciences Kempten in the field of AI and Machine Learning.
          Besides my work in the office chair, I'm also interested in building connections between people.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: '1rem'
          }}>
          <Button
            onClick={() => {
              window.open('https://davidfischer.dev//CVDavidFischer.pdf', '_blank')
            }}>
            Download my (outdated but soon to be updated) CV
          </Button>
        </div>
      </section>
      <div
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: '1.4rem',
          gap: '1rem',
          marginTop: '1rem',
          borderTop: '1px solid black',
          borderBottom: '1px solid black'
        }}>
        <div
          style={{
            flex: 1
          }}>
          <h2>Research</h2>
          For my research and in my spare time, I love to dive into bleeding edge technologies. It is a truely amazing
          time we live in, and new opportunities lay around each corner. That is why I am always curious about the
          newest technology. Applying ideas into new settings in an academic way never fails to amaze me.
        </div>
        <div
          style={{
            flex: 1
          }}>
          <h2>Engineering</h2>
          Finding solutions to problems and realizing them is a passion of mine. I love to wrap my head around difficult
          tasks, then coming up with a way to solve them. Planning the schedule, designing the architecture and
          implementing the very most bottom classes is what I like to do and where my skillset really shines.
        </div>
        <div
          style={{
            flex: 1
          }}>
          <h2>Design</h2>
          Creativity Wether it's a complicated problem, or a matter of design. I always like to put new perspectives on
          a task at hand. My skills include 3D Art, photoshop, as well as music composition. Whatever the problem might
          be, my skillset is surely prepared for the task. Head to "" for practical examples of my work.
        </div>
      </div>
    </div>
  )
}

export default About
