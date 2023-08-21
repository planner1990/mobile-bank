<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-container>
        <v-flex xs12 md12 class="" style="height: 400px;overflow-y: auto;">
          <div class="mr-6 ml-6">
            <v-layout row wrap>
              <v-flex v-for="(item,index) in items" :key="items[index].title" xs4>
                <v-checkbox
                  v-model="category.selected"
                  light
                  :label="checkValueBeforeShow(item.title, item)"
                  multiple
                  style="margin: 7px 2px -1px -4px !important; padding: 1px !important;"
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
  name: 'UserOperationsComponent',
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
      select: [],
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
    this.clearAllCheckBox()
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    ...mapActions({
      // set to list
      initialDepositOperations: 'onlineDepositStore/initialDepositOperations',
      initialCardOperations: 'onlineDepositStore/initialCardOperations',
      initialUserOperations: 'onlineDepositStore/initialUserOperations',
      initialPublicOperations: 'onlineDepositStore/initialPublicOperations',
      initialCardReissueOperations: 'onlineDepositStore/initialCardReissueOperations',
      initialLoanRequestOperations: 'onlineDepositStore/initialLoanRequestOperations',
      initialOnlineDepositOperations: 'onlineDepositStore/initialOnlineDepositOperations'
    }),
    checkValueBeforeShow: function (value, itemObject) {
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
    // دریافت لیست عملیات ها
    // دریافت لیست عملیات ها
    // دریافت لیست عملیات ها
    operation () {
      reportManager.operationList(this.operationType, this.$axios).then((response) => {
        const operationList = response.data

        // userOperation
        this.items = operationList.userOperation
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
    clearAllBeforeSelected () {
      // clear because we wanna one operation
      this.initialDepositOperations([])
      this.initialCardOperations([])
      this.initialUserOperations([])
      this.initialPublicOperations([])
      this.initialCardReissueOperations([])
      this.initialLoanRequestOperations([])
      this.initialOnlineDepositOperations([])
    },
    checked (input) {
      this.clearAllBeforeSelected()

      /* clear ALL OLD checked And set only -> input.url */
      this.category.selected = []
      this.category.selected = [input.url]

      console.log(this.listType)
      this.initialUserOperations(this.category.selected)
      console.log('checked')
      console.log('++++++++++', input)
      console.log(this.category.selected)

      // close modal operations after click and select
      localStorage.setItem('lastSelectTitleOperation', input.title)
      this.$emit('okOperationDialog')
    },
    clearAllCheckBox: function () {
      this.category.selected = []
      this.initialUserOperations(this.category.selected)
    }
  }
}
</script>

<style scoped>
</style>
