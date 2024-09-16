<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card style="margin-top: 50px">
          <v-card-title class="headline grey lighten-2" primary-title>
            Uredi Profil
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="submitForm" ref="form">
              <v-text-field
                v-model="username"
                :rules="[rules.required, rules.usernameRule]"
                label="Korisničko ime"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.emailRule]"
                label="Email"
                required
              ></v-text-field>

              <!-- Unos za staru lozinku -->
              <v-text-field
                v-model="oldPassword"
                :rules="[rules.required, rules.oldPasswordRule]"
                label="Stara lozinka"
                type="password"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="[rules.required, rules.newPasswordRule]"
                label="Nova lozinka"
                type="password"
              ></v-text-field>

              <v-row justify="end" class="mt-4">
                <v-col cols="auto">
                  <v-btn
                    medium
                    style="font-size: 15px"
                    type="submit"
                    color="primary"
                    >Spremi promjene</v-btn
                  >
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    medium
                    style="font-size: 15px"
                    color="red"
                    @click="deleteAccount"
                    >Izbriši račun?</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      oldPassword: "",
      password: "",
      rules: {
        required: (v) => !!v || "Potrebno popuniti polje",
        usernameRule: (v) => !!v || "Korisnicko ime je obavezno",
        emailRule: (v) => /.+@.+\..+/.test(v) || "Email mora biti validan",
        oldPasswordRule: (v) => !!v || "Stara lozinka je obavezna",
        newPasswordRule: (v) =>
          v.length >= 4 || "Nova lozinka mora imati najmanje 4 znaka",
      },
    };
  },
  methods: {
    // Metoda za validaciju i slanje forme
    submitForm() {
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.updateProfile();
      } else {
        alert("Trebate popunite sva polja.");
      }
    },
    async updateProfile() {
      const token = localStorage.getItem("authToken");
      const payload = {
        token,
        username: this.username,
        email: this.email,
        oldPassword: this.oldPassword,
        password: this.password,
      };

      try {
        const response = await fetch(
          "https://gadgetgalaxy-backend.onrender.com/api/update_profile",
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          const updatedUser = await response.json();
          // Ažuriranje globalnog userState-a
          if (this.$root.userState) {
            this.$root.userState.userName = updatedUser.username;
          } else {
            console.error("userState is not defined");
          }

          alert("Podaci uspješno ažurirani");

          this.$router.push(this.$userState.userType === "Prodavatelj" ? "/seller" : "/");

        } else {
          const data = await response.text();
          alert(data || "Greška pri ažuriranju podataka");
        }
      } catch (error) {
        console.error("Greška:", error);
      }
    },
    async deleteAccount() {
      const token = localStorage.getItem("authToken");
      const payload = { token };

      try {
        const response = await fetch(
          "https://gadgetgalaxy-backend.onrender.com/api/delete_account",
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          alert("Račun uspješno izbrisan");
          localStorage.removeItem("authToken");
          localStorage.removeItem("username");
          localStorage.removeItem("usertype");
          this.$userState.isLoggedIn = false;
          this.$userState.userType = null;
          this.$userState.userName = null;
          if (this.$router.currentRoute.path !== "/") {
            this.$router.replace({ path: "/" });
          }
        } else {
          alert("Greška pri brisanju računa");
        }
      } catch (error) {
        console.error("Greška:", error);
      }
    },
  },
};
</script>
