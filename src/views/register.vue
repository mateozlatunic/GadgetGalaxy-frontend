<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Registracija</div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="username">Korisničko ime:</label>
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email adresa:</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Lozinka:</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label for="confirmPassword">Potvrdi lozinku:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary" style="margin-top: 10px;">
                Registriraj se
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    register() {
      if (
        !this.username ||
        !this.email ||
        !this.password ||
        !this.confirmPassword
      ) {
        alert("Sva polja moraju biti popunjena.");
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert("Lozinka i potvrda lozinke se ne podudaraju.");
        return;
      }

      console.log(
        "Registracija sa korisničkim imenom:",
        this.username,
        "emailom:",
        this.email,
        "i lozinkom:",
        this.password
      );
    },
  },
};
</script>

<style scoped></style>
