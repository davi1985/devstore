import { useSearchParams } from 'next/navigation'

export const CurrentSearch = () => {
  const { get } = useSearchParams()

  const query = get('q')

  return (
    <p className="text-sm">
      Resultados para: <span>{query}</span>
    </p>
  )
}
