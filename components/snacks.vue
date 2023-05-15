<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="-1"
    rounded="lg"
    top
  >
    <v-card-title class="text-h5" :style="titleStyle">
      {{ titleText }}
    </v-card-title>

    <v-card-text :style="textStyle">
      {{ $t(message) }}
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn small color="white" :style="buttonStyle" @click="show = false">
        {{ $t('messages.ok') }}
      </v-btn>
    </v-card-actions>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnacksComponent',
  data: () => ({
    show: false,
    title: '',
    message: '',
    color: '',
    textColor: ''
  }),
  computed: {
    titleStyle () {
      return 'color: ' + this.textColor + '; font-weight: bold '
    },
    textStyle () {
      return 'color: ' + this.textColor
    },
    buttonStyle () {
      return 'color: ' + this.textColor + '; width: 80px; font-weight: bold; font-size: 13px'
    },
    titleText () {
      if (this.color === 'orange') {
        if (this.title) {
          return 'خطا در:' + this.$t(this.title)
        }
      }
      return ''
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snacks/showMessage') {
        this.title = state.snacks.title
        this.message = state.snacks.content
        this.color = state.snacks.color
        this.textColor = state.snacks.textColor ? state.snacks.textColor : '#1C1C1E'
        this.show = true
      }
    })
  },
  methods: {}
}
</script>
