<template>
  <v-layout row wrap align-center>
    <v-flex style="max-width: 50px; flex-grow: 1">
      <v-icon>
        {{ icon }}
      </v-icon>
    </v-flex>
    <v-flex style="flex-grow: 1">
      <v-layout column>
        <v-flex class="py-1">
          <p style="color: #757575; margin: 0">
            {{ title }}
          </p>
        </v-flex>
        <v-flex class="py-1">
          <p class="font-weight-bold" style="color: #1C1C1E; margin: 0">
            {{ content }}
          </p>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ShowItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    content: Object.assign({})
  }
}
</script>
