<template>
  <v-app class="v-background">
    <v-app-bar app class="v-application">
      <v-toolbar-title>
        <router-link
          to="/"
          class="white--text text-decoration-none"
          v-if="$userState.isLoggedIn && $userState.userType === 'Korisnik'"
        >
          Gadget Galaxy
        </router-link>
        <span 
          class="white--text text-decoration-none"
          v-if="$userState.isLoggedIn && $userState.userType === 'Prodavatelj'"
        >
          Gadget Galaxy
        </span>
        <router-link
          to="/"
          class="white--text text-decoration-none"
          v-if="!$userState.isLoggedIn"
        >
          Gadget Galaxy
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="!$userState.isLoggedIn" style="color: white">
        &nbsp; {{ mail }} &nbsp;
      </div>

      <div v-if="$userState.isLoggedIn" style="color: white">
        &nbsp; {{ $userState.userType }} | {{ $userState.userName }} &nbsp;
      </div>

      <v-btn
        v-if="!$userState.isLoggedIn"
        text
        @click="$router.push('/login')"
        style="color: white"
        >Login</v-btn
      >
      <v-btn
        v-if="!$userState.isLoggedIn"
        text
        @click="$router.push('/register')"
        style="color: white"
        >Register</v-btn
      >
      <v-btn
        v-if="$userState.isLoggedIn"
        text
        @click.prevent="goToProfile"
        style="color: white"
        >Profile</v-btn
      >
      <v-btn
        v-if="$userState.isLoggedIn"
        text
        @click.prevent="logout"
        style="color: white"
        >LogOut</v-btn
      >
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

    goToProfile() {
      if (this.$userState.isLoggedIn) {
        this.$router.push("/profile");
      } else {
        this.$router.push("/login");
      }
    },

    checkAuthentication() {
      // Provjera autentikacije pomoću tokena u localStorage-u
      const token = localStorage.getItem("authToken");

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
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
.v-application {
  background-color: #1e3a5f !important; 
}

.v-background {
  background-color: #020620 !important;
  min-height: 100vh; /* Pokriva cijeli zaslon vertikalno */
  display: flex;
  flex-direction: column;
}
</style>