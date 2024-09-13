<template>
  <div>
    <v-container style="margin-top: 50px">
      <v-row justify="center" class="text-center">
        <v-col cols="12">
          <h1 style="color: white">Informacije o proizvodu</h1>
        </v-col>
      </v-row>

      <v-row justify="center" align="center" style="margin-top: 70px">
        <!-- Slika proizvoda -->
        <v-col cols="12" sm="6" md="4">
          <v-card class="product-card">
            <v-img :src="product.image" alt="Product Image"></v-img>
          </v-card>
        </v-col>

        <!-- Opis proizvoda -->
        <v-col cols="12" sm="6" md="8">
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
              <span class="value" style="padding-left: 133px;">{{ product.description }}</span>
            </div>
            <div class="info-row" v-if="product.spesification">
              <span class="label"
                ><strong>Specifikacije:</strong></span
              >
              <ul class="value">
                <li v-for="spec in product.spesification" :key="spec">
                  {{ spec }}
                </li>
              </ul>
            </div>
            <div class="info-row">
              <span class="label"><strong>Cijena:</strong></span>
              <span class="value">{{ product.price }} €</span>
            </div>
          </v-card>
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
            "Najnoviji Appleov pametni telefon s naprednim A15 Bionic čipom koji nudi brže performanse i poboljšanu energetsku učinkovitost. Opremljen je sustavom trostruke kamere s naprednim mogućnostima fotografiranja, uključujući noćni način rada, portretne fotografije, i snimanje ProRAW formata. Ima 6.1-inčni Super Retina XDR zaslon, podršku za 5G, te izdržljiv dizajn s Ceramic Shield prednjim staklom i IP68 ocjenom otpornosti na vodu i prašinu.",
          spesification: [
            'Kapacitet: 128 GB, 256 GB, 512 GB, 1 TB',
            "Baterija: Do 22 sata",
            "Operativni sustav: iOS 15",
            "Kamera: 12 MP širokokutna i ultraširokokutna kamera",
            "Tehnologija: 5G, MagSafe podrška",
          ],
          price: "1,330",
          image:
            "https://istyle.hr/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_13_pro_green_pdp_image_position-1a__wwen_6.jpg",
        },
        {
          id: 1,
          name: "Dell XPS 13",
          category: "Laptop",
          description:
            "Premium ultrabook prijenosno računalo koje kombinira elegantan dizajn i vrhunske performanse. Opremljen je 13.4-inčnim InfinityEdge zaslonom s tankim rubovima, Intel Core i7 procesorom 11. generacije, te grafičkom karticom Intel Iris Xe. Savršen je izbor za profesionalce i korisnike koji trebaju pouzdanost, brzinu i prijenosnost u jednom uređaju.",
          spesification: [
            'Zaslon: 13.4" FHD+ (1920 x 1200) InfinityEdge',
            "Procesor: Intel Core i7-1185G7 (do 4.8 GHz)",
            "RAM: 16 GB LPDDR4x",
            "Pohrana: 512 GB PCIe NVMe SSD",
            "Težina: 1.2 kg",
            "Povezivost: Wi-Fi 6, Bluetooth 5.1",
          ],
          price: "1,400",
          image:
            "https://gfx3.senetic.com/akeneo-catalog/3/9/1/a/391ad1b92492a339bef6b24b27d6b27a296ec724_1681896_9320_9058_image1.jpg",
        },
        {
          id: 2,
          name: "Samsung QLED TV",
          category: "Televizor",
          description:
            "Moderan 55-inčni televizor sa QLED tehnologijom za vrhunski prikaz boja i kontrasta. Opremljen je Quantum Dot tehnologijom koja pruža nevjerojatno jasne i detaljne slike, čak i u svijetlim prostorijama. Nudi podršku za 4K UHD rezoluciju, HDR10+ i najnoviji Tizen OS za pametne TV funkcionalnosti. Savršen je za ljubitelje filmova i gamere koji traže najbolju kvalitetu slike.",
          spesification: [
            'Veličina zaslona: 55"',
            "Rezolucija: 4K UHD (3840 x 2160)",
            "HDR: HDR10+, HLG",
            "Povezivost: 4 HDMI porta, 2 USB porta, Wi-Fi, Bluetooth",
            "Težina: 1.2 kg",
            "Smart TV funkcije: Tizen OS, podrška za streaming aplikacije (Netflix, Disney+, YouTube)",
          ],
          price: "950",
          image:
            "https://techland.hr/wp-content/uploads/2023/12/0001300381_IMG_MAIN_Fhhhhh.jpg",
        },
      ],
    };
  },
  mounted() {
    const productId = parseInt(this.$route.params.id);
    this.product = this.products.find((product) => product.id === productId);
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

.info-row {
  display: flex;
  align-items: flex-start; /* Poravnanje svih redaka na vrh */
  margin-bottom: 15px;
}

.label {
  width: 200px; /* Definiraj fiksnu širinu za sve labele */
  text-align: left;
  font-weight: bold;
  padding-right: 20px; /* Razmak između labela i vrijednosti */
}

.value {
  flex-grow: 1;
  text-align: left;
}

.value ul {
  list-style: none; /* Ukloni stil listi */
  padding: 0;
  margin: 0;
}
</style>
