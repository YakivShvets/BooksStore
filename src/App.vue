<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/cart">Cart</router-link>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
#nav {
  display: none;
}
</style>
