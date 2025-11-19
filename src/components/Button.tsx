import { useTheme } from './ThemeProvider'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const Button = (props: ButtonProps) => {
  const { theme } = useTheme()
  return (
    <button
      style={{
        backgroundColor: props.disabled ? theme.palette.background.accent : theme.palette.background.primary,
        color: props.disabled ? theme.palette.text.accent : theme.palette.text.primary,
        border: `1px solid ${props.disabled ? theme.palette.text.accent : theme.palette.text.primary}`,
        borderRadius: 4,
        padding: 8,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.6 : 1
      }}
      onClick={props.disabled ? undefined : props.onClick}
      disabled={props.disabled}>
      {props.children}
    </button>
  )
}

export default Button
