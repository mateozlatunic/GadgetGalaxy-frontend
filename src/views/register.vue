<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Registracija</div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <v-text-field
                  v-model="username"
                  :rules="[rules.required, rules.username]"
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
              <v-btn
                type="submit"
                color="primary"
                style="margin-top: 10px"
                @click="register()"

              >
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
          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
          "Lozinka mora imati najmanje 8 znakova i sadržavati slova i brojeve.",
        confirmPassword: (v) =>
          v === this.password || "Lozinke se ne podudaraju.",
        username: (v) =>
          (v && v.length >= 3) || "Korisničko ime mora imati najmanje 3 znaka.",
      },
    };
  },
  methods: {
    async register() {
    try {
      console.log('Podaci registracije:');
      console.log('Username: ', this.username);
      console.log('Email: ', this.email);
      console.log('Password:', this.password);

      const response = await axios.post('http://localhost:50000/register', {
        username: this.username,
        email: this.email,
        password: this.password
      });

      console.log('Backend response:', response.data);

      } catch (error) {
        console.error('Error during login:', error.message);
      }
    }
  },
};
</script>

<style scoped></style>






