'use client'

import { ReactNode, createContext, useMemo, useState } from 'react'

type CartItem = {
  productId: number
  quantity: number
}

type AddToCart = {
  productId: number
}

type CartProviderPRops = {
  children: ReactNode
}

type CartContextType = {
  items: CartItem[]
  addToCart: ({ productId }: AddToCart) => void
}

export const CartContext = createContext({} as CartContextType)

export const CartProvider = ({ children }: CartProviderPRops) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = ({ productId }: AddToCart) => {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.productId === productId)

      const updateProductInCart = state.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )

      return productInCart
        ? updateProductInCart
        : [...state, { productId, quantity: 1 }]
    })
  }

  const value = useMemo<CartContextType>(
    () => ({ items: cartItems, addToCart }),
    [cartItems],
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
