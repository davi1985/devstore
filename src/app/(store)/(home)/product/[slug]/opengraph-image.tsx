import { api } from '@/data/api'
import { Product } from '@/data/types/products'
import { env } from '@/env'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

type ImageProps = { params: { slug: string } }

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const getProduct = async (slug: string): Promise<Product> => {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  })

  return await response.json()
}

const OpenGraphImage = async ({ params: { slug } }: ImageProps) => {
  const product = await getProduct(slug)

  const productImageUrl = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={productImageUrl} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}

export default OpenGraphImage
