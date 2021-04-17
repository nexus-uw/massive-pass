<script lang="ts">
  export let pass: string = undefined;
  export let length: number = 53;
  export let includeSpecial: boolean = true;
  export let showPassword = false;

  const js_sha = document.querySelectorAll('script[crossOrigin="anonymous"]')[0]?.integrity || "DEV_MODE";

  const CHARACTERS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789".split("");
  const SPECIAL = `\`~!@#$%^&*()-_+={[}};:'",<.>/?\\|`.split("");

  let copyText = "copy to clipboard";
  function generate() {
    let p = "";
    let chars = [...CHARACTERS];
    if (includeSpecial) {
      chars = chars.concat(SPECIAL);
    }
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    pass = array.reduce((p, rando) => p + chars[rando % chars.length], "");
  }

  async function copy() {
    await navigator.clipboard.writeText(pass);
    copyText = "copied";
    setTimeout(() => (copyText = "click to copy again"), 2500);
  }

  function toggleShowPass() {
    showPassword = !showPassword;
  }
</script>

<main>
  <h1 class="title">MASSIVE PASS</h1>
  <h3>an unspecial password generator</h3>
  {#if !!pass}
    <div class={showPassword ? "" : "disable-text-selection"}>
      password: <div class="password">{showPassword ? pass : Array(length).fill("*").join("")}</div>
    </div>
    <div class="row">
      <button class="fity foobar" on:click={copy}>{copyText}</button>
      <button class="fity" on:click={toggleShowPass}>{showPassword ? "hide" : "show"} password</button>
    </div>
  {:else}
    click generate
  {/if}
  <div>
    <label>pass length:<input type="number" bind:value={length} min="1" /></label>
    <label> include specials? <input type="checkbox" bind:checked={includeSpecial} /></label>
  </div>
  <div>
    <button class="generate" on:click={generate}>generate</button>
  </div>
</main>

<footer>
  <hr />
  <div>JS SHA {js_sha}</div>
  <div class="footer_links">
    <a href="TODO">TOR</a> | yet another project by <a href="https://ramsay.xyz">SIMON RAMSAY</a> |
    <a href="https://github.com/nexus-uw/massive-pass">CODE</a> | 2021 - CURRENT YEAR
    <a href="https://unlicense.org/">UNLICENSE</a>
  </div>
</footer>

<style>
  .password {
    word-wrap: normal;
    word-break: break-all;
  }
  a {
    color: pink;
    font-family: "Courier New", Courier, monospace;
  }
  button {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
    color: greenyellow;
    background-color: black;
    font-size: 1.12rem;
  }
  .row {
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .foobar {
    margin-right: 7rem;
  }
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;

    min-height: 100%;

    /* Equal to height of footer */
    /* But also accounting for potential margin-bottom of last child */
    /* margin-bottom: -120px; */
  }

  .generate {
    margin-top: 2.5rem;
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
    /* position: absolute;
    left: 0;
    bottom: 0;
    height: 120px;
    width: 100%;
    color: #ffffff;
    background: #06303a;
    font-size: 0.666em;
    text-align: center;
    line-height: 50px; */
  }
  .footer_links {
    display: flex;
    justify-content: center;
  }
</style>
