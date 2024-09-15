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
          >
          </v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-text>
            <div>{{ product.description }}</div>
            <div>Cijena: {{ product.price }}</div>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn
              color="orange"
              :to="{ name: 'product', params: { id: product.id } }"
              >Open</v-btn
            >
            <span
              :class="{'text-red': product.timeRemaining === 0}"
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
  name: "MyComponent",
  data() {
    return {
      searchQuery: "",
      products: [
        {
          id: 0,
          name: "iPhone 13 Pro",
          category: "Mobitel",
          description:
            "Najnoviji Apple mobitel s A15 Bionic čipom i naprednom kamerom.",
          price: "1,330 €",
          image:
            "https://istyle.hr/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_13_pro_green_pdp_image_position-1a__wwen_6.jpg",
          timeRemaining: 3600,
        },
        {
          id: 1,
          name: "Dell XPS 13",
          category: "Laptop",
          description:
            "Moćan laptop s 13-inčnim zaslonom i Intel Core i7 procesorom.",
          price: "1,400 €",
          image:
            "https://gfx3.senetic.com/akeneo-catalog/3/9/1/a/391ad1b92492a339bef6b24b27d6b27a296ec724_1681896_9320_9058_image1.jpg",
          timeRemaining: 3600,
        },
        {
          id: 2,
          name: "Samsung QLED TV",
          category: "Televizor",
          description:
            "Ultra HD televizor s QLED tehnologijom za vrhunsku kvalitetu slike.",
          price: "950 €",
          image:
            "https://techland.hr/wp-content/uploads/2023/12/0001300381_IMG_MAIN_Fhhhhh.jpg",
          timeRemaining: 3600,
        },
        {
          id: 3,
          name: "Lenovo ThinkPad X1 Carbon",
          category: "Laptop",
          description:
            "Lagan i izdržljiv poslovni laptop s 14-inčnim zaslonom i Intel Core i7 procesorom.",
          price: "1800 €",
          image:
            "https://www.hgspot.hr/image/catalog/slike/160630-878.jpg?v=1.2123253549",
          timeRemaining: 3600,
        },
        {
          id: 4,
          name: "Samsung Galaxy Tab S8",
          category: "Tablet",
          description:
            "Vrhunski Android tablet s 11-inčnim zaslonom i podrškom za S Pen olovku.",
          price: "850 €",
          image:
            "https://image-us.samsung.com/us/galaxy-tab-s8/pdps/acc/tab-s8-ultra-book-cover/6-S8_Ultra_Book_Cover-Gallery_1600x1200.jpg?$product-details-jpg$",
          timeRemaining: 3600,
        },
        {
          id: 5,
          name: "Sony WH-1000XM5",
          category: "Slušalice",
          description:
            "Bežične slušalice s vrhunskom tehnologijom za poništavanje buke.",
          price: "350 €",
          image:
            "https://www.nabava.net/slike/products/16/44/20594416/sony-wh-1000xm5_b4019676.jpeg",
          timeRemaining: 3600,
        },
      ],
      interval: null,
    };
  },

  computed: {
    filteredProducts() {
      return this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  methods: {
    formatTime(seconds) {
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor((seconds % (3600 * 24)) / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${d}d ${h}h ${m}m ${s}s`;
    },

    countDown() {
      this.products.forEach((product) => {
        if (product.timeRemaining > 0) {
          product.timeRemaining--;
          localStorage.setItem(`timeRemaining_${product.id}`, product.timeRemaining);
        } else {
          product.timeRemaining = 0;
        }
      });
    },

    loadTimeFromStorage() {
      this.products.forEach((product) => {
        // Provjera vrijednosti u localStorage-u
        const savedTime = localStorage.getItem(`timeRemaining_${product.id}`);
        if (savedTime !== null && !isNaN(savedTime)) {
          product.timeRemaining = parseInt(savedTime);
        } else {
          localStorage.setItem(`timeRemaining_${product.id}`, product.timeRemaining);
        }
      });
    },

    resetTimerForProduct(productId, newTime) {
      // Ručno postavljanje vremena za određeni proizvod
      this.products.forEach((product) => {
        if (product.id === productId) {
          product.timeRemaining = newTime;
          localStorage.setItem(`timeRemaining_${productId}`, newTime);
        }
      });
    },
  },

  mounted() {
    this.loadTimeFromStorage();
    this.interval = setInterval(this.countDown, 1000);
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
