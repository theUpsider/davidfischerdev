'use client'
import { useEffect, useMemo, useState } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'
import mediaData from '../../data/media.json'

type VideoEntry = {
  youtubeId: string
  title: string
  thumbnail: string
  featured: boolean
  summary: string
}

const videos = mediaData.videos as VideoEntry[]

const YouTubeLiteCard = ({
  video,
  large,
  playing,
  onPlay
}: {
  video: VideoEntry
  large: boolean
  playing: boolean
  onPlay: () => void
}) => (
  <div
    style={{
      borderTop: '1px solid black'
    }}>
    <h2>{video.title}</h2>
    <div
      style={{
        width: large ? 'min(70%, 720px)' : '100%',
        border: '1px solid black'
      }}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          style={{ width: '100%', aspectRatio: '16 / 9', display: 'block' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play video: ${video.title}`}
          style={{
            padding: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'block',
            width: '100%'
          }}>
          <img
            src={video.thumbnail}
            alt={`Thumbnail: ${video.title}`}
            loading="lazy"
            style={{ width: '100%', display: 'block' }}
          />
        </button>
      )}
    </div>
    <p>{video.summary}</p>
    <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer">
      Watch on YouTube
    </a>
  </div>
)

const Media = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()
  const [playingId, setPlayingId] = useState<string | null>(null)

  const upperContent = useMemo(
    () => (
      <div
        style={{
          overflow: 'scroll',
          height: '100%',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          transition: 'all 0.5s ease'
        }}>
        <h1>Media</h1>
        <p>
          Tutorials and project deep-dives from my work. Videos are hosted on YouTube and loaded only when you press
          play (no cookies before that).
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
          {videos
            .filter((video) => video.featured)
            .map((video) => (
              <YouTubeLiteCard
                key={video.youtubeId}
                video={video}
                large
                playing={playingId === video.youtubeId}
                onPlay={() => setPlayingId(video.youtubeId)}
              />
            ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {videos
              .filter((video) => !video.featured)
              .map((video) => (
                <div key={video.youtubeId} style={{ flex: '1 1 260px', maxWidth: '380px' }}>
                  <YouTubeLiteCard
                    video={video}
                    large={false}
                    playing={playingId === video.youtubeId}
                    onPlay={() => setPlayingId(video.youtubeId)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    ),
    [playingId]
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 1.5rem' }}>
        <h2>Awards &amp; Press</h2>
        <ul>
          <li>
            <strong>Best Paper Award</strong> — ECSEE 2025 (ACM) for NodeGrade ·{' '}
            <a href="https://dl.acm.org/doi/10.1145/3723010.3723021" target="_blank" rel="noopener noreferrer">
              ACM Digital Library
            </a>
          </li>
          <li>
            <strong>Special Prize of the Jury, Best Serious Game 2020</strong> — Computerspielakademie Bayern for the
            VR Subway Simulator ·{' '}
            <a href="https://games.jff.de/gamespreis/" target="_blank" rel="noopener noreferrer">
              Gamespreis
            </a>
          </li>
          <li>
            <strong>HS Kempten feature</strong> — rtxON, one of the early Vulkan ray-tracing renderers ·{' '}
            <a
              href="https://www.hs-kempten.de/fakultaet-informatik/aktuelles/artikel/raytracing-mit-vulkan-auf-nividia-rtx-1339"
              target="_blank"
              rel="noopener noreferrer">
              Article (DE)
            </a>
          </li>
        </ul>

        <h2 style={{ marginTop: '20px' }}>Elsewhere</h2>
        <ul>
          <li>
            <a href="https://www.youtube.com/@theupsider" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>{' '}
            — tutorials and project insights
          </li>
          <li>
            <a href="https://github.com/theUpsider" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            — open source: ComfyUI-Logic, ComfyUI-Styles_CSV_Loader, lsp-mcp, Rotaris
          </li>
          <li>
            <a href="https://www.linkedin.com/in/david-fischer-824566155/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>{' '}
            — professional updates
          </li>
          <li>
            <a href="/feed.xml">Blog feed</a> — posts via RSS
          </li>
        </ul>
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
export default Media
