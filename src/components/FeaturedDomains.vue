<template>
  <div class="container text-center">
    <h3>Featured domains</h3>

    <div class="row mt-4">

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://smol.domains">
          <div class="container text-center">
            <p class="text-break mt-3">
              .smol
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://degenname.lol/">
          <div class="container text-center">
            <p class="text-break mt-3">
              .degen
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://names.pooly.me">
          <div class="container text-center">
            <p class="text-break mt-3">
              .pool
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://optimistic.domains">
          <div class="container text-center">
            <p class="text-break mt-3">
              .op
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://songbird.domains">
          <div class="container text-center">
            <p class="text-break mt-3">
              .sgb
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://giveth.punk.domains">
          <div class="container text-center">
            <p class="text-break mt-3">
              .giveth
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <router-link tag="a" to="/">
          <div class="container text-center">
            <p class="text-break mt-3">
              .arbi
            </p>
          </div>
        </router-link>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://flr.domains">
          <div class="container text-center">
            <p class="text-break mt-3">
              .flr
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://fantomname.org">
          <div class="container text-center">
            <p class="text-break mt-3">
              .fantom
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://ppl.domains">
          <div class="container text-center">
            <p class="text-break mt-3">
              .ppl
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://www.kns.earth">
          <div class="container text-center">
            <p class="text-break mt-3">
              .klima
            </p>
          </div>
        </a>
      </div>

      <div class="col-md-2 mb-3">
        <a target="_blank" href="https://dns.dopewars.gg">
          <div class="container text-center">
            <p class="text-break mt-3">
              .dope
            </p>
          </div>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedDomains'
}
</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 1.2em;
}

a:active {
  transform: scale(0.8);
}

a:hover {
  border-color: white;
  opacity: 0.8;
  font-size: 1.4em;
}
</style>