import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const getFeaturedProducts = async (): Promise<Product[]> => {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  return await response.json()
}

export const metadata: Metadata = {
  title: 'Home',
}

const Home = async () => {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6 ">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
      >
        <Image
          src={highlightedProduct.image}
          alt=""
          width={960}
          height={960}
          quality={100}
          className="group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute bottom-28 right-28 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
        >
          <Image
            src={product.image}
            alt=""
            width={960}
            height={960}
            quality={100}
            className="group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute bottom-10 right-10 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home
