import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/Button'

type Memnonic = {
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
  background-color: #f5f5f5;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const MnemonicList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const MnemonicItem = styled.li`
  padding: 0.5rem;
  font-size: 1.2rem;
  color: #333;
  border-bottom: 1px solid #ccc;
`

const App = () => {
  const [mnemonics, setMnemonics] = useState<Memnonic[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const fetchMnemonics = async () => {
    try {
      const searchNumber = searchParams.get('number')
      const response = await axios.get(`http://localhost:5000/v1/words/number/${searchNumber}`)
      setMnemonics(response.data)
    } catch (error) {
      console.error('Error fetching mnemonics:', error)
    }
  }

  useEffect(() => {
    fetchMnemonics()
  }, [])

  return (
    <Container>
      <Title>Major System Mnemonics Generator</Title>
      <Input
        type="text"
        value={searchParams.get('number') ?? ''}
        onChange={(e) => setSearchParams({ number: e.target.value })}
        placeholder="Enter a number"
      />
      <Button onClick={fetchMnemonics}>Generate Mnemonics</Button>
      <MnemonicList>
        {mnemonics.map((mnemonic, index) => (
          <MnemonicItem key={index}>{mnemonic.word}</MnemonicItem>
        ))}
      </MnemonicList>
    </Container>
  )
}

export default App
