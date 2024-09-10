<template>
  <div>
    <!-- Hero Section -->
    <v-container fluid class="hero-section py-12 text-center white--text" style="background-color: #1E88E5;">
      <v-row>
        <v-col cols="12">
          <h1 class="display-2" style="color:white">Dobrodošli na Tehnološku Aukciju</h1>
          <p class="headline">Kupujte i prodajte najnovije tehnološke proizvode putem aukcija. Pronađite najbolje ponude i sudjelujte već danas!</p>
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
    <v-row>
      <v-col v-for="(product, index) in filteredProducts" :key="index" class="d-flex child-flex mt-5" cols="4">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="align-end text-white"
            height="200"
            :src="product.image"
            cover
          >
            <v-card-title>{{ product.name }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4"> {{ product.category }} </v-card-subtitle>

          <v-card-text>
            <div>{{ product.description }}</div>
            <div>Cijena: {{ product.price }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange">Pregledaj</v-btn>
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
      searchQuery: '',
      products: [
        {
          name: "iPhone 13 Pro",
          category: "Mobitel",
          description: "Najnoviji Apple mobitel s A15 Bionic čipom i naprednom kamerom.",
          price: "9,999 HRK",
          image: "https://istyle.hr/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_13_pro_green_pdp_image_position-1a__wwen_6.jpg"
        },
        {
          name: "Dell XPS 13",
          category: "Laptop",
          description: "Moćan laptop s 13-inčnim zaslonom i Intel Core i7 procesorom.",
          price: "11,499 HRK",
          image: "https://gfx3.senetic.com/akeneo-catalog/3/9/1/a/391ad1b92492a339bef6b24b27d6b27a296ec724_1681896_9320_9058_image1.jpg"
        },
        {
          name: "Samsung QLED TV",
          category: "Televizor",
          description: "Ultra HD televizor s QLED tehnologijom za vrhunsku kvalitetu slike.",
          price: "7,499 HRK",
          image: "https://images.samsung.com/is/image/samsung/p6pim/hr/qe98q80catxxh/gallery/hr-qled-98q80c-qe98q80catxxh-537030739?$650_519_PNG$"
        },
        // More to come...
      ]
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        return product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
               product.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  }
};
</script>

<style scoped>
.hero-section {
  background-image: url('https://mrwallpaper.com/images/hd/information-technology-minimalist-blue-xk9z8h5bore5jky6.jpg');
  background-size: cover;
  background-position: center;
}
</style>
