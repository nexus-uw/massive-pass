import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    'asss': 111
  },
})

document.body.style.backgroundColor = '#560056'
document.body.style.color = '#d9bd28'
document.body.style.fontFamily = "'Comic Sans MS', cursive"
document.body.style.height = ' 100 %';
document.body.style.margin = '0';
export default app
