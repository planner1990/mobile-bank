<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-container>
        <v-flex xs12 md12 class="" style="height: 400px;overflow-y: auto;">
          <v-progress-linear
            v-if="loadingTopBar"
            indeterminate
            color="teal"
          />

          <div v-if="items.length > 0" class="mr-6 ml-6">
            <div style="right: 19px;position: absolute;top: 10px;width: 175px;cursor: pointer" @click="AllCheckBox()">
              <v-icon left>
                mdi-checkbox-marked
              </v-icon>
              همه
            </div>
            <div style="right: 79px;position: absolute;top: 10px;cursor: pointer" @click="clearAllCheckBox()">
              <v-icon left>
                mdi-checkbox-blank-outline
              </v-icon>
              هیچ
            </div>
          </div>
          <p style="margin-bottom: 40px;" />

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
import { mapActions, mapMutations, mapGetters } from 'vuex'
import reportManager from '~/repository/report_manager'

export default {
  name: 'CardOperationsComponent',
  props: {
    cards: Object([]),
    listType: {
      type: String,
      default: 'LIST'
    }
  },
  data () {
    return {
      loadingTopBar: false,
      downloadLoading: false,
      totalNumberOfItems: 0,
      items: [],
      select: [],
      items1: this.cardOperationList,
      operationType: {
        operationType: this.listType
      },
      category: {
        selected: this.cardOperationList
      }
    }
  },
  computed: {
    ...mapGetters({
      cardOperationList: 'onlineDepositStore/cardOperationList'
    })
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

        // cardOperation
        this.items = operationList.cardOperation
        this.loadingTopBar = false
      }).catch((error) => {
        this.loadingTopBar = false
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
    // Remove duplicate values array
    uniqByKeepFirst (a, key) {
      const seen = new Set()
      return a.filter((item) => {
        const k = key(item)
        return seen.has(k) ? false : seen.add(k)
      })
    },
    checked (input) {
      // Remove duplicate values array
      this.category.selected = this.uniqByKeepFirst(this.category.selected, JSON.stringify)

      console.log(this.listType)
      this.initialCardOperations(this.category.selected)

      // close modal operations after click and select
      localStorage.setItem('lastSelectTitleOperation', input.title)
      sessionStorage.setItem('listItemPreviewSelected_cardOperations', sessionStorage.getItem('listItemPreviewSelected_cardOperations') + 'کارت' + ' -> ' + input.title + '*')

      this.$emit('refreshLabelTopBar')
    },
    clearAllCheckBox: function () {
      this.category.selected = []
      this.initialCardOperations(this.category.selected)

      sessionStorage.setItem('listItemPreviewSelected_cardOperations', '')
      this.$emit('refreshLabelTopBar')
    },
    AllCheckBox: function () {
      this.clearAllCheckBox()

      const checked = []
      this.items.forEach((i) => {
        checked.push(i.url)
        sessionStorage.setItem('listItemPreviewSelected_cardOperations', sessionStorage.getItem('listItemPreviewSelected_cardOperations') + 'کارت' + ' -> ' + i.title + '*')
      })
      this.category.selected = checked

      this.category.selected = this.uniqByKeepFirst(this.category.selected, JSON.stringify)
      this.initialDepositOperations(this.category.selected)
      this.$emit('refreshLabelTopBar')
    }
  }
}
</script>

<style scoped>
</style>
