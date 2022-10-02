
<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-container>
        <v-flex xs12 md12 class="greyBorder blue-grey lighten-5">
          <div class="mr-6 ml-6 whiteback userGroupHeight">
            <v-layout row wrap>
              <v-btn
                class="mt-4 pa-3"
                color="blue-grey lighten-3"
                elevation="1"
                rounded
                small
                @click="clearAllCheckBox()"
              >
                <v-icon left>
                  mdi-delete
                </v-icon>
                {{ $t('clearText') }}
              </v-btn>
              <v-divider />
              <v-flex v-for="(item,index) in items" :key="items[index].title" xs3>
                <v-checkbox
                  v-model="category.selected"
                  light
                  :label="checkValueBeforeShow(item.title, item)"
                  multiple
                  :value="item.url"
                  @change="checked(item)"
                />
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>

import { mapActions, mapMutations } from 'vuex'
import reportManager from '~/repository/report_manager'

export default {
  name: 'Deposit',
  props: {
    cards: Object([]),
    listType: {
      type: String,
      default: 'LIST'
    }
  },
  data () {
    return {
      downloadLoading: false,
      totalNumberOfItems: 0,
      items: [],
      operationType: {
        operationType: this.listType
      },
      category: {
        selected: []
      }

    }
  },
  mounted: function () {
    this.operation()
  },
  methods: {
    ...mapActions({
      initialCardReissueOperations: 'onlineDepositStore/initialCardReissueOperations'
    }),
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    checkValueBeforeShow: function (value, itemObject) {
      console.log(value)
      if (value === '' || value === ' ' || value === undefined || value === null) {
        return itemObject.url
      }

      return value
    },
    priceFormat (amount) {
      if (amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return 0
      }
    },
    operation () {
      console.log('response')
      reportManager.operationList(this.operationType, this.$axios).then((response) => {
        console.log(response)
        const operationList = response.data
        const operationCardReissueList = operationList.cardReissueOperation
        const operationLastList = operationCardReissueList

        this.items = operationLastList
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
          console.log('error.response is null')
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
      })
    },
    checkLength (index) {
      if (index < this.types.length - 1) {
        index = index + 1
        return index
      }
    },
    checked (input) {
      /* clear ALL OLD checked And set only -> input.url */
      this.category.selected = []
      this.category.selected = [input.url]

      console.log(this.listType)
      this.initialCardReissueOperations(this.category.selected)
      console.log('initialCardReissueOperations')
      console.log(input)
      console.log(this.category.selected)
    },
    clearAllCheckBox: function () {
      this.category.selected = []
      this.initialCardReissueOperations(this.category.selected)
    }
  }
}
</script>

<style scoped>
  .fullScreen {
    width: 100%;
  }

</style>
