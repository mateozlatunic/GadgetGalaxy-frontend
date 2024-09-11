<template>
    <div >
      <v-container style="margin-top: 50px;">
        <v-row justify="center" class="text-center">
          <v-col cols="12">
            <h1>Informacije o proizvodu</h1>
          </v-col>
        </v-row>
  
        <v-row justify="center" align="center" style="margin-top: 70px">
          <!-- Slika proizvoda -->
          <v-col cols="12" sm="6" md="4">
            <v-card>
              <v-img :src="product.image" alt="Product Image"></v-img>
            </v-card>
          </v-col>
  
          <!-- Opis proizvoda -->
          <v-col cols="12" sm="6" md="8">
            <div class="product-info">
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
                <span class="value">{{ product.description }}</span>
              </div>
              <div class="info-row">
                <span class="label"><strong>Cijena:</strong></span>
                <span class="value">{{ product.price }} €</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    name: "Product",
    data() {
      return {
        product: {},
        products: [
          {
            id: 0,
            name: "iPhone 13 Pro",
            category: "Mobitel",
            description:
              "Najnoviji Apple mobitel s A15 Bionic čipom i naprednom kamerom.",
            price: "1,330",
            image:
              "https://istyle.hr/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_13_pro_green_pdp_image_position-1a__wwen_6.jpg",
          },
          {
            id: 1,
            name: "Dell XPS 13",
            category: "Laptop",
            description:
              "Moćan laptop s 13-inčnim zaslonom i Intel Core i7 procesorom.",
            price: "1,400",
            image:
              "https://gfx3.senetic.com/akeneo-catalog/3/9/1/a/391ad1b92492a339bef6b24b27d6b27a296ec724_1681896_9320_9058_image1.jpg",
          },
          {
            id: 2,
            name: "Samsung QLED TV",
            category: "Televizor",
            description:
              "Ultra HD televizor s QLED tehnologijom za vrhunsku kvalitetu slike.",
            price: "950",
            image:
              "https://techland.hr/wp-content/uploads/2023/12/0001300381_IMG_MAIN_Fhhhhh.jpg",
          },
        ],
      };
    },
    mounted() {
      // this.$route.params za dohvaćanje ID-a proizvoda
      const productId = parseInt(this.$route.params.id);
      this.product = this.products.find((product) => product.id === productId);
    },
  };
  </script>
  
  <style scoped>
  .product-info {
    margin-bottom: 375px;
    padding: 20px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
  }
  
  .info-row {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  
  .label {
    width: 250px; 
    text-align: left;
  }
  
  .value {
    flex-grow: 1; 
    text-align: left;
  }
  </style>
  