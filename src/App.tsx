import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Preloader } from './components/Preloader'
import { PlayerPage } from './pages/PlayerPage'
import { initializeApp } from './store/app-reducer'
import { AppStateType, DispatchType } from './types/types'

export const App: React.FC = () => {
  const isInitializedApp = useSelector(
    (state: AppStateType) => state.appPage.isInitializedApp,
  )
  const dispatch = useDispatch<DispatchType>()

  useEffect(() => {
    dispatch(initializeApp())
    // eslint-disable-next-line
  }, [])

  if (!isInitializedApp) return <Preloader />

  return (
    <>
      <PlayerPage />
    </>
  )
}
