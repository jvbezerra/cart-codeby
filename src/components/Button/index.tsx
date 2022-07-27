import styles from './index.module.css'

type Props = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...props }: Props) {
  return (
    <button className={styles.button} {...props}>
      { children }
    </button>
  )
}