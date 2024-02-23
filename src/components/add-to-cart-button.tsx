'use client'

import { useCart } from '@/hooks/use-cart'

type AddToCartButtonProps = { productId: number }

export const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => addToCart({ productId })

  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      onClick={handleAddToCart}
    >
      Adicionar ao carrinho
    </button>
  )
}
