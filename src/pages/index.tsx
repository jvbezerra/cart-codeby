import type { GetServerSideProps } from 'next'

import Button from '../components/Button'
import Product from '../components/Product'
import styles from '../styles/Cart.module.css'

import highItems from '../assets/acima-10-reais.json'
import lowItems from '../assets/abaixo-10-reais.json'

type Props = { products: Product[], totalPrice: number }

export default function Cart({ products, totalPrice }: Props) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>
          Meu carrinho
        </h1>
      </header>
      <main>
        <ul className={styles.items}>
          {products.length == 0 && <p>Carrinho vazio.</p>}
          {products.map(item => <Product item={item} key={item.id}/>)}
        </ul>

        <section className={styles.section}>
          <dl className={styles.results__price}>
            <dt>Total</dt>
            <dd>R${totalPrice / 100}</dd>
          </dl>
          {(totalPrice / 100) > 10 &&
            <p className={styles.results__freeShipping}>
              Parabéns, sua compra tem frete grátis!
            </p>
          }
        </section>
        
        <section className={styles.section}>
          <Button style={{ width: '100%', maxWidth: '500px' }}>
            Finalizar compra
          </Button>
        </section>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const listType = ctx.query.type ?? 'low'
  const products = listType == 'low' ? lowItems : highItems
  return {
    props: {
      products: products.items,
      totalPrice: products.value
    }
  } 
}