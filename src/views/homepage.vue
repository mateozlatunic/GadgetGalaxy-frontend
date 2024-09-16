<template>
  <div>
    <!-- Hero Section -->
    <v-container
      fluid
      class="hero-section py-12 text-center white--text"
      style="background-color: #1e88e5"
    >
      <v-row>
        <v-col cols="12">
          <h1 class="display-2" style="color: white">
            Dobrodošli na Tehnološku Aukciju
          </h1>
          <p class="headline">
            Kupujte i prodajte najnovije tehnološke proizvode putem aukcija.
            Pronađite najbolje ponude i sudjelujte već danas!
          </p>
        </v-col>
      </v-row>

      <!-- Search Bar -->
      <v-row class="mt-5 justify-center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchQuery"
            label="Pretraži proizvode..."
            append-icon="mdi-magnify"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <!-- Product Cards -->
    <v-row style="margin-bottom: 30px; margin-top: 30px">
      <v-col
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="d-flex child-flex mt-5"
        cols="4"
      >
        <v-card
          class="mx-auto"
          max-width="400"
          style="background-color: lightgrey"
        >
          <v-img
            class="align-end text-white"
            height="350"
            :src="product.image"
            cover
          ></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>
            <div>{{ product.shortDescription }}</div>
            <div>Početna cijena: {{ product.price }} €</div>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn
              color="orange"
              :to="{ name: 'product', params: { id: product._id } }"
              >Open</v-btn
            >
            <span
              :class="{ 'text-red': product.timeRemaining <= 0 }"
              class="ml-auto"
            >
              {{ formatTime(product.timeRemaining) }}
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [], // Svi proizvodi
      interval: null,
      searchQuery: "", // Unos korisnika u tražilicu
    };
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase();
      return this.products.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.shortDescription.toLowerCase().includes(query)
        );
      });
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("https://gadgetgalaxy-backend.onrender.com/products");
        const data = await response.json();
        this.products = data;

        // Za svaki proizvod, izračunaj preostalo vrijeme
        this.products.forEach((product) => {
          product.timeRemaining = this.calculateTimeRemaining(product.auctionEndTime);
        });

        // Pokreni odbrojavanje nakon što su proizvodi učitani
        this.interval = setInterval(() => {
          this.startCountdown();
        }, 1000);

      } catch (error) {
        console.error("Greška prilikom dohvaćanja proizvoda:", error);
      }
    },

    calculateTimeRemaining(endTime) {
      const now = new Date();
      const endDate = new Date(endTime);
      return Math.floor((endDate - now) / 1000); // Vrijeme u sekundama
    },

    formatTime(seconds) {
      if (seconds <= 0) return "Aukcija je završena!";
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${d}d ${h}h ${m}m ${s}s`;
    },

    startCountdown() {
      this.products.forEach((product) => {
        if (product.timeRemaining > 0) {
          product.timeRemaining--;
        }
      });
    },
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}
.hero-section {
  background-image: url("https://steamuserimages-a.akamaihd.net/ugc/914665966092621957/D8DF127D5BC426A8089B269FC1902B63C1673063/?imw=512&imh=288&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true");
  background-size: cover;
  background-position: center;
}
</style>
