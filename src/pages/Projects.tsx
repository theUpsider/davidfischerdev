const Projects = () => {
  return (
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
          <h2>Logic Nodes for Comfy UI (+120 ⭐)</h2>
          <img
            src="https://private-user-images.githubusercontent.com/25013640/260309251-7807b2a4-989d-4021-9572-1d2d13725304.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjM4NTU2MTUsIm5iZiI6MTcyMzg1NTMxNSwicGF0aCI6Ii8yNTAxMzY0MC8yNjAzMDkyNTEtNzgwN2IyYTQtOTg5ZC00MDIxLTk1NzItMWQyZDEzNzI1MzA0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA4MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwODE3VDAwNDE1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE3M2VlM2Y0OTE5ZDlhNDZjMTczYWNmNzE4OWFlNDQwOWE4MmI1NGFlNTIzNTQyNjNiZWViZTAxODY2YjcwNWQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.3phOrrXPsw6TzZPvz1SIq7wQaL4nS2-HP0OYpC_xy_w"
            alt="Logic Nodes for Comfy UI"
            style={{
              border: '1px solid black',
              width: '20%'
            }}
          />
          <p>
            This extension introduces logic nodes and conditional rendering capabilities. It supports various comparison
            operators and accepts different data types, such as integers, strings, floats, and booleans. The extension
            also includes a debugging feature that prints inputs to the console.
          </p>
        </div>
        <div
          style={{
            borderTop: '1px solid black'
          }}>
          <h2>VR Subway Simulator</h2>
          <img src="/subway1.png" alt="VR Subway Simulator" style={{ width: '20%' }} />
          <p>
            Agoraphobia is a specific form of anxiety disorder in which fear is triggered by different places or
            situations, such as open spaces or crowds. The goal of the simulation is to reduce or remove the patients
            fear of a phobic situation as part of exposure therapy through an immersive experience. In cooperation with
            the vfkv – Bildungsinstitut München gGmbH a prototype for a VR exposure in the form of a virtual reality
            subway simulator was developed. VR offers the possibility to create an immersive and realistic environment
            that allows the presentation of complex and dynamic 3D stimuli. In this context, a subway ride is virtually
            simulated, which can be controlled and monitored by the therapist during the VR exposure. This means that
            the simulation can be modified at any time and adapted to the individual course of therapy. This type of
            exposure avoids unpredictable and potentially dangerous situations, which could benefit patients who are not
            prepared to undergo in vivo exposure. The simulation was developed by a team of 7 students and was awarded
            the special prize of the jury for the best serious game 2020 by the Computerspielakademie Bayern:
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
            Video-to video translation faces the problem of consistency when longer image sequences are being observed.
            Recent state-of-the-art works in the field of video synthesis introduce possibilities to improve the
            long-term consistency. Their solutions are evaluated and incorporated into the domain of unsupervised
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
            One of the first working implementations of a raytracer in Vulkan. The project was tackled during the early
            times of raytracing. (RTX 2070 was the best card out there haha)
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
          <h2>Major System Generator</h2>
          <p>Generate mnemonics using the major system</p>
          <a href="/projects/major-system">Try for yourself</a>
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
  )
}
export default Projects
