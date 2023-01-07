<template>
  <div class="bg">
    <v-container>
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md2>
          <div class="text-center">
            <login />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import login from '~/components/login/login.vue'

export default {
  components: {
    login
  }
}
</script>

<style scoped>.bg{
  background-color: rgb(93 111 124);
  height: 100%;
  width: 100%;
}
.mb_40 {
  margin-bottom: -40px
}
</style>
