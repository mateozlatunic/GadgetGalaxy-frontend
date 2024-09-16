<template>
  <v-row justify="center" align="center" style="margin-top: 70px">
    <v-col cols="12" sm="6" md="4" v-if="product">
      <v-card class="product-card">
        <v-img :src="product.image" alt="Product Image"></v-img>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="8" v-if="product">
      <v-card class="product-info">
        <div class="info-row">
          <span class="label"><strong>Naziv:</strong></span>
          <span class="value">{{ product.name }}</span>
        </div>
        <div class="info-row">
          <span class="label"><strong>Kategorija:</strong></span>
          <span class="value">{{ product.category }}</span>
        </div>
        <div class="info-row">
          <span class="label"><strong>Opis:</strong></span>
          <span class="value" style="padding-left: 133px">{{
            product.longDescription
          }}</span>
        </div>
        <div class="info-row" v-if="product.spesification">
          <span class="label"><strong>Specifikacije:</strong></span>
          <ul class="value">
            <li
              v-for="(spec, index) in formatSpecifications(
                product.spesification
              )"
              :key="index"
            >
              {{ spec }}
            </li>
          </ul>
        </div>
        <div class="info-row">
          <span class="label"><strong>Broj sudionika:</strong></span>
          <span class="value">{{ product.participant }}</span>
        </div>
        <div class="info-row">
          <span class="label"><strong>Početna cijena:</strong></span>
          <span class="value">{{ product.price }} €</span>
        </div>
        <div class="info-row">
          <span class="label"><strong>Vrijeme:</strong></span>
          <span
            :class="{ 'text-red': product.timeRemaining <= 0 }"
            class="value"
          >
            {{ formatTime(product.timeRemaining) }}
          </span>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      product: null, // Početno postavi kao null, dok se ne dohvati proizvod
      interval: null,
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await fetch(
          `http://localhost:50000/api/product/${productId}`
        );
        const data = await response.json();
        this.product = data;

        // Izračunaj preostalo vrijeme
        this.product.timeRemaining = this.calculateTimeRemaining(this.product.auctionEndTime);

        // Pokreni odbrojavanje
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

    formatSpecifications(specs) {
      // Razdvajanje specifikacija po zarezima i uklanjanje suvišnih praznih prostora
      return specs.split(",").map((spec) => spec.trim());
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
      if (this.product && this.product.timeRemaining > 0) {
        this.product.timeRemaining--;
      } else {
        clearInterval(this.interval);
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.product-info {
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
  width: 100%;
}

.text-red {
  color: red;
}

.info-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.label {
  width: 200px;
  text-align: left;
  font-weight: bold;
  padding-right: 20px;
}

.value {
  flex-grow: 1;
  text-align: left;
}

.value ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
