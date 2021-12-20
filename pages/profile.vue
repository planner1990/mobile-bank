<template>
  <v-container
    fluid
    grid-list-xl
    class="px-12"
    style="background-color: #f2f2f2; height: 100%"
  >
    <v-layout wrap row>
      <v-flex xs12>
        <profile-card />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import profileCard from '~/components/profileCard'
export default {
  name: 'Profile',
  components: {
    profileCard
  }
}
</script>
