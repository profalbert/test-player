import s from './Preloader.module.scss'
import preloader from '../../assets/icons/preloader.svg'

export const Preloader: React.FC = () => {
  return (
    <div className={s.preloader}>
      <img src={preloader} alt='preloader' />
    </div>
  )
}
