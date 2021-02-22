import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {

  },
})

/**background-color: purple;
    color: gold;
    font-family: 'Comic Sans MS', cursive; */
document.body.style.backgroundColor = '#560056'
document.body.style.color = '#d9bd28'
document.body.style.fontFamily = "'Comic Sans MS', cursive"

export default app
