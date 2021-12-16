<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="secondary" class="mb-1">
        <b-navbar-nav class="mr-auto">
          <b-nav-item exact exact-active-class="active" to="/">Calculate</b-nav-item>
          <b-nav-item exact exact-active-class="active" to="/analyze">Analyze</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav right>
          <b-nav-item><img :width="25" :height="25" src="@/assets/logo.png"/></b-nav-item>
          <b-nav-item exact exact-active-class="active" to="/contribute">Contribute</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: () => ({
    filename: null,
    jsonFile: null,
    jsonData: {},
    isOpen: false,
  })
}
</script>