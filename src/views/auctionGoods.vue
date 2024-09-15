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
              <span class="value" style="padding-left: 133px">{{
                product.description
              }}</span>
            </div>
            <div class="info-row" v-if="product.spesification">
              <span class="label"><strong>Specifikacije:</strong></span>
              <ul class="value">
                <li v-for="spec in product.spesification" :key="spec">
                  {{ spec }}
                </li>
              </ul>
            </div>
            <div class="info-row">
              <span class="label"><strong>Broj sudionika:</strong></span>
              <span class="value">{{ product.participant }} </span>
            </div>
            <div class="info-row">
              <span class="label"><strong>Početna cijena:</strong></span>
              <span class="value">{{ product.price }} €</span>
            </div>
            <div class="info-row">
              <span class="label"><strong>Trenutačna cijena:</strong></span>
              <span class="value">{{ product.newPrice }} €</span>
            </div>
            <div class="info-row">
              <span class="label"><strong>Vrijeme:</strong></span>
              <span
                :class="{ 'text-red': product.timeRemaining === 0 }"
                class="value"
                >{{ formatTime(product.timeRemaining) }}
              </span>
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
            "Kapacitet: 128 GB, 256 GB, 512 GB, 1 TB",
            "Baterija: Do 22 sata",
            "Operativni sustav: iOS 15",
            "Kamera: 12 MP širokokutna i ultraširokokutna kamera",
            "Tehnologija: 5G, MagSafe podrška",
          ],
          participant: "11",
          price: "1,330",
          newPrice: "2,223",
          image:
            "https://istyle.hr/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_13_pro_green_pdp_image_position-1a__wwen_6.jpg",
          timtimeRemaininge: 40,
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
          participant: "5",
          price: "1,400",
          newPrice: "3,112",
          image:
            "https://gfx3.senetic.com/akeneo-catalog/3/9/1/a/391ad1b92492a339bef6b24b27d6b27a296ec724_1681896_9320_9058_image1.jpg",
          timeRemaining: 40,
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
          participant: "18",
          price: "950",
          newPrice: "1,114",
          image:
            "https://techland.hr/wp-content/uploads/2023/12/0001300381_IMG_MAIN_Fhhhhh.jpg",
          timeRemaining: 40,
        },
        {
          id: 3,
          name: "Lenovo ThinkPad X1 Carbon",
          category: "Laptop",
          description:
            "Lagan i izdržljiv poslovni laptop dizajniran za profesionalce koji traže visokoučinkovit uređaj. ThinkPad X1 Carbon dolazi s 14-inčnim IPS zaslonom visoke rezolucije i Intel Core i7 procesorom 10. generacije. Ovaj laptop pruža izvanrednu snagu i izdržljivost, idealan je za rad u pokretu s dugim trajanjem baterije i brzim punjenjem. Također je opremljen sigurnosnim značajkama poput otiska prsta i enkripcije podataka, čineći ga savršenim za poslovne korisnike.",
          spesification: [
            'Veličina zaslona: 14"',
            "Rezolucija: Full HD (1920 x 1080)",
            "Procesor: Intel Core i7 10. generacije",
            "RAM: 16 GB LPDDR4",
            "Povezivost: 2x Thunderbolt 3, 2x USB 3.1, HDMI, Wi-Fi 6, Bluetooth 5.0",
            "Težina: 1.09 kg",
            "Baterija: Do 15 sati s podrškom za brzo punjenje",
            "Sigurnosne značajke: Otisak prsta, dTPM 2.0 enkripcija",
          ],
          participant: "22",
          price: "1800 €",
          newPrice: "2,313",
          image:
            "https://www.hgspot.hr/image/catalog/slike/160630-878.jpg?v=1.2123253549",
          timeRemaining: 40,
        },
        {
          id: 4,
          name: "Samsung Galaxy Tab S8",
          category: "Tablet",
          description:
            "Vrhunski tablet namijenjen za produktivnost i zabavu, opremljen 11-inčnim zaslonom visoke rezolucije. Galaxy Tab S8 dolazi s podrškom za S Pen olovku, čineći ga idealnim za crtanje, bilježenje i multitasking. Pokreće ga snažni Snapdragon 8 procesor i dolazi s dugotrajnim baterijama, što ga čini izvrsnim izborom za poslovne korisnike i kreativce. Uz ugrađeni Android OS, korisnici imaju pristup širokom rasponu aplikacija za posao i zabavu.",
          spesification: [
            'Veličina zaslona: 11"',
            "Rezolucija: 2560 x 1600",
            "Procesor: Qualcomm Snapdragon 8 Gen 1",
            "RAM: 8 GB",
            "Povezivost: 5G, Wi-Fi 6, Bluetooth 5.1, USB Type-C",
            "Težina: 500 g",
            "Baterija: 8000 mAh s podrškom za brzo punjenje",
            "Dodaci: S Pen olovka",
          ],
          participant: "30",
          price: "850 €",
          newPrice: "1,556",
          image:
            "https://image-us.samsung.com/us/galaxy-tab-s8/pdps/acc/tab-s8-ultra-book-cover/6-S8_Ultra_Book_Cover-Gallery_1600x1200.jpg?$product-details-jpg$",
          timeRemaining: 40,
        },
        {
          id: 5,
          name: "Sony WH-1000XM5",
          category: "Slušalice",
          description:
            "Vrhunske bežične slušalice koje nude izvanrednu tehnologiju za poništavanje buke i zvuk visoke kvalitete. WH-1000XM5 omogućuju kristalno čist zvuk i prilagodljiv ANC (Active Noise Cancellation) koji se automatski prilagođava vašem okruženju. Udobne za dugotrajno nošenje, ove slušalice su savršene za putovanja i rad u bučnim okruženjima. S dugim vijekom trajanja baterije i intuitivnim touch kontrolama, ovo su slušalice koje podižu kvalitetu slušanja glazbe na novu razinu.",
          spesification: [
            "Tip: Over-ear bežične slušalice",
            "Noise Cancelling: Da (Adaptive ANC)",
            "Povezivost: Bluetooth 5.2, USB Type-C",
            "Autonomija: Do 30 sati reprodukcije",
            "Težina: 250 g",
            "Značajke: Integrirane touch kontrole, podrška za Google Assistant i Alexa",
            "Punjenje: Brzo punjenje (10 min za 5 sati korištenja)",
          ],
          participant: "22",
          price: "350 €",
          newPrice: "1,013",
          image:
            "https://www.nabava.net/slike/products/16/44/20594416/sony-wh-1000xm5_b4019676.jpeg",
          timeRemaining: 30,
        },
      ],
      interval: null,
    };
  },
  mounted() {
    const productId = parseInt(this.$route.params.id);
    this.product = this.products.find((product) => product.id === productId);
    this.loadTimeFromStorage();
    this.interval = setInterval(this.countDown, 1000);
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
          localStorage.setItem(
            `timeRemaining_${product.id}`,
            product.timeRemaining
          );
        } else {
          product.timeRemaining = 0;
        }
      });
    },

    loadTimeFromStorage() {
      this.products.forEach((product) => {
        const savedTime = localStorage.getItem(`timeRemaining_${product.id}`);
        if (savedTime !== null && !isNaN(savedTime)) {
          product.timeRemaining = parseInt(savedTime);
        } else {
          localStorage.setItem(
            `timeRemaining_${product.id}`,
            product.timeRemaining
          );
        }
      });
    },

    resetTimerForProduct(productId, newTime) {
      this.products.forEach((product) => {
        if (product.id === productId) {
          product.timeRemaining = newTime;
          localStorage.setItem(`timeRemaining_${productId}`, newTime);
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
