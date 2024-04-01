'use client'

import { Skeleton } from '@/components/skeleton'
import { Suspense } from 'react'
import { CurrentSearch } from './current-search'

const SearchLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        <CurrentSearch />
      </Suspense>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />
        <Skeleton className="h-[430px]" />S
      </div>
    </div>
  )
}

export default SearchLoading
