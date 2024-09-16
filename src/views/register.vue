<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card" style="margin-top: 50px; background-color: lightgrey">
          <div class="card-header">Registracija</div>
          <div class="card-body">
            <form @submit.prevent="registerUser">
              <div class="form-group">
                <v-text-field
                  v-model="username"
                  :rules="[rules.required, rules.userName]"
                  label="Korisničko ime"
                  required
                ></v-text-field>
              </div>
              <div class="form-group">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Email adresa"
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
              <div class="form-group">
                <v-text-field
                  v-model="confirmPassword"
                  :rules="[rules.required, rules.confirmPassword]"
                  label="Potvrdi lozinku"
                  type="password"
                  required
                ></v-text-field>
              </div>
              <div class="form-group">
                <v-select
                  label="Role"
                  :items="users"
                  v-model="userType"
                ></v-select>
              </div>
              <v-btn type="submit" color="primary" style="margin-top: 10px">
                Registriraj se
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

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: null,
      rules: {
        required: (v) => !!v || "Ovo polje je obavezno.",
        email: (v) => /.+@.+\..+/.test(v) || "Unesite ispravnu email adresu.",
        password: (v) =>
          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/.test(v) ||
          "Lozinka mora imati najmanje 4 znakova i sadržavati slova i brojeve.",
        confirmPassword: (v) =>
          v === this.password || "Lozinke se ne podudaraju.",
        userName: (v) =>
          (v && v.length >= 3) || "Korisničko ime mora imati najmanje 3 znaka.",
        userType: (v) => !!v || "Tip korisnika mora biti odabran.",
      },
      users: ["Korisnik", "Prodavatelj"],
      userType: "",
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        alert("Lozinke se ne podudaraju");
        return;
      }

      try {
        const response = await axios.post(
          "https://gadgetgalaxy-backend.onrender.com/register",
          {
            username: this.username,
            email: this.email,
            password: this.password,
            userType: this.userType,
          },
          {
            headers: {
              "Content-Type": "application/json", // JSON format
            },
          }
        );
        // Pohranjivanje tokena u localStorage
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        const userType = JSON.parse(atob(token.split(".")[1])).userType;
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("username", response.data.username);
        this.$userState.isLoggedIn = true;
        this.$userState.userType = response.data.userType;
        this.$userState.userName = response.data.username;

        localStorage.setItem("authToken", token);
        localStorage.setItem("username", this.username);
        localStorage.setItem("userType", this.userType);

        this.$userState.isLoggedIn = true;
        this.$userState.userName = this.username;
        this.$userState.userType = this.userType;

        this.$router.push(userType === "Prodavatelj" ? "/seller" : "/");
      } catch (error) {
        console.error("Greška pri registraciji:", error);
      }
    },
  },
};
</script>

<style scoped></style>
