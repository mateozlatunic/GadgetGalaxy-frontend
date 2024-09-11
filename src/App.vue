<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <router-link to="/" class="white--text text-decoration-none">
          Gadget Galaxy
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="!$userState.isLoggedIn">
        &nbsp; {{ mail }} &nbsp;
      </div>

      <div v-if="$userState.isLoggedIn">
        &nbsp; {{ $userState.userType }} | {{ $userState.userName }} &nbsp;
      </div>

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
    mail: "Status | guest user",
  }),

  mounted() {
    this.checkAuthentication();
  },

  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("username");
      this.$userState.isLoggedIn = false;
      this.$userState.userType = null;
      this.$userState.userName = null;
      if (this.$router.currentRoute.path !== "/") {
        this.$router.replace({ path: "/" });
      }
    },

    checkAuthentication() {
      // Provjera autentikacije pomoću tokena u localStorage-u
      const token = localStorage.getItem("authToken");

      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.$userState.isLoggedIn = true;
        this.$userState.userType = payload.userType;
        this.$userState.userName = payload.username;
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

<style scoped>
</style>
