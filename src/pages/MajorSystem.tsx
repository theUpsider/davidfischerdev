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
`

const Card = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

const Td = styled.td`
  border: 1px solid;
  padding: 8px;
  text-align: center;
`

const App = () => {
  const [mnemonics, setMnemonics] = useState<{ [key: string]: Mnemonic[] }>({})
  const [searchParams, setSearchParams] = useSearchParams()
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
      const searchNumber = searchParams.get('number') ?? ''
      const splitLength = parseInt(searchParams.get('split') ?? '0', 10)

      if (!searchNumber || isNaN(splitLength) || splitLength <= 0) {
        return
      }

      const splits = splitNumber(searchNumber, splitLength)
      const mnemonicsData: { [key: string]: Mnemonic[] } = {}

      await Promise.all(
        splits.map(async (split) => {
          const response = await axios.get(`http://localhost:5000/v1/words/number/${split}`)
          mnemonicsData[split] = response.data
        })
      )

      setMnemonics(mnemonicsData)
    } catch (error) {
      console.error('Error fetching mnemonics:', error)
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
        <Button onClick={fetchMnemonics}>Generate Mnemonics</Button>
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
                        {mnemonics[split].map((mnemonic, index) => (
                          <li key={index}>{mnemonic.word}</li>
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
    </Container>
  )
}

export default App
