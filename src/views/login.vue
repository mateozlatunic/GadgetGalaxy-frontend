<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
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
                <label for="password">Lozinka:</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Prijavi se</button>
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
      password: "",
    };
  },
  methods: {
    login() {
      console.log(
        "Prijava sa korisničkim imenom:",
        this.username,
        "i lozinkom:",
        this.password
      );
    },
  },
};
</script>

<style scoped></style>
