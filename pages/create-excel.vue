<template>
  <v-container
    fluid
    grid-list-xl
  >
    <create-opened-deposit-file />
    <v-divider />
    <created />
  </v-container>
</template>

<script>

import CreateOpenedDepositFile from '~/components/createOpenedDepositFile'
import Created from '~/pages/created'
export default {
  name: 'CreateExcel',
  components: { Created, CreateOpenedDepositFile }
}
</script>
