import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const pxToRem = (px) => `${px / 22.5}rem`;
export const pxToVw = (px) => `${(100 / 1920) * px}vw`;
// `${(100 / document.documentElement.clientWidth) * px}vw`;

export const pxToVh = (px) => `${px / (930 * 0.01)}vh`;
// `${px / (document.documentElement.clientHeight * 0.01)}vh`;
export const ContainedButton = withStyles({
  root: {
    background: '#14AFF1',
    borderRadius: 4,
    border: 0,
    color: 'white',
    height: pxToVh(45),
    padding: '0.5vh 0.5vw',
    size: 'small',
  },
  label: {
    textTransform: 'none',
  },
})(Button);
export const OutlinedButton = withStyles({
  root: {
    borderRadius: 4,
    border: '1px solid #14AFF1',
    color: 'white',
    '&:disabled': {
      color: '#97A1A9',
    },
    height: pxToVh(45),
    size: 'small',
    padding: '0.5vh 0.5vw',
  },
  label: {
    textTransform: 'none',
  },
})(Button);

export default createMuiTheme({
  palette: {
    primary: {
      main: '#58687E',
      light: 'rgb(93,175,240,0.5)',
      dark: 'rgb(93,175,240,0.2)',
    },
    secondary: {
      main: '#14AFF1',
    },
    text: {
      primary: '#ffffff',
      secondary: '#97A1A9',
    },
  },
  MuiTable: {
    stickyHeader: {
      position: 'sticky',
      backgroundColor: 'black',
      color: '#58687e',
    },
  },
});
