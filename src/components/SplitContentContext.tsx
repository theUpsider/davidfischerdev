import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react'

type SplitContentState = {
  upperContent: ReactNode
  lowerContent: ReactNode
}

type SplitContentDispatch = {
  setUpperContent: (content: ReactNode) => void
  setLowerContent: (content: ReactNode) => void
}

const SplitContentStateContext = createContext<SplitContentState | undefined>(undefined)
const SplitContentDispatchContext = createContext<SplitContentDispatch | undefined>(undefined)

export const SplitContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [splitContent, setSplitContent] = useState<SplitContentState>({
    upperContent: null,
    lowerContent: null
  })

  const setUpperContent = useCallback((content: ReactNode) => {
    setSplitContent((prev) => ({ ...prev, upperContent: content }))
  }, [])

  const setLowerContent = useCallback((content: ReactNode) => {
    setSplitContent((prev) => ({ ...prev, lowerContent: content }))
  }, [])

  const dispatchValue = useMemo(
    () => ({
      setUpperContent,
      setLowerContent
    }),
    [setUpperContent, setLowerContent]
  )

  return (
    <SplitContentStateContext.Provider value={splitContent}>
      <SplitContentDispatchContext.Provider value={dispatchValue}>{children}</SplitContentDispatchContext.Provider>
    </SplitContentStateContext.Provider>
  )
}

export const useSplitContentState = () => {
  const context = useContext(SplitContentStateContext)
  if (context === undefined) {
    // Return default values during SSR instead of throwing
    if (typeof window === 'undefined') {
      return { upperContent: null, lowerContent: null }
    }
    throw new Error('useSplitContentState must be used within a SplitContentProvider')
  }
  return context
}

export const useSplitContentDispatch = () => {
  const context = useContext(SplitContentDispatchContext)
  if (context === undefined) {
    // Return no-op functions during SSR instead of throwing
    if (typeof window === 'undefined') {
      return {
        setUpperContent: () => {},
        setLowerContent: () => {}
      }
    }
    throw new Error('useSplitContentDispatch must be used within a SplitContentProvider')
  }
  return context
}
