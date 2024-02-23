'use client'

import { Skeleton } from '@/components/skeleton'
import { useSearchParams } from 'next/navigation'

const SearchLoading = () => {
  const { get } = useSearchParams()

  const query = get('q')

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span>{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
      </div>
    </div>
  )
}

export default SearchLoading
