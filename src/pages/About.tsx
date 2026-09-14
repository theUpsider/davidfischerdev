'use client'
import { useEffect } from 'react'
import Button from '../components/Button'
import { useSplitContentDispatch } from '../components/SplitContentContext'

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
            Hello! I&apos;m David Fischer, a software engineer. I studied Computer Science at HAW Kempten and graduated
            with a Master&apos;s degree. My work covers deep learning, game engineering, and data science.
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
            I have been working as a Research Assistant at HAW Kempten since 2022-03-01. My fixed-term contract runs
            until 2029-02-28. I work on AI and machine-learning projects and enjoy building useful software with other
            people.
          </p>
          <p>
            Since 2025, I have run Concrete Dynamics, a software company founded with Philipp Geirhos, and teach 3D
            engine programming at the Games Academy.
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
                window.open('https://davidfischer.dev/CVDavidFischer.pdf', '_blank')
              }}>
              Download my CV
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
            <h3>💻 Programming languages</h3>
            <ul>
              <li>Python</li>
              <li>TypeScript/JavaScript</li>
              <li>C#</li>
              <li>C++</li>
              <li>GLSL/Vulkan</li>
              <li>LaTeX</li>
              <li>Shell</li>
            </ul>
          </div>

          <div
            style={{
              padding: '1rem',
              border: '1px solid #484a4d',
              borderRadius: '4px'
            }}>
            <h3>🔬 Research</h3>
            <p>
              I work with current research topics and turn ideas into working prototypes. Outside of work, I keep
              exploring new tools and technologies.
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
              I like breaking down difficult problems, designing a solid approach, and implementing it from the
              architecture to the details.
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
              I also enjoy the creative side of software: 3D art, game design, a little Photoshop, and music
              composition.
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
