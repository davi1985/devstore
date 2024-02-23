'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

type HandleSearchProps = {
  event: FormEvent<HTMLFormElement>
}

export const SearchForm = () => {
  const { push } = useRouter()
  const { get } = useSearchParams()

  const query = get('q')

  const handleSearch = ({ event }: HandleSearchProps) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={(event) => handleSearch({ event })}
      className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-5 h-5 text-zinc-500" />

      <input
        name="q"
        defaultValue={query ?? ''}
        type="text"
        placeholder="Buscar produtos"
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
    </form>
  )
}
