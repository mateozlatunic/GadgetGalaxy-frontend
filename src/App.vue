<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <router-link to="/" class="white--text text-decoration-none">
          Gadget Galaxy
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn v-if="!$userState.isLoggedIn" text @click="$router.push('/login')">Login</v-btn>
      <v-btn v-if="!$userState.isLoggedIn" text @click="$router.push('/register')">Register</v-btn>
      <v-btn v-if="$userState.isLoggedIn" text @click.prevent="logout">LogOut</v-btn>  
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
    isAuthenticated: false,
  }),

  mounted() {
    this.checkAuthentication();
  },

  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      this.$userState.isLoggedIn = false;
      this.$userState.userType = null;
      if (this.$router.currentRoute.path !== "/") {
        this.$router.replace({ path: "/" });
      }
    },

    checkAuthentication() {
      // token u localStorage-u
      const token = localStorage.getItem("authToken");

      if (token) {
        this.$userState.isLoggedIn = true;
        this.$userState.userType = JSON.parse(atob(token.split('.')[1])).userType;
      } else {
        this.$userState.isLoggedIn = false;

        if (this.$router.currentRoute.path !== "/") {
          this.$router.replace({ path: "/" });
        }
      }
    },
  },
};
</script>
