<template>
  <v-row justify="center" align="center" style="margin: 70px">
    <v-col cols="12" sm="6" md="4" v-if="product">
      <v-card class="product-card">
        <v-img :src="product.image" alt="Product Image"></v-img>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" md="8" v-if="product">
      <v-card class="product-info">
        <!-- Prikaz informacija o proizvodu -->
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
        <div class="info-row" v-if="product.specification">
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

        <!-- Unos novčanog iznosa -->
        <div class="info-row">
          <span class="label"><strong>Vaše ulaganje:</strong></span>
          <v-text-field
            :rules="[rules.bidAmountRule]"
            v-model="credits.bidAmount"
            label="Unesite novčana sredstva"
            prepend-icon="mdi-currency-eur"
            type="number"
            outlined
            required
            :disabled="product.timeRemaining <= 0"
          ></v-text-field>
        </div>

        <!-- Unos podataka o kreditnoj kartici -->
        <v-card class="payment-card">
          <v-text-field
            :rules="[rules.cardNumberRule]"
            v-model="credits.cardNumber"
            label="Broj kartice"
            prepend-icon="mdi-lock"
            required
            :disabled="product.timeRemaining <= 0"
          ></v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :rules="[rules.expiryDateRule]"
                v-model="credits.expiryDate"
                label="Datum isteka valjanosti (MM/GG)"
                required
                :disabled="product.timeRemaining <= 0"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                :rules="[rules.securityCodeRule]"
                v-model="credits.securityCode"
                label="Sigurnosni kod"
                prepend-icon="mdi-help-circle"
                required
                :disabled="product.timeRemaining <= 0"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            :rules="[rules.cardNameRule]"
            v-model="credits.cardName"
            label="Ime na kartici"
            required
            :disabled="product.timeRemaining <= 0"
          ></v-text-field>
        </v-card>
        <v-btn
          medium
          :disabled="product.timeRemaining <= 0"
          style="
            font-size: 15px;
            margin-top: 10px;
            background-color: lightgreen;
            color: black;
          "
          @click="saveCredentials"
          >Spremi podatke</v-btn
        >
        <v-alert
          v-if="auctionEnded && credits.bidAmount >= product.price"
          type="success"
          style="margin-top: 20px; background-color: lightblue; color: black;"
          outlined
        >
          Čestitke, dobili ste naš proizvod, hvala na sudjelovanju!
        </v-alert>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      interval: null,
      auctionEnded: false, // Dodano za praćenje stanja aukcije
      credits: {
        bidAmount: null,
        cardNumber: "",
        expiryDate: "",
        securityCode: "",
        cardName: "",
      },
      rules: {
        bidAmountRule: (v) => v > 0 || "Iznos ponude mora biti veći od 0",
        cardNumberRule: (v) =>
          /^\d{16}$/.test(v) || "Broj kartice mora sadržavati točno 16 brojeva.",
        expiryDateRule: (v) =>
          /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(v) ||
          "Datum isteka mora biti u formatu MM/GG.",
        securityCodeRule: (v) =>
          /^\d{3}$/.test(v) || "Sigurnosni kod mora sadržavati točno 3 broja.",
        cardNameRule: (v) => v.length <= 30 || "Ime na kartici ne smije biti duže od 30 znakova.",
      },
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
          `https://gadgetgalaxy-backend.onrender.com/api/product/${productId}`
        );
        const data = await response.json();
        this.product = data;
        this.product.timeRemaining = this.calculateTimeRemaining(
          this.product.auctionEndTime
        );
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
      return Math.floor((endDate - now) / 1000);
    },

    formatSpecifications(specs) {
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
        this.auctionEnded = true; // aukcija završila
      }
    },

    async saveCredentials() {
      try {
        const response = await fetch(
          "https://gadgetgalaxy-backend.onrender.com/api/save_credentials",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.credits),
          }
        );

        if (!response.ok) {
          throw new Error("Greška prilikom spremanja podataka");
        }

        const data = await response.json();
        console.log("Podaci uspješno spremljeni:", data);

        // Ažuriranje broja sudionika
        this.product.participant++;

        this.resetForm();
      } catch (error) {
        console.error("Greška prilikom spremanja podataka:", error);
      }
    },

    resetForm() {
      // Resetiranje podataka u formi
      this.credits = {
        bidAmount: null,
        cardNumber: "",
        expiryDate: "",
        securityCode: "",
        cardName: "",
      };
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
  margin: 0 auto;
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

.payment-card {
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
}

/* Dodatni stilovi za marginu od 70px sa lijeve i desne strane */
.v-row {
  margin-left: 70px !important;
  margin-right: 70px !important;
}
</style>
