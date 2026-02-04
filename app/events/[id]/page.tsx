import EventDetails from '@/components/EventDetails'
import LoadingSpinner from '@/components/LoadingSpinner'
import { getEvent } from '@/lib/requests.server'
import { Suspense } from 'react'
 
export default function Page({ params }: PageProps<'/events/[id]'>) {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        {params.then(({ id }) => (
          <Content id={id} />
        ))}
      </Suspense>
    </div>
  )
}
 
async function Content({ id }: { id: string }) {
  const res = await getEvent(parseInt(id))
  const data = await res.json()
 
  if (data.error) {
    return (

      <p className="mt-12 text-lg text-center w-full font-bold text-muted-foreground">Begivenheden eksisterer ikke</p>
    )
  }
  return (
    <EventDetails event={data} />
  )
}