import { homeSections } from '@/features/home/homeSections'

export function HomePage() {
  return (
    <>
      {homeSections.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </>
  )
}
