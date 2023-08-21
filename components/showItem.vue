<template>
  <v-layout row wrap align-center>
    <v-flex style="flex-grow: 1">
      <v-layout column>
        <v-flex class="py-1">
          <p style="margin: 0; font-style: normal;font-weight: 400;font-size: 16px;line-height: 31px;color: #757575;">
            {{ title }}
          </p>
        </v-flex>
        <v-flex class="py-1">
          <p style="margin: 0;font-style: normal;font-weight: 500;font-size: 18px;line-height: 35px;color: #1C1C1C;">
            {{ content }}
          </p>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ShowItemComponent',
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
