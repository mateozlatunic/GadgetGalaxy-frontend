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
        // Ispisivanje podataka koji se šalju
        console.log("Šaljem podatke za prijavu:", {
          email: this.email,
          password: this.password,
        });

        const response = await axios.get("http://localhost:50000/login", {
          params: {
            email: this.email,
            password: this.password,
          },
        });

        console.log("Odgovor servera:", response.data);

        // Spremanje tokena u localStorage
        const token = response.data.token;
        localStorage.setItem("token", token);

        console.log("Token spremljen u localStorage:", response.data.token);

        if (this.$route.name !== "welcome") {
          this.$router.push({ name: "welcome" }); 
        }
      } catch (error) {
        console.error(
          "Greška pri prijavi:",
          error.response?.data || "Unknown error"
        );

        // Prikazivanje greške korisniku
        this.error =
          "Login failed: " + (error.response?.data || "Unknown error");
      }
    },
  },
};
</script>

<style scoped></style>
