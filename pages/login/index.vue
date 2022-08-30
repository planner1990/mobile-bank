<template>
  <div class="bg">
    <v-container>
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
          <div class="text-center">
            <v-card>
              <v-img
                :aspect-ratio="16/9"
                contain
                :src="require('~/static/mehr-bank.png')"
              />
            </v-card>
          </div>
          <div class="text-center">
            <login />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import login from '~/components/login.vue'

export default {
  components: {
    login
  }
}
</script>
<style scoped>
.bg{
  background-image: linear-gradient( 135deg, #70F570 5%, #49C628 100%);
  height: 100%;
  width: 100%;
}
</style>
