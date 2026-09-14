'use client'
import { useEffect, useMemo } from 'react'
import { useSplitContentDispatch } from '../components/SplitContentContext'

const Research = () => {
  const { setUpperContent, setLowerContent } = useSplitContentDispatch()

  const upperContent = useMemo(
    () => (
      <div
        style={{
          overflow: 'scroll',
          height: '100%',
          transition: 'all 0.5s ease'
        }}>
        <h1>Research</h1>
        <p>
          I research automatic assessment in higher education and natural language processing for freeform student
          responses. My work also covers generative AI in examinations and deep learning for video synthesis.
        </p>
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
            <h2>Evaluation of a Node-based Automatic Short Answer Tool “NodeGrade”</h2>
            <p>ECSEE 2025, ACM. Best Paper Award.</p>
            <a href="https://dl.acm.org/doi/10.1145/3723010.3723021">ACM Digital Library</a>
            <br />
            <a href="https://github.com/HASKI-RAK/NodeGrade">NodeGrade on GitHub</a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>
              Development of a Short Form of the Index of Learning Styles for the Use in Adaptive Learning Systems
            </h2>
            <p>ECSEE 2023. Haug, Fischer, Hagel.</p>
            <a href="https://doi.org/10.1145/3593663.3593675">ACM Digital Library</a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>
              Enhancing NLP-Based Educational Assessment: A Node-Based Graph Approach for Analyzing Freeform Student
              Texts
            </h2>
            <p>47th MIPRO CIST 2024, IEEE. Fischer &amp; Hagel.</p>
            <a href="https://doi.org/10.1109/MIPRO60963.2024.10569607">IEEE publication</a>
          </div>
          <div
            style={{
              borderTop: '1px solid black'
            }}>
            <h2>Master thesis: Long-term world consistency for unsupervised video-to-video translation</h2>
            <a href="https://www.researchgate.net/publication/358164216_Long-term_world_consistency_for_unsupervised_Video-to-video_Translation">
              ResearchGate
            </a>
          </div>
        </div>
      </div>
    ),
    []
  )

  const lowerContent = useMemo(
    () => (
      <div style={{ padding: '20px 0' }}>
        <h2>Research Fields</h2>
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
            <h3>Generative AI in exams</h3>
            <p>Research on generative AI in assessment and examination settings.</p>
          </div>
          <div
            style={{
              padding: '1rem',
              border: '1px solid #484a4d',
              borderRadius: '4px'
            }}>
            <h3>Automatic short answer grading / NLP</h3>
            <p>NodeGrade, KATALYST, and Gexam: scoring and feedback for freeform student responses.</p>
          </div>
          <div
            style={{
              padding: '1rem',
              border: '1px solid #484a4d',
              borderRadius: '4px'
            }}>
            <h3>Deep learning &amp; video synthesis</h3>
            <p>Long-term consistency in unsupervised video-to-video translation.</p>
          </div>
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

export default Research
