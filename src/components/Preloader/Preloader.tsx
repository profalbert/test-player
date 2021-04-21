import s from './Preloader.module.scss'

export const Preloader: React.FC = () => {
  return (
    <div className={s.preloader}>
      <h2 className={s.title}>Loading...</h2>
    </div>
  )
}
