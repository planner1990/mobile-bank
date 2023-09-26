<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-container>
        <v-flex xs12 md12 class="" style="height: 500px;overflow-y: auto;">
          <v-progress-linear
            v-if="loadingTopBar"
            indeterminate
            color="teal"
          />

          <div v-if="items.length > 0" class="mr-6 ml-6">
            <div v-if="showAllOrClear === true" style="right: 20px;position: absolute;top: 10px;width: 175px;cursor: pointer" @click="AllCheckBox()">
              <v-icon left>
                mdi-checkbox-blank-outline
              </v-icon>
            </div>
            <div v-if="showAllOrClear === false" style="right: 20px;position: absolute;top: 10px;cursor: pointer" @click="clearAllCheckBox()">
              <v-icon left>
                mdi-checkbox-marked
              </v-icon>
            </div>
          </div>
          <p style="margin-bottom: 40px;" />

          <div class="mr-6 ml-6">
            <v-layout row wrap>
              <v-flex v-for="(item,index) in items" :key="items[index].title" xs4>
                <v-checkbox
                  v-if="item.title"
                  v-model="category.selected"
                  light
                  :label="checkValueBeforeShow(item.title, item)"
                  multiple
                  style="margin: 7px 2px -1px -4px !important; padding: 1px !important;"
                  :value="item.url"
                  @change="checked(item, $event)"
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
  name: 'DepositOperationsComponent',
  props: {
    deposits: Object([]),
    listType: {
      type: String,
      default: 'LIST'
    }
  },
  data () {
    return {
      showAllOrClear: true,
      loadingTopBar: false,
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
    if (this.items.length <= 0) {
      this.operation()
    }

    // this.clearAllCheckBox()
  },
  methods: {
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
    ...mapMutations({
      alert: 'snacks/showMessage'
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
      this.loadingTopBar = true
      reportManager.operationList(this.operationType, this.$axios).then((response) => {
        const operationList = response.data

        this.items = operationList.depositOperation
        this.loadingTopBar = false
      }).catch((error) => {
        this.loadingTopBar = false
        if (error.response) {
          this.alert({
            color: 'orange',
            content: error.response.data.detailList.length !== 0 ? error.response.data.detailList[0].type : error.response.data.error_message
          })
        } else {
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
    // Remove duplicate values array
    uniqByKeepFirst (a, key) {
      const seen = new Set()
      return a.filter((item) => {
        const k = key(item)
        return seen.has(k) ? false : seen.add(k)
      })
    },
    checked (input, event) {
      // Remove duplicate values array
      this.category.selected = this.uniqByKeepFirst(this.category.selected, JSON.stringify)

      this.initialDepositOperations(this.category.selected)

      if (
        event.toString().trim() !== null &&
        event.toString().trim() !== '' &&
        event.toString().trim() !== ' ' &&
        event.toString().search(input.url) !== -1
      ) {
        // check
        sessionStorage.setItem('listItemPreviewSelected_depositOperations', sessionStorage.getItem('listItemPreviewSelected_depositOperations') + 'حساب' + ' -> ' + input.title.trim() + '*')
      } else {
        // uncheck
        const textAfterRemoveItem = sessionStorage.getItem('listItemPreviewSelected_depositOperations').replace('حساب' + ' -> ' + input.title.trim() + '*', '')
        sessionStorage.setItem('listItemPreviewSelected_depositOperations', textAfterRemoveItem)
      }

      this.$emit('refreshLabelTopBar')
      this.$emit('changeLabelSelectOperation')
    },
    clearAllCheckBox: function () {
      this.showAllOrClear = true
      this.category.selected = []
      this.initialDepositOperations(this.category.selected)

      sessionStorage.setItem('listItemPreviewSelected_depositOperations', '')
      this.$emit('refreshLabelTopBar')
      this.$emit('changeLabelSelectOperation')
    },
    AllCheckBox: function () {
      this.clearAllCheckBox()
      this.showAllOrClear = false

      const checked = []
      this.items.forEach((i) => {
        checked.push(i.url)
        sessionStorage.setItem('listItemPreviewSelected_depositOperations', sessionStorage.getItem('listItemPreviewSelected_depositOperations') + 'حساب' + ' -> ' + i.title + '*')
      })
      this.category.selected = checked

      this.category.selected = this.uniqByKeepFirst(this.category.selected, JSON.stringify)
      this.initialDepositOperations(this.category.selected)
      this.$emit('refreshLabelTopBar')
      this.$emit('changeLabelSelectOperation')
    }
  }
}
</script>

<style scoped>
</style>
