import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import { useTheme } from '../components/ThemeProvider'

type Mnemonic = {
  id: number
  number: string
  word: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  overflow-y: auto;
`

const Card = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const PaddedContent = styled.div`
  padding: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
`

type InputProps = {
  darkTheme?: boolean
}

const Input = styled.input<InputProps>`
  padding: 0.5rem;
  font-size: 1rem;
  margin: 1rem 0;
  border: 1px solid ${(props) => (!props.darkTheme ? 'black' : 'white')};
  border-radius: 4px;
  background-color: ${(props) => (props.darkTheme ? 'black' : 'white')};
  color: ${(props) => (!props.darkTheme ? 'black' : 'white')};
`

const TableContainer = styled.div`
  max-height: 400px; /* Adjust the height as needed */
  overflow-y: auto;
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const Th = styled.th`
  border: 1px solid;
  padding: 8px;
  text-align: center;
`

const ErrorMessage = styled.div<{ theme: any }>`
  background-color: ${(props) => (props.theme === 'dark' ? '#3c1518' : '#f8d7da')};
  color: ${(props) => (props.theme === 'dark' ? '#f5c2c7' : '#721c24')};
  border: 1px solid ${(props) => (props.theme === 'dark' ? '#842029' : '#f5c2c7')};
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;

  strong {
    font-weight: bold;
  }
`

const Td = styled.td`
  border: 1px solid;
  padding: 8px;
  text-align: start;
`

// Mock data for when API is not available
const mockMnemonics: { [key: string]: Mnemonic[] } = {
  '2': [
    { id: 1, number: '2', word: 'Noah' },
    { id: 2, number: '2', word: 'new' },
    { id: 3, number: '2', word: 'in' }
  ],
  '3': [
    { id: 4, number: '3', word: 'me' },
    { id: 5, number: '3', word: 'my' },
    { id: 6, number: '3', word: 'am' }
  ],
  '23': [
    { id: 7, number: '23', word: 'name' },
    { id: 8, number: '23', word: 'enemy' },
    { id: 9, number: '23', word: 'anime' }
  ]
}

const App = () => {
  const [mnemonics, setMnemonics] = useState<{ [key: string]: Mnemonic[] }>({})
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()

  const splitNumber = (number: string, splitLength: number) => {
    const result = []
    for (let i = 0; i < number.length; i += splitLength) {
      result.push(number.substring(i, i + splitLength))
    }
    return result
  }

  const fetchMnemonics = async () => {
    try {
      setLoading(true)
      setError(null)
      const searchNumber = searchParams.get('number') ?? ''
      const splitLength = parseInt(searchParams.get('split') ?? '0', 10)

      if (!searchNumber || isNaN(splitLength) || splitLength <= 0) {
        setLoading(false)
        return
      }

      const splits = splitNumber(searchNumber, splitLength)
      const mnemonicsData: { [key: string]: Mnemonic[] } = {}

      try {
        await Promise.all(
          splits.map(async (split) => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
            const response = await axios.get(`${apiBaseUrl}/v1/words/number/${split}`)
            mnemonicsData[split] = response.data
          })
        )
        setMnemonics(mnemonicsData)
      } catch (apiError) {
        // Fall back to mock data if API is not available
        console.warn('API not available, using mock data:', apiError)
        const mockData: { [key: string]: Mnemonic[] } = {}
        splits.forEach((split) => {
          if (mockMnemonics[split]) {
            mockData[split] = mockMnemonics[split]
          } else {
            // Generate simple mock data for unknown splits
            mockData[split] = [
              { id: Math.random(), number: split, word: `mock-word-${split}` },
              { id: Math.random(), number: split, word: `example-${split}` }
            ]
          }
        })
        setMnemonics(mockData)
        setError('API server not available. Showing mock data for demonstration.')
      }
    } catch (error) {
      console.error('Error in fetchMnemonics:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMnemonics()
  }, [])

  return (
    <Container>
      <Card>
        <Title>Major System Mnemonics Generator</Title>
        <Input
          darkTheme={theme.palette.type === 'dark'}
          type="text"
          value={searchParams.get('number') ?? ''}
          onChange={(e) => setSearchParams({ number: e.target.value, split: searchParams.get('split') ?? '' })}
          placeholder="Enter a number"
        />
        <Input
          darkTheme={theme.palette.type === 'dark'}
          type="number"
          value={searchParams.get('split') ?? ''}
          onChange={(e) => setSearchParams({ number: searchParams.get('number') ?? '', split: e.target.value })}
          placeholder="Enter split length"
        />
        <Button onClick={fetchMnemonics} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Mnemonics'}
        </Button>
        {error && (
          <ErrorMessage theme={theme.palette.type}>
            <strong>Notice:</strong> {error}
          </ErrorMessage>
        )}
        {Object.keys(mnemonics).length > 0 && (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  {Object.keys(mnemonics).map((split) => (
                    <Th key={split}>{split}</Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.keys(mnemonics).map((split) => (
                    <Td key={split}>
                      <ul>
                        {mnemonics[split].map((mnemonic) => (
                          <li key={mnemonic.id}>{mnemonic.word}</li>
                        ))}
                      </ul>
                    </Td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </TableContainer>
        )}
      </Card>
      <PaddedContent>
        <h2>Remember Table German</h2>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Number</Th>
                <Th>Word</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>0</Td>
                <Td>s,z,ß</Td>
              </tr>
              <tr>
                <Td>1</Td>
                <Td>t,d,th</Td>
              </tr>
              <tr>
                <Td>2</Td>
                <Td>n</Td>
              </tr>
              <tr>
                <Td>3</Td>
                <Td>m</Td>
              </tr>
              <tr>
                <Td>4</Td>
                <Td>r</Td>
              </tr>
              <tr>
                <Td>5</Td>
                <Td>l</Td>
              </tr>
              <tr>
                <Td>6</Td>
                <Td>ch,j,sch</Td>
              </tr>
              <tr>
                <Td>7</Td>
                <Td>k,c,g,ck</Td>
              </tr>
              <tr>
                <Td>8</Td>
                <Td>f,v,w,ph</Td>
              </tr>
              <tr>
                <Td>9</Td>
                <Td>p,b</Td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </PaddedContent>
      <PaddedContent>
        <h2>Explanation</h2>
        <p>
          The Major System is a mnemonic technique used to aid in memorizing numbers. It works by converting numbers
          into consonant sounds, then into words by adding vowels.
        </p>
        <p>The words can then be used to create phrases or sentences to help remember the original number.</p>
        <h2>How to use</h2>
        <ol>
          <li>Enter a number in the input field above</li>
          <li>Enter a split length. If the word is 4 letters, 4 split length will query for the whole word.</li>
          <li>Click the "Generate Mnemonics" button</li>
          <li>View the generated mnemonics below</li>
        </ol>
      </PaddedContent>
    </Container>
  )
}

export default App
