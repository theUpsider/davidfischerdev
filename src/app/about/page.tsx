'use client'
import { useEffect } from 'react'
import Button from '../../components/Button'
import { useSplitContentDispatch } from '../../components/SplitContentContext'

const About = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  useEffect(() => {
    const upperContent = (
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
            style={{
              maxWidth: '30%',
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
      </div>
    )

    const lowerContent = (
      <div style={{ padding: '20px 0' }}>
        <h2>My Areas of Expertise</h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginTop: '1rem'
          }}>
          <div
            style={{
              padding: '1rem',
              border: '1px solid #484a4d',
              borderRadius: '4px'
            }}>
            <h3>🔬 Research</h3>
            <p>
              For my research and in my spare time, I love to dig into bleeding edge technologies. It is a truly amazing
              time we live in. That is why I can not stop getting my hands on the newset tech and trends.
            </p>
          </div>

          <div
            style={{
              padding: '1rem',
              border: '1px solid #484a4d',
              borderRadius: '4px'
            }}>
            <h3>⚙️ Engineering</h3>
            <p>
              Finding solutions to problems and realizing them is a passion of mine. I love to wrap my head around
              difficult tasks, then coming up with a solid way to solve them. Planning the schedule, designing the
              architecture and implementing the very most bottom classes is what I like to do and where my skillset
              really shines.
            </p>
          </div>

          <div
            style={{
              padding: '1rem',
              border: '1px solid #484a4d',
              borderRadius: '4px'
            }}>
            <h3>🎨 Design</h3>
            <p>
              Creativity - Whether it's a complicated problem, or a matter of design, I always like to put new
              perspectives on a task at hand. My skills include 3D Art, Game Design, a (little) bit of Photoshop, as
              well as music composition.
            </p>
          </div>
        </div>
      </div>
    )

    setUpperContent(upperContent)
    setLowerContent(lowerContent)

    return () => {
      setUpperContent(null)
      setLowerContent(null)
    }
  }, [setUpperContent, setLowerContent])

  return null
}

export default About
