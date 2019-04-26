<template>
  <div>
    <div class="nav">
      <router-link to="/home">home</router-link> |
      <router-link to="/about">about</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {}
}
</script>

<style>
.nav {
  text-align: center;
  color: #2c3e50;
  padding: 30px;
}
.nav a {
  font-weight: bold;
  color: #2c3e50;
}
.nav a.router-link-exact-active {
  color: #42b983;
}
</style>