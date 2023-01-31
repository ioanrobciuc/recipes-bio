import './style.css'

export type ButtonProps = React.ComponentProps<'button'> & {
  children: React.ReactNode
  color: 'green' | 'blue' | 'red'
}

const Button = (props: ButtonProps) => {
  const { children, color } = props

  return <button className={`button ${color}`} type="button" {...props}>{children}</button>
}

export default Button
