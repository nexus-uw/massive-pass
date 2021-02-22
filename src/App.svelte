<script lang="ts">
  export let pass: string = undefined
  export let length: number = 53
  export let includeSpecial: boolean = true
  export let showPassword = false

  const js_sha = document.querySelectorAll('script[crossOrigin="anonymous"]')[0].integrity

  const CHARACTERS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789'.split('')
  const SPECIAL = `\`~!@#$%^&*()-_+={[}};:'",<.>/?\\|`.split('')

  function generate() {
    let p = ''
    let chars = [...CHARACTERS]
    if (includeSpecial) {
      chars = chars.concat(SPECIAL)
    }
    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)
    pass = array.reduce((p, rando) => p + chars[rando % chars.length], '')
  }

  async function copy() {
    await navigator.clipboard.writeText(pass)
  }

  function toggleShowPass() {
    showPassword = !showPassword
  }
</script>

<main>
  <h1 class="title">MASSIVE PASS</h1>
  <h3>an unspecial password generator</h3>
  {#if !!pass}
    <div class={showPassword ? '' : 'disable-text-selection'}>
      password: <pre>{showPassword ? pass : Array(length).fill('*').join('')}</pre>
    </div>
    <button class="fity" on:click={copy}>copy to clipboard</button>
    <button class="fity" on:click={toggleShowPass}>{showPassword ? 'hide' : 'show'} password</button>
  {:else}
    click generate
  {/if}
  <div>
    <label>pass length:<input type="number" bind:value={length} min="1" /></label>
    <label> include specials? <input type="checkbox" bind:checked={includeSpecial} /></label>
  </div>
  <div>
    <button on:click={generate}>generate</button>
  </div>
  <footer>
    JS SHA {js_sha} | yet another project by <a href="https://ramsay.xyz">SIMON RAMSAY</a> |
    <a href="https://github.com/nexus-uw/massive-pass">CODE</a> |
    2021 - CURRENT YEAR <a href="https://unlicense.org/">UNLICENSE</a>
  </footer>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .title {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .disable-text-selection {
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    user-select: none;
  }

  button {
    color: blue;
    border-block-color: pink;
    width: 100%;
    padding: 1px 6px;
    font: 400 13.3333px;
    border-width: 0.25rem;
    height: 5rem;
  }

  .fity {
    width: 50%;
    color: greenyellow;
  }

  footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
    color: #ffffff;
    background: #06303a;
    font-size: 0.5em;
    text-align: center;
    line-height: 100px;
  }
</style>
