<template>
  <v-container
    tag="section"
    fluid
  >
    <v-col>
      <br>
      <br>
      <v-row
        justify="center"
      >
        <v-data-table
          dense
          class="elevation-4 fullScreen"
          :loading="loading"
          :items="data"
          :headers="headers"
          :server-items-length="6"
        >
          <template #top>
            <v-toolbar
              class="black--text"
              color="lightGreen"
              flat
              dark
              dense
            >
              <v-btn
                color="warning"
                :loading="downloadLoading"
                dark
                small
                @click="downloadReports(searchModel)"
              >
                {{ $t('report.download') }}
              </v-btn>
            </v-toolbar>
          </template>
          <template #header>
            <template>
              <tr>
                <th colspan="10">
                  آمار تراکنش های حساب
                </th>
              </tr>
              <br>
              <tr>
                <th
                  colspan="1"
                  :class="text-xs-left"
                  width="100"
                />
                <th
                  colspan="3"
                  :class="text-xs-left"
                  width="300"
                  style=": thick"
                >
                  پیامک
                </th>
                <th
                  colspan="3"
                  :class="text-xs-left"
                  width="300"
                >
                  اینترنت
                </th>

                <th
                  colspan="3"
                  :class="text-xs-left"
                  width="300"
                >
                  کل
                </th>
              </tr>
              <br>
              <tr>
                <th colspan="1" />
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  تعداد موفق
                </th>
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  مبلغ موفق
                </th>
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  تعداد ناموفق
                </th>
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  تعداد موفق
                </th>
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  مبلغ موفق
                </th>
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  تعداد ناموفق
                </th>
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  تعداد موفق
                </th>
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  مبلغ موفق
                </th>
                <th colspan="1" style="font-weight: normal; text-align: center !important;">
                  تعداد ناموفق
                </th>
              </tr>
            </template>
          </template>
          <!--          <template slot="items" slot-scope="props">-->
          <!--            <td>{{ props.item.no }}</td>-->
          <!--            <td>{{ props.item.result }}</td>-->
          <!--            <td>{{ props.item.no }}</td>-->
          <!--            <td>{{ props.item.result }}</td>-->
          <!--            <td>{{ props.item.no }}</td>-->
          <!--            <td>{{ props.item.result }}</td>-->
          <!--            <td>{{ props.item.no }}</td>-->
          <!--            <td>{{ props.item.result }}</td>-->
          <!--          </template>-->
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search_result: [{ no: 0, result: 'aaa' }, { no: 2, result: 'bbb' }],
      tableData: {
        total: 0
      },
      loading: false
    }
  }
}
</script>
<style>
  .fullScreen {
    width: 100%;
  }
</style>
