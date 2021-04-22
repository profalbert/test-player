import { useState, useEffect } from 'react'
import { Preloader } from './components/Preloader/Preloader'
import { PlayerPage } from './pages/PlayerPage/PlayerPage'

export const App: React.FC = () => {
  const [isInitializedApp, setIsInitializedApp] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsInitializedApp(true)
    }, 1000)
  }, [])

  if (!isInitializedApp) return <Preloader />

  return (
    <>
      <PlayerPage />
    </>
  )
}
