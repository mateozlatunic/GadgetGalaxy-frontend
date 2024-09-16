<template>
  <v-container class="mt-5">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" style="padding-bottom: 50px">
        <v-card style="margin-top: 50px">
          <v-card-title class="headline grey lighten-2" primary-title>
            Dodaj Proizvod
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="addProduct" ref="form" v-model="valid">
              <!-- Naziv proizvoda -->
              <v-text-field
                v-model="product.name"
                label="Naziv proizvoda"
                :rules="[rules.required]"
                required
              ></v-text-field>

              <!-- Kategorija proizvoda -->
              <v-text-field
                v-model="product.category"
                label="Kategorija"
                :rules="[rules.required]"
                required
              ></v-text-field>

              <!-- Kratki opis za homepage -->
              <v-text-field
                v-model="product.shortDescription"
                label="Kratki opis (za homepage)"
                :rules="[rules.required]"
                required
              ></v-text-field>

              <!-- Detaljni opis za auctionGoods stranicu -->
              <v-textarea
                v-model="product.longDescription"
                label="Detaljni opis (za stranicu proizvoda)"
                :rules="[rules.required]"
                required
              ></v-textarea>

              <!-- Specifikacije proizvoda -->
              <v-textarea
                v-model="product.spesification"
                label="Specifikacije, odvojene zarezima"
                :rules="[rules.required]"
                required
              ></v-textarea>

              <!-- URL slike proizvoda -->
              <v-text-field
                v-model="product.image"
                label="URL slike proizvoda"
                :rules="[rules.required, rules.url]"
                required
              ></v-text-field>

              <!-- Početna cijena proizvoda -->
              <v-text-field
                v-model="product.price"
                label="Početna cijena | euro"
                :rules="[rules.required, rules.number]"
                required
                type="number"
              ></v-text-field>

              <!-- Broj sudionika -->
              <v-text-field
                v-model="product.minParticipants"
                label="Broj sudionika"
                :rules="[rules.required, rules.minParticipants]"
                required
                type="number"
              ></v-text-field>

              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="product.auctionDuration.days"
                    label="Dan"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="product.auctionDuration.hours"
                    label="Sat"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="product.auctionDuration.minutes"
                    label="Minuta"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="product.auctionDuration.seconds"
                    label="Sekunda"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="end" class="mt-4">
                <v-col cols="auto">
                  <v-btn
                    medium
                    style="font-size: 15px"
                    type="submit"
                    color="primary"
                    :disabled="!valid"
                  >
                    Dodaj proizvod
                  </v-btn>
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
      product: {
        name: "",
        category: "",
        shortDescription: "",
        longDescription: "",
        price: 0,
        image: "",
        spesification: "",
        auctionDuration: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
      },
      valid: false,
      rules: {
        required: (value) => !!value || "Ovo polje je obavezno.",
        number: (value) => !isNaN(value) || "Unesite ispravan broj.",
        url: (value) =>
          /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ||
          "Unesite ispravan URL.",
        minParticipants: (value) =>
          value >= 5 || "Minimalan broj sudionika je 5.",
      },
    };
  },
  methods: {
    async addProduct() {
      // Pretvaranje vremena u sekunde
      const durationInSeconds =
        this.product.auctionDuration.days * 86400 +
        this.product.auctionDuration.hours * 3600 +
        this.product.auctionDuration.minutes * 60 +
        this.product.auctionDuration.seconds;

      const productData = {
        name: this.product.name,
        category: this.product.category,
        shortDescription: this.product.shortDescription,
        longDescription: this.product.longDescription,
        price: this.product.price,
        image: this.product.image,
        spesification: this.product.spesification,
        auctionDuration: {
          days: this.product.auctionDuration.days,
          hours: this.product.auctionDuration.hours,
          minutes: this.product.auctionDuration.minutes,
          seconds: this.product.auctionDuration.seconds,
        },
        timeRemaining: durationInSeconds,
        minParticipants: this.product.minParticipants,
      };

      // Provjera validacije prije slanja
      if (this.$refs.form.validate()) {
        try {
          const response = await fetch("http://localhost:50000/api/add_product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.product),
          });
          if (response.ok) {
            alert("Proizvod je uspješno dodan.");
            // Resetiranje forme
            this.resetForm();
          } else {
            alert("Greška prilikom dodavanja proizvoda.");
          }
        } catch (error) {
          console.error("Greška prilikom slanja zahtjeva:", error);
        }
      }
    },
    resetForm() {
      // Resetiranje podataka u formi
      this.product = {
        name: "",
        category: "",
        shortDescription: "",
        longDescription: "",
        price: 0,
        image: "",
        spesification: "",
        auctionDuration: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
      };
      this.$refs.form.reset();
    },
  },
};
</script>
