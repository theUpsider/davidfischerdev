import { useMediaQueryCustom } from '../components/useMediaQueryCustom'

const Home = () => {
  const media = useMediaQueryCustom()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
      <div
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          textAlign: 'justify',
          fontSize: media ? '14.2rem' : '2rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'clip'
        }}>
        <p
          style={{
            margin: 0
          }}>
          DEVELOPER //
        </p>
        <p
          style={{
            margin: 0
          }}>
          ENGINEER //
        </p>
        <p
          style={{
            margin: 0
          }}>
          DESIGNER //
        </p>
        <p
          style={{
            margin: 0
          }}>
          RESEARCHER //
        </p>
        <p
          style={{
            margin: 0
          }}>
          CREATOR //
        </p>
      </div>
      {/* <div
        style={{
          position: 'absolute',

          height: '20%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',

          padding: 10,
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(3px)'
        }}>
        This box covers the text partially, suggesting what it means.
      </div> */}
    </div>
  )
}
export default Home
