import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'

const Projects = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const upperContent = useMemo(
    () => (
      <div
        style={{
          overflow: 'scroll',
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
            height: '100%',
            gap: '1rem'
          }}>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>Major System Generator</h2>
            <p>Its hard to remember numbers, so why not try to generate mnemonics using the major system?</p>
            <a href="/projects/major-system">Try for yourself!</a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>NodeGrade - Automatic Short Answer Grading Tool</h2>
            <img
              src="https://github.com/HASKI-RAK/NodeGrade/blob/main/.github/thumbnail.png?raw=true"
              alt="NodeGrade - Node-based automatic short answer grading"
              style={{
                border: '1px solid black',
                width: '20%'
              }}
            />
            <p>
              NodeGrade is a node based web app that allows to grade and give feedback to free form student answers.
            </p>
            <p>
              Tutors can create and configure exercises which are then graded by the system using custom NLP / ML
              algorithms.
            </p>
            <p>
              The research shows comparable performance on public datasets, even outperforming GPT-4 on the SemEval 2013
              Task 7. This mono repository includes a server, a React PWA frontend, and a shared library package.
            </p>
            <p>The evaluation won the Best Paper Award at ECSEE '25.</p>
            <a href="https://github.com/HASKI-RAK/NodeGrade/">GitHub Repository</a>
            <br />
            <a href="https://dl.acm.org/doi/10.1145/3723010.3723021">Research Paper</a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>Logic Nodes for Comfy UI (+120 ⭐)</h2>
            <img
              src="/images/comfylogic.png"
              alt="Logic Nodes for Comfy UI"
              style={{
                border: '1px solid black',
                width: '20%'
              }}
            />
            <p>
              This extension introduces logic nodes and conditional rendering capabilities. It supports various
              comparison operators and accepts different data types, such as integers, strings, floats, and booleans.
              The extension also includes a debugging feature that prints inputs to the console.
            </p>
            <a href="https://github.com/theUpsider/ComfyUI-Logic/">More information</a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>VR Subway Simulator</h2>
            <img src="/images/subway1.png" alt="VR Subway Simulator" style={{ width: '20%' }} />
            <p>
              Agoraphobia is a specific form of anxiety disorder in which fear is triggered by different places or
              situations, such as open spaces or crowds. The goal of the simulation is to reduce or remove the patients
              fear of a phobic situation as part of exposure therapy through an immersive experience. In cooperation
              with the vfkv – Bildungsinstitut München gGmbH a prototype for a VR exposure in the form of a virtual
              reality subway simulator was developed. VR offers the possibility to create an immersive and realistic
              environment that allows the presentation of complex and dynamic 3D stimuli. In this context, a subway ride
              is virtually simulated, which can be controlled and monitored by the therapist during the VR exposure.
              This means that the simulation can be modified at any time and adapted to the individual course of
              therapy. This type of exposure avoids unpredictable and potentially dangerous situations, which could
              benefit patients who are not prepared to undergo in vivo exposure. The simulation was developed by a team
              of 7 students and was awarded the special prize of the jury for the best serious game 2020 by the
              Computerspielakademie Bayern:
            </p>
            <a href="https://games.jff.de/gamespreis/">Best serious game 2020</a>
            <p />
            <a style={{}} href="https://simulatorsubway.wordpress.com/">
              More information
            </a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>Master Thesis: Longterm world consistency for unsupervised video-to-video translation</h2>
            <p>
              Video-to video translation faces the problem of consistency when longer image sequences are being
              observed. Recent state-of-the-art works in the field of video synthesis introduce possibilities to improve
              the long-term consistency. Their solutions are evaluated and incorporated into the domain of unsupervised
              video-to-video translation in a practical implementation. The results are evaluated and compared.
            </p>
            <a href="https://www.researchgate.net/publication/358164216_Long-term_world_consistency_for_unsupervised_Video-to-video_Translation">
              Researchgate
            </a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>Raytracer in Vulkan</h2>
            <img
              src="https://www.hs-kempten.de/fileadmin/_processed_/3/e/csm_19-vulkanraytracing2_6206dc0e8f.jpg"
              alt="Raytracer in Vulkan"
              style={{ width: '20%' }}
            />
            <p>
              One of the first working implementations of a raytracer in Vulkan. The project was tackled during the
              early times of raytracing. (RTX 2070 was the best card out there haha)
            </p>
            <a href="https://www.hs-kempten.de/fakultaet-informatik/aktuelles/artikel/raytracing-mit-vulkan-auf-nividia-rtx-1339">
              More information
            </a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>Rooting for him - Global Game Jam 2023</h2>
            <img
              src="https://ggj.s3.amazonaws.com/styles/game_content__wide/games/screenshots/2023/02/767323/ingamescreenshot.png?itok=YsOCq58L&timestamp=1675601761"
              alt="Rooting for him"
              style={{ width: '20%' }}
            />
            <p>In one weekend, a randomly scrambled team of 6 people set out to create a fun endless runner game.</p>
            <a href="https://v3.globalgamejam.org/2023/games/rooting-him-3">More information</a>
          </div>

          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>This website</h2>
            <p>Written in React, Typescript, and a bit of CSS. Webdev became a part of me.</p>
          </div>

          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>More projects will be displayed soon ...</h2>
            <p>Stay tuned!</p>
          </div>
        </div>
      </div>
    ),
    []
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>Project Details & Tech Stacks</h2>
        <p>Here you can find more information about the technologies used in my projects.</p>
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '4px'
          }}>
          <h3>Tech Stacks:</h3>
          <ul>
            <li>
              <strong>ComfyUI-Logic:</strong> Python, JavaScript
            </li>
            <li>
              <strong>VR Subway Simulator:</strong> C#, Unity
            </li>
            <li>
              <strong>Master Thesis:</strong> Python, PyTorch
            </li>
            <li>
              <strong>Raytracer in Vulkan:</strong> C++, Vulkan
            </li>
            <li>
              <strong>Rooting for him:</strong> C#, Unity
            </li>
            <li>
              <strong>NodeGrade:</strong> TypeScript, React, Node.js, Prisma, WebSockets, Python
            </li>
            <li>
              <strong>This website:</strong> React, TypeScript, Vite
            </li>
            <li>
              <strong>Major System Generator:</strong> React, TypeScript, Vite
            </li>
          </ul>
        </div>
      </div>
    ),
    []
  )

  useEffect(() => {
    setUpperContent(upperContent)
    setLowerContent(lowerContent)

    return () => {
      setUpperContent(null)
      setLowerContent(null)
    }
  }, [upperContent, lowerContent, setUpperContent, setLowerContent])

  return null
}
export default Projects
