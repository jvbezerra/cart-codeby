import type { GetServerSideProps } from 'next'

import Button from '../components/Button'
import Product from '../components/Product'
import styles from '../styles/Cart.module.css'

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
  let lowProductsUrl = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5bbd6fdd-abae-411d-96cc-1a5d76d3803b/abaixo-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220727%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220727T151344Z&X-Amz-Expires=86400&X-Amz-Signature=1c1e0ab992a5863b6afde2a0c6c7be35c9a06676d9c83b266ceaf5103d6fd8de&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"abaixo-10-reais.json"&x-id=GetObject'
  let highProductsUrl = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/11b895d0-bc64-4f3a-bfa9-7c652be8d415/acima-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220727%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220727T023123Z&X-Amz-Expires=86400&X-Amz-Signature=13aadc133d9264f8ac5d5c489987e13fd95c877271dc62a4e76c01ff304ccb07&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D"acima-10-reais.json"&x-id=GetObject'

  const { items: products } = await fetch(listType == 'low' ? lowProductsUrl : highProductsUrl)
    .then(res => res.json())
  const totalPrice = (products as Product[]).reduce((acc, item) => acc += item.sellingPrice, 0)
  return { props: { products, totalPrice } }
}