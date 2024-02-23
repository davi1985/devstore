import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { Metadata } from 'next'
import Image from 'next/image'

type ProductPageProps = {
  params: { slug: string }
}

type GetProduct = {
  slug: string
}

const getProduct = async ({ slug }: GetProduct): Promise<Product> => {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  return await response.json()
}

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct({ slug: params.slug })

  return {
    title: product.title,
  }
}

export const generateStaticParams = async () => {
  const response = await api('/products/featured')
  const products: Product[] = await response.json()

  return products.map((product) => ({ slug: product.slug }))
}

const ProductPage = async ({ params: { slug } }: ProductPageProps) => {
  const product = await getProduct({ slug })

  const sizes = ['P', 'M', 'G', 'GG']

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          className="relative"
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py2.5 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em até 12x s/ juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}

export default ProductPage
