import Image from 'next/image'
import styles from './index.module.css'

type Props = {
  item: Product
}

export default function Product({ item }: Props) {
  return (
    <li className={styles.product}>
      <Image
        className={styles.product__image}
        alt={item.name}
        src={item.imageUrl}
        width="100px"
        height="100px"
      />
      <div className={styles.product__details}>
        <h2 className={styles.product__title}>{item.name}</h2>
        <div>
          <p className={styles['product__price--old']}>
            R${item.price / 100}
          </p>
          <p className={styles.product__price}>
            R${item.sellingPrice / 100}
          </p>
        </div>
      </div>
    </li>
  )
}