import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type SearchProps = {
  searchParams: { q: string }
}

type SearchProductsProps = {
  query: string
}

const searchProducts = async ({
  query,
}: SearchProductsProps): Promise<Product[]> => {
  const response = await api(`/products/search?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  return await response.json()
}

const Search = async ({ searchParams }: SearchProps) => {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts({ query })

  return (
    <div className="flex flex-col gap-4">
      <p>
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
          >
            <Image
              src={product.image}
              alt=""
              width={480}
              height={480}
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
    </div>
  )
}

export default Search
