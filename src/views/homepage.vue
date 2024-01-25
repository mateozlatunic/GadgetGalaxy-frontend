<template>
  <v-row>
    <v-col v-for="n in 9" :key="n" class="d-flex child-flex mt-5" cols="4">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="align-end text-white"
          height="200"
          :src="`https://picsum.photos/500/300?random=${n}`"
          cover
        >
          <v-card-title>Lorem Ipsum</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4"> Number {{ n }} </v-card-subtitle>

        <v-card-text>
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange"> Share </v-btn>
          <v-btn color="orange"> Open </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MyComponent",
};
</script>
