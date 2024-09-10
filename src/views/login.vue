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
              <v-btn type="submit" color="primary" class="mt-3">
                Prijavi se
              </v-btn>
            </form>
            <v-alert v-if="error" type="error" dismissible class="mt-3">
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
import { loginUser } from '../main.js'

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Unesi valjan email",
        password: (v) =>
          !!(v || "").match(/^(?=.*[a-zA-Z])(?=.*\d).{4,}$/) ||
          "Lozinka mora sadržavati slova, brojeve i biti minimalno 4 znakova",
        required: (v) => !!v || "Potrebno popuniti polje",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:50000/api/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json", // JSON format
            },
          }
        );

        const token = response.data.token;
        localStorage.setItem("authToken", token);
        loginUser(token);

        const userType = JSON.parse(atob(token.split(".")[1])).userType;
        localStorage.setItem("userType", response.data.userType);
        this.$userState.isLoggedIn = true;
        this.$userState.userType = response.data.userType;
        this.$router.push(userType === "Prodavatelj" ? "/seller" : "/");
      } catch (err) {
        console.error("Greška pri prijavi", err);
      }
    },
  },
};
</script>

<style scoped></style>
