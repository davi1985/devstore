import { useContext } from 'react'
import { CartContext } from '@/context/cart-context'

export const useCart = () => useContext(CartContext)
