import { useTheme } from './ThemeProvider'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

const Button = (props: ButtonProps) => {
  const { theme } = useTheme()
  return (
    <button
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.primary,
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: 4,
        padding: 8,
        cursor: 'pointer'
      }}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
