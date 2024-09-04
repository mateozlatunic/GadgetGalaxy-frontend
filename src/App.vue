<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <router-link to="/" class="white--text text-decoration-none"
          >Gadget Galaxy</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text to="/login">Login</v-btn>
      <v-btn text to="/register">Register</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    
  }),
  methods: {
    navigateTo(route) {
      this.$router.push({ path: `/${route}` });
    }
  }
};
</script>
