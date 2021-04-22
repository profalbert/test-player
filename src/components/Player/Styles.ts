import { withStyles, makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

export const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'space-between',
  },
  progressbarSlider: {
    padding: '5px 0px',
    '& .MuiSlider-thumb::after': {
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
    },
  },
})

export const PrettoSlider = withStyles({
  root: {
    color: '#3f50b5',
    height: 4,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -4,
    marginLeft: -6,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider)
