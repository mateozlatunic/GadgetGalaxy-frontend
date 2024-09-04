<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <v-text-field
                  v-model="email"
                  :rules="[rules.email, rules.required]"
                  label="Email"
                  type="email"
                  required
                ></v-text-field>
              </div>
              <div class="form-group">
                <v-text-field
                  v-model="password"
                  :rules="[rules.required, rules.password]"
                  label="Lozinka"
                  type="password"
                  required
                ></v-text-field>
              </div>
              <v-btn
                type="submit"
                color="primary"
                class="mt-3"
                @click="login()"
              >
                Prijavi se
              </v-btn>
            </form>
            <v-alert
              v-if="error"
              type="error"
              dismissible
              class="mt-3"
            >
              {{ error }}
            </v-alert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Unesi valjan email",
        password: (v) =>
          !!(v || "").match(/^(?=.*[a-zA-Z])(?=.*\d).*$/) ||
          "Lozinka mora sadržavati slova i brojeve",
        required: (v) => !!v || "Potrebno popuniti polje",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/api/auth/login", {
          email: this.email,
          password: this.password,
        });
        // Spremite token u localStorage ili cookie
        localStorage.setItem("token", response.data.token);
        this.$router.push("/welcome");
      } catch (error) {
        this.error = "Login failed: " + (error.response?.data?.error || "Unknown error");
        console.error("Login failed:", this.error);
      }
    },
  },
};
</script>

<style scoped></style>
