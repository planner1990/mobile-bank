<template>
  <v-container tag="section" fluid>
    <v-row>
      <!-- filter -->
      <v-col cols="12" style="padding: 8px !important;">
        <offer-filter
          v-model="requestObject"
          @search="search"
          @showCreateDialog="showCreateDialog"
          @closeCreateDialog="closeCreateDialog"
        />
      </v-col>

      <!-- grid -->
      <v-col cols="12" style="padding: 8px !important;">
        <v-data-table
          item-key="username"
          sort-by="username"
          :items="offers"
          :headers="headers"
          class="fullScreen mb-16"
          :loading="loading"
          dense
          :footer-props="{
            'items-per-page-options': [20, 50, 100, 500, 1000]
          }"
          :items-per-page.sync="requestObject.paginate.length"
          :page.sync="requestObject.paginate.page"
          :server-items-length="totalNumberOfItems"
          @update:page="search (requestObject)"
          @update:items-per-page="search (requestObject)"
        >
          <template #[`item.dateFrom`]="{ item }">
            {{ convertToJalali(item.dateFrom) }}
          </template>
          <template #[`item.dateTo`]="{ item }">
            {{ convertToJalali(item.dateTo) }}
          </template>
          <template #[`item.os`]="{ item }">
            {{ $t('offer.toTypeFilter.' + item.os) }}
          </template>
          <template #[`item.status`]="{ item }">
            {{ $t('offer.offerStatusFilter.' + item.status) }}
          </template>

          <template #[`item.uri`]="{ item }">
            <div v-if="item.uri">
              {{ item.uri }}
            </div>
            <div v-else style="color: #f1b0b094">
              {{ '-' }}
            </div>
          </template>
          <template #[`item.recommendationType`]="{ item }">
            <div v-if="item.recommendationType">
              {{ $t('offer.offerTypeFilter.' + item.recommendationType) }}
            </div>
            <div v-else style="color: #f1b0b094">
              {{ '-' }}
            </div>
          </template>
          <template #[`item.alternativeUrl`]="{ item }">
            <div v-if="item.alternativeUrl">
              {{ item.alternativeUrl }}
            </div>
            <div v-else style="color: #f1b0b094">
              {{ '-' }}
            </div>
          </template>
          <template #[`item.url`]="{ item }">
            <div v-if="item.url">
              {{ item.url }}
            </div>
            <div v-else style="color: #f1b0b094">
              {{ '-' }}
            </div>
          </template>

          <template #[`item.addParams`]="{ item }">
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  elevation="0"
                  style="color: #84BD00;border-radius: 8px;height: 36px;font-weight: bold;width: 36px !important;min-width: unset;"
                  color="rgba(132, 189, 0, 0.1)"
                  v-bind="attrs"
                  v-on="on"
                  @click="addParams(item)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 12H18M12 18V6"
                      stroke="#84BD00"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </v-btn>
              </template>
              <span>{{ 'افزودن پارامتر' }}</span>
            </v-tooltip>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  small
                  elevation="0"
                  style="color: #84BD00;border-radius: 8px;height: 36px;font-weight: bold;width: 60px;"
                  color="rgba(132, 189, 0, 0.1)"
                  v-bind="attrs"
                  v-on="on"
                  @click="editItem(item)"
                >
                  {{ 'ویرایش' }}
                </v-btn>
              </template>
              <span>{{ 'ویرایش پیشنهاد روز' }}</span>
            </v-tooltip>
          </template>
        </v-data-table>

        <!-- dialog افزودن پیشنهاد -->
        <!-- dialog افزودن پیشنهاد -->
        <!-- dialog افزودن پیشنهاد -->
        <v-dialog
          v-model="createDialog"
          max-width="1000px"
          transition="dialog-bottom-transition"
        >
          <v-card
            :loading="loading"
          >
            <!-- title -->
            <!-- title -->
            <!-- title -->
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="position: absolute;left: 20px; top: 18px;cursor: pointer"
              @click="closeCreateDialog"
            >
              <g clip-path="url(#clip0_401_143)">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_401_143">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <v-card-title class=" black--text font-weight-bold headline mb-2" style="border-bottom: 1px solid #D8D8D8;">
              {{ $t('offer.dialogTitle') }}
            </v-card-title>

            <v-container>
              <v-form
                ref="form"
              >
                <v-row no-gutters>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      id="createFromDate"
                      v-model="from"
                      outlined
                      dense
                      :placeholder="$t('filters.fromDate')"
                    />
                    <p-date-picker
                      v-model="from"
                      type="datetime"
                      element="createFromDate"
                      color="dimgray"
                      dense
                      outlined
                      popove
                      format="jYYYY-jMM-jDD HH:mm"
                      @close="checkIsNullFromDate()"
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      id="createToDate"
                      v-model="to"
                      outlined
                      dense
                      :placeholder="$t('filters.toDate')"
                    />
                    <p-date-picker
                      v-model="to"
                      type="datetime"
                      element="createToDate"
                      color="dimgray"
                      dense
                      outlined
                      popove
                      format="jYYYY-jMM-jDD HH:mm"
                      @close="checkIsNullToDate()"
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.title"
                      :counter="16"
                      :label="$t('offer.title')"
                      outlined
                      dense
                      required
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.widgetTitle"
                      :label="$t('offer.widgetTitle')"
                      :counter="16"
                      required
                      dense
                      outlined
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.url"
                      :label="$t('offer.url')"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col style="width: 20% !important;">
                    <v-select
                      v-model="offerForm.offerObj.recommendationType"
                      :items="offerTypDisplayItem"
                      item-value="value"
                      :item-text="(item)=>(item.text)"
                      :return-object="false"
                      :label="$t('offer.type')"
                      dense
                      clearable
                      outlined
                    >
                      <template #append>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                            stroke="#84BD00"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.alternativeUrl"
                      :label="$t('offer.alternativeUrl')"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-select
                      v-model="offerForm.offerObj.os"
                      :items="offerToTypeItem"
                      item-value="value"
                      :item-text="(item)=>$t(item.text)"
                      :return-object="false"
                      :label="$t('offer.to')"
                      dense
                      clearable
                      outlined
                    >
                      <template #append>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                            stroke="#84BD00"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.uri"
                      :label="$t('offer.uri')"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-select
                      v-model="offerForm.offerObj.type"
                      :items="offerType"
                      item-value="value"
                      :item-text="(item)=>$t(item.text)"
                      :return-object="false"
                      :label="$t('offer.offerType')"
                      dense
                      clearable
                      outlined
                    >
                      <template #append>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                            stroke="#84BD00"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="11">
                    <v-text-field
                      v-model="offerForm.offerObj.explanation"
                      :label="$t('offer.description')"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="1">
                    <div
                      style="width: 77px;height: 49px;border: 1px solid rgb(224 224 224);border-radius: 12px;position: absolute;margin-right: -4px;"
                    />
                    <v-checkbox
                      v-model="checkbox1"
                      style="margin-top: -4px;"
                      dense
                      :label="`فعال`"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <div
                      style="border: 2px dashed #84BD00;border-radius: 12px;margin-left: 5px;min-height: 85px;"
                    >
                      <center style="margin-top: 17px;margin-bottom: 2px;">
                        <label for="uploadOne" style="cursor: pointer;">
                          <svg
                            width="84"
                            height="75"
                            viewBox="0 0 74 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M36.56 16.5V11.5M39 14H34"
                              stroke="#84BD00"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M47 11V17C47 21 46 22 42 22H32C28 22 27 21 27 17V7C27 3 28 2 32 2H33.5C35 2 35.33 2.44 35.9 3.2L37.4 5.2C37.78 5.7 38 6 39 6H42C46 6 47 7 47 11Z"
                              stroke="#84BD00"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                            />
                            <path
                              d="M8.63457 48.8436C8.51154 49.8958 8.12335 50.7082 7.47002 51.2809C6.81669 51.8494 5.94699 52.1336 4.86093 52.1336C3.68578 52.1336 2.74396 51.7136 2.03548 50.8736C1.32699 50.0294 0.972749 48.9009 0.972749 47.4882V46.5336C0.972749 45.6088 1.1382 44.7964 1.46911 44.0964C1.80002 43.3921 2.26669 42.8512 2.86911 42.4736C3.47578 42.0961 4.1779 41.9073 4.97548 41.9073C6.03608 41.9073 6.88457 42.2042 7.52093 42.7982C8.15729 43.3879 8.52851 44.2045 8.63457 45.2482H7.31729C7.20275 44.4548 6.95457 43.88 6.57275 43.5236C6.19093 43.1673 5.65851 42.9891 4.97548 42.9891C4.13972 42.9891 3.48214 43.2988 3.00275 43.9182C2.5276 44.5376 2.29002 45.42 2.29002 46.5655V47.5264C2.29002 48.6082 2.51487 49.4694 2.96457 50.11C3.41851 50.7464 4.05063 51.0645 4.86093 51.0645C5.59063 51.0645 6.15063 50.8991 6.54093 50.5682C6.93123 50.2373 7.19002 49.6624 7.31729 48.8436H8.63457ZM11.4983 45.4964C12.0583 44.8091 12.7879 44.4655 13.6873 44.4655C15.2486 44.4655 16.0376 45.3479 16.0546 47.1127V52H14.7883V47.1064C14.784 46.5718 14.661 46.1773 14.4192 45.9227C14.1816 45.6682 13.8104 45.5409 13.3055 45.5409C12.894 45.5409 12.5334 45.6512 12.2237 45.8718C11.914 46.0882 11.6722 46.3745 11.4983 46.7309V52H10.2319V41.5H11.4983V45.4964ZM17.6119 48.2327C17.6119 47.5073 17.754 46.8561 18.0383 46.2791C18.3225 45.6979 18.7192 45.2503 19.2283 44.9364C19.7374 44.6224 20.3165 44.4655 20.9656 44.4655C21.9753 44.4655 22.7898 44.8155 23.4092 45.5155C24.0328 46.2112 24.3446 47.1382 24.3446 48.2964V48.3855C24.3446 49.1024 24.2068 49.7473 23.931 50.32C23.6553 50.8927 23.2607 51.3382 22.7474 51.6564C22.234 51.9745 21.6443 52.1336 20.9783 52.1336C19.9771 52.1336 19.1646 51.7858 18.541 51.09C17.9216 50.3942 17.6119 49.4715 17.6119 48.3218V48.2327ZM18.8846 48.3855C18.8846 49.2042 19.0734 49.8618 19.451 50.3582C19.8328 50.8545 20.3419 51.1027 20.9783 51.1027C21.6231 51.1027 22.1343 50.8524 22.5119 50.3518C22.8895 49.847 23.0783 49.1406 23.0783 48.2327C23.0783 47.4224 22.8853 46.7648 22.4992 46.26C22.1174 45.7552 21.6062 45.5027 20.9656 45.5027C20.3419 45.5027 19.8392 45.753 19.4574 46.2536C19.0756 46.75 18.8846 47.4606 18.8846 48.3855ZM25.5963 48.2327C25.5963 47.5073 25.7384 46.8561 26.0227 46.2791C26.3069 45.6979 26.7036 45.2503 27.2127 44.9364C27.7217 44.6224 28.3008 44.4655 28.9499 44.4655C29.9596 44.4655 30.7742 44.8155 31.3936 45.5155C32.0172 46.2112 32.329 47.1382 32.329 48.2964V48.3855C32.329 49.1024 32.1911 49.7473 31.9154 50.32C31.6396 50.8927 31.2451 51.3382 30.7317 51.6564C30.2184 51.9745 29.6287 52.1336 28.9627 52.1336C27.9614 52.1336 27.149 51.7858 26.5254 51.09C25.906 50.3942 25.5963 49.4715 25.5963 48.3218V48.2327ZM26.869 48.3855C26.869 49.2042 27.0578 49.8618 27.4354 50.3582C27.8172 50.8545 28.3263 51.1027 28.9627 51.1027C29.6075 51.1027 30.1187 50.8524 30.4963 50.3518C30.8739 49.847 31.0627 49.1406 31.0627 48.2327C31.0627 47.4224 30.8696 46.7648 30.4836 46.26C30.1017 45.7552 29.5905 45.5027 28.9499 45.5027C28.3263 45.5027 27.8236 45.753 27.4417 46.2536C27.0599 46.75 26.869 47.4606 26.869 48.3855ZM38.2198 50.04C38.2198 49.6964 38.0904 49.4312 37.8316 49.2445C37.577 49.0536 37.1295 48.8903 36.4888 48.7545C35.8482 48.6188 35.3392 48.4555 34.9616 48.2645C34.5882 48.0694 34.3104 47.8403 34.1279 47.5773C33.9498 47.3142 33.8607 47.0003 33.8607 46.6355C33.8607 46.0288 34.1152 45.5155 34.6243 45.0955C35.1376 44.6755 35.7931 44.4655 36.5907 44.4655C37.4307 44.4655 38.1116 44.6818 38.6334 45.1145C39.1552 45.5473 39.4161 46.1009 39.4161 46.7755H38.1434C38.1434 46.4318 37.997 46.1348 37.7043 45.8845C37.4116 45.63 37.0404 45.5027 36.5907 45.5027C36.1325 45.5027 35.774 45.6045 35.5152 45.8082C35.2564 46.0076 35.127 46.2685 35.127 46.5909C35.127 46.8964 35.2458 47.1276 35.4834 47.2845C35.7252 47.4373 36.1622 47.5858 36.7943 47.73C37.4264 47.87 37.9376 48.0376 38.3279 48.2327C38.7225 48.4279 39.0131 48.6633 39.1998 48.9391C39.3907 49.2148 39.4861 49.5521 39.4861 49.9509C39.4861 50.6085 39.221 51.1367 38.6907 51.5355C38.1646 51.9342 37.4795 52.1336 36.6352 52.1336C36.0413 52.1336 35.5152 52.0297 35.057 51.8218C34.6031 51.6139 34.2467 51.3212 33.9879 50.9436C33.7334 50.5661 33.6061 50.1588 33.6061 49.7218H34.8725C34.8937 50.1461 35.0613 50.4833 35.3752 50.7336C35.6934 50.9797 36.1134 51.1027 36.6352 51.1027C37.1146 51.1027 37.4985 51.0073 37.787 50.8164C38.0755 50.6212 38.2198 50.3624 38.2198 50.04ZM44.204 52.1336C43.1985 52.1336 42.3818 51.8048 41.754 51.1473C41.1261 50.4897 40.8121 49.6094 40.8121 48.5064V48.2773C40.8121 47.5433 40.9521 46.8879 41.2321 46.3109C41.5121 45.7339 41.9024 45.2821 42.4031 44.9555C42.9079 44.6288 43.4552 44.4655 44.0449 44.4655C45.0079 44.4655 45.7546 44.7836 46.2849 45.42C46.8194 46.0521 47.0867 46.9579 47.0867 48.1373V48.6655H42.0785C42.0955 49.3952 42.3076 49.9848 42.7149 50.4345C43.1221 50.88 43.6397 51.1027 44.2676 51.1027C44.7173 51.1027 45.097 51.0115 45.4067 50.8291C45.7164 50.6467 45.9879 50.4048 46.2212 50.1036L46.9912 50.7082C46.3718 51.6585 45.4428 52.1336 44.204 52.1336ZM44.0449 45.5027C43.5358 45.5027 43.1073 45.6894 42.7594 46.0627C42.4115 46.4361 42.1973 46.9558 42.1167 47.6218H45.8203V47.5264C45.7864 46.8858 45.6146 46.3894 45.3049 46.0373C44.9952 45.6809 44.5752 45.5027 44.0449 45.5027ZM58.6729 47.6027H54.4984V52H53.1875V42.0473H59.3475V43.1291H54.4984V46.5336H58.6729V47.6027ZM62.0967 52H60.8367V44.6055H62.0967V52ZM60.7285 42.6391C60.7285 42.4355 60.7921 42.2636 60.9194 42.1236C61.0467 41.9794 61.2333 41.9073 61.4794 41.9073C61.7255 41.9073 61.9121 41.9794 62.0394 42.1236C62.1667 42.2636 62.2303 42.4355 62.2303 42.6391C62.2303 42.847 62.1667 43.0188 62.0394 43.1545C61.9121 43.2903 61.7255 43.3582 61.4794 43.3582C61.2333 43.3582 61.0467 43.2903 60.9194 43.1545C60.7921 43.0188 60.7285 42.847 60.7285 42.6391ZM65.501 52H64.241V41.5H65.501V52ZM70.6044 52.1336C69.5989 52.1336 68.7822 51.8048 68.1544 51.1473C67.5265 50.4897 67.2125 49.6094 67.2125 48.5064V48.2773C67.2125 47.5433 67.3525 46.8879 67.6325 46.3109C67.9125 45.7339 68.3028 45.2821 68.8034 44.9555C69.3083 44.6288 69.8556 44.4655 70.4453 44.4655C71.4083 44.4655 72.155 44.7836 72.6853 45.42C73.2198 46.0521 73.4871 46.9579 73.4871 48.1373V48.6655H68.4789C68.4959 49.3952 68.708 49.9848 69.1153 50.4345C69.5225 50.88 70.0401 51.1027 70.668 51.1027C71.1177 51.1027 71.4974 51.0115 71.8071 50.8291C72.1168 50.6467 72.3883 50.4048 72.6216 50.1036L73.3916 50.7082C72.7722 51.6585 71.8431 52.1336 70.6044 52.1336ZM70.4453 45.5027C69.9362 45.5027 69.5077 45.6894 69.1598 46.0627C68.8119 46.4361 68.5977 46.9558 68.5171 47.6218H72.2207V47.5264C72.1868 46.8858 72.015 46.3894 71.7053 46.0373C71.3956 45.6809 70.9756 45.5027 70.4453 45.5027Z"
                              fill="#757575"
                            />
                          </svg>
                        </label>
                      </center>
                      <v-file-input
                        id="uploadOne"
                        v-model="offerForm.offerObj.file"
                        style="opacity: 0;height: 1px;"
                        show-size
                        outlined
                        :rules="[
                          v => !!v || $t('user.validation.required')
                        ]"
                        dense
                        validate-on-blur
                        label="File input"
                      />
                    </div>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="10" />
                  <v-col cols="2">
                    <v-btn
                      :loading="loadingBtnSave"
                      :disabled="loadingBtnSave"
                      color="#84BD00"
                      class="btnSearch"
                      style="margin-top: 15px"
                      @click="save"
                    >
                      {{ $t('buttons.submit') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <!-- show error message in dialog box -->
              <v-row
                v-for="(error, index) in computedErrorsInCreateDialog"
                :key="index"
              >
                <v-col>
                  <v-alert
                    v-model="createUserErrors[index].isShow"
                    dismissible
                    dense
                    type="error"
                    elevation="2"
                    icon="mdi-alert-decagram-outline"
                    @click:close="createUserErrors[index].isShow = false"
                  >
                    {{ error.type }}
                  </v-alert>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- dialog ویرایش/حذف پیشنهاد -->
        <!-- dialog ویرایش/حذف پیشنهاد -->
        <!-- dialog ویرایش/حذف پیشنهاد -->
        <v-dialog
          v-model="createUpdateDialog"
          max-width="1000px"
          transition="dialog-bottom-transition"
        >
          <v-card
            :loading="loading"
          >
            <!-- title -->
            <!-- title -->
            <!-- title -->
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="position: absolute;left: 20px; top: 18px;cursor: pointer"
              @click="closeCreateOfferDialog"
            >
              <g clip-path="url(#clip0_401_143)">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_401_143">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <v-card-title class=" black--text font-weight-bold headline mb-2" style="border-bottom: 1px solid #D8D8D8;">
              {{ '[ ویرایش / حذف ] پیشنهاد روز' }}
            </v-card-title>

            <v-container>
              <v-form
                ref="form"
              >
                <v-row no-gutters>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      id="createFromDate"
                      v-model="from"
                      outlined
                      dense
                      :placeholder="$t('filters.fromDate')"
                    />
                    <p-date-picker
                      v-model="from"
                      type="datetime"
                      element="createFromDate"
                      color="dimgray"
                      dense
                      outlined
                      popove
                      format="jYYYY-jMM-jDD HH:mm"
                      @close="checkIsNullFromDate()"
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      id="createToDate"
                      v-model="to"
                      outlined
                      dense
                      :placeholder="$t('filters.toDate')"
                    />
                    <p-date-picker
                      v-model="to"
                      type="datetime"
                      element="createToDate"
                      color="dimgray"
                      dense
                      outlined
                      popove
                      format="jYYYY-jMM-jDD HH:mm"
                      @close="checkIsNullToDate()"
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.title"
                      :counter="16"
                      :label="$t('offer.title')"
                      outlined
                      dense
                      required
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.widgetTitle"
                      :label="$t('offer.widgetTitle')"
                      :counter="16"
                      required
                      dense
                      outlined
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.url"
                      :label="$t('offer.url')"
                      outlined
                      dense
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col style="width: 20% !important;">
                    <v-select
                      v-model="offerForm.offerObj.recommendationType"
                      :items="offerTypDisplayItem"
                      item-value="value"
                      :item-text="(item)=>(item.text)"
                      :return-object="false"
                      :label="$t('offer.type')"
                      dense
                      clearable
                      outlined
                    >
                      <template #append>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                            stroke="#84BD00"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.alternativeUrl"
                      :label="$t('offer.alternativeUrl')"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-select
                      v-model="offerForm.offerObj.os"
                      :items="offerToTypeItem"
                      item-value="value"
                      :item-text="(item)=>$t(item.text)"
                      :return-object="false"
                      :label="$t('offer.to')"
                      dense
                      clearable
                      outlined
                    >
                      <template #append>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                            stroke="#84BD00"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-text-field
                      v-model="offerForm.offerObj.uri"
                      :label="$t('offer.uri')"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col style="width: 20% !important;">
                    <v-select
                      v-model="offerForm.offerObj.type"
                      :items="offerType"
                      item-value="value"
                      :item-text="(item)=>$t(item.text)"
                      :return-object="false"
                      :label="$t('offer.offerType')"
                      dense
                      clearable
                      outlined
                    >
                      <template #append>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9201 8.95L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.95"
                            stroke="#84BD00"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="11">
                    <v-text-field
                      v-model="offerForm.offerObj.explanation"
                      :label="$t('offer.description')"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="1">
                    <div
                      style="width: 77px;height: 49px;border: 1px solid rgb(224 224 224);border-radius: 12px;position: absolute;margin-right: -4px;"
                    />
                    <v-checkbox
                      v-model="offerForm.offerObj.status"
                      style="margin-top: -4px;"
                      dense
                      :label="`  فعال`"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <div
                      style="border: 2px dashed #84BD00;border-radius: 12px;margin-left: 5px;min-height: 85px;"
                    >
                      <center style="margin-top: 17px;margin-bottom: 2px;">
                        <label for="uploadOne" style="cursor: pointer;">
                          <svg
                            width="84"
                            height="75"
                            viewBox="0 0 74 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M36.56 16.5V11.5M39 14H34"
                              stroke="#84BD00"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M47 11V17C47 21 46 22 42 22H32C28 22 27 21 27 17V7C27 3 28 2 32 2H33.5C35 2 35.33 2.44 35.9 3.2L37.4 5.2C37.78 5.7 38 6 39 6H42C46 6 47 7 47 11Z"
                              stroke="#84BD00"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                            />
                            <path
                              d="M8.63457 48.8436C8.51154 49.8958 8.12335 50.7082 7.47002 51.2809C6.81669 51.8494 5.94699 52.1336 4.86093 52.1336C3.68578 52.1336 2.74396 51.7136 2.03548 50.8736C1.32699 50.0294 0.972749 48.9009 0.972749 47.4882V46.5336C0.972749 45.6088 1.1382 44.7964 1.46911 44.0964C1.80002 43.3921 2.26669 42.8512 2.86911 42.4736C3.47578 42.0961 4.1779 41.9073 4.97548 41.9073C6.03608 41.9073 6.88457 42.2042 7.52093 42.7982C8.15729 43.3879 8.52851 44.2045 8.63457 45.2482H7.31729C7.20275 44.4548 6.95457 43.88 6.57275 43.5236C6.19093 43.1673 5.65851 42.9891 4.97548 42.9891C4.13972 42.9891 3.48214 43.2988 3.00275 43.9182C2.5276 44.5376 2.29002 45.42 2.29002 46.5655V47.5264C2.29002 48.6082 2.51487 49.4694 2.96457 50.11C3.41851 50.7464 4.05063 51.0645 4.86093 51.0645C5.59063 51.0645 6.15063 50.8991 6.54093 50.5682C6.93123 50.2373 7.19002 49.6624 7.31729 48.8436H8.63457ZM11.4983 45.4964C12.0583 44.8091 12.7879 44.4655 13.6873 44.4655C15.2486 44.4655 16.0376 45.3479 16.0546 47.1127V52H14.7883V47.1064C14.784 46.5718 14.661 46.1773 14.4192 45.9227C14.1816 45.6682 13.8104 45.5409 13.3055 45.5409C12.894 45.5409 12.5334 45.6512 12.2237 45.8718C11.914 46.0882 11.6722 46.3745 11.4983 46.7309V52H10.2319V41.5H11.4983V45.4964ZM17.6119 48.2327C17.6119 47.5073 17.754 46.8561 18.0383 46.2791C18.3225 45.6979 18.7192 45.2503 19.2283 44.9364C19.7374 44.6224 20.3165 44.4655 20.9656 44.4655C21.9753 44.4655 22.7898 44.8155 23.4092 45.5155C24.0328 46.2112 24.3446 47.1382 24.3446 48.2964V48.3855C24.3446 49.1024 24.2068 49.7473 23.931 50.32C23.6553 50.8927 23.2607 51.3382 22.7474 51.6564C22.234 51.9745 21.6443 52.1336 20.9783 52.1336C19.9771 52.1336 19.1646 51.7858 18.541 51.09C17.9216 50.3942 17.6119 49.4715 17.6119 48.3218V48.2327ZM18.8846 48.3855C18.8846 49.2042 19.0734 49.8618 19.451 50.3582C19.8328 50.8545 20.3419 51.1027 20.9783 51.1027C21.6231 51.1027 22.1343 50.8524 22.5119 50.3518C22.8895 49.847 23.0783 49.1406 23.0783 48.2327C23.0783 47.4224 22.8853 46.7648 22.4992 46.26C22.1174 45.7552 21.6062 45.5027 20.9656 45.5027C20.3419 45.5027 19.8392 45.753 19.4574 46.2536C19.0756 46.75 18.8846 47.4606 18.8846 48.3855ZM25.5963 48.2327C25.5963 47.5073 25.7384 46.8561 26.0227 46.2791C26.3069 45.6979 26.7036 45.2503 27.2127 44.9364C27.7217 44.6224 28.3008 44.4655 28.9499 44.4655C29.9596 44.4655 30.7742 44.8155 31.3936 45.5155C32.0172 46.2112 32.329 47.1382 32.329 48.2964V48.3855C32.329 49.1024 32.1911 49.7473 31.9154 50.32C31.6396 50.8927 31.2451 51.3382 30.7317 51.6564C30.2184 51.9745 29.6287 52.1336 28.9627 52.1336C27.9614 52.1336 27.149 51.7858 26.5254 51.09C25.906 50.3942 25.5963 49.4715 25.5963 48.3218V48.2327ZM26.869 48.3855C26.869 49.2042 27.0578 49.8618 27.4354 50.3582C27.8172 50.8545 28.3263 51.1027 28.9627 51.1027C29.6075 51.1027 30.1187 50.8524 30.4963 50.3518C30.8739 49.847 31.0627 49.1406 31.0627 48.2327C31.0627 47.4224 30.8696 46.7648 30.4836 46.26C30.1017 45.7552 29.5905 45.5027 28.9499 45.5027C28.3263 45.5027 27.8236 45.753 27.4417 46.2536C27.0599 46.75 26.869 47.4606 26.869 48.3855ZM38.2198 50.04C38.2198 49.6964 38.0904 49.4312 37.8316 49.2445C37.577 49.0536 37.1295 48.8903 36.4888 48.7545C35.8482 48.6188 35.3392 48.4555 34.9616 48.2645C34.5882 48.0694 34.3104 47.8403 34.1279 47.5773C33.9498 47.3142 33.8607 47.0003 33.8607 46.6355C33.8607 46.0288 34.1152 45.5155 34.6243 45.0955C35.1376 44.6755 35.7931 44.4655 36.5907 44.4655C37.4307 44.4655 38.1116 44.6818 38.6334 45.1145C39.1552 45.5473 39.4161 46.1009 39.4161 46.7755H38.1434C38.1434 46.4318 37.997 46.1348 37.7043 45.8845C37.4116 45.63 37.0404 45.5027 36.5907 45.5027C36.1325 45.5027 35.774 45.6045 35.5152 45.8082C35.2564 46.0076 35.127 46.2685 35.127 46.5909C35.127 46.8964 35.2458 47.1276 35.4834 47.2845C35.7252 47.4373 36.1622 47.5858 36.7943 47.73C37.4264 47.87 37.9376 48.0376 38.3279 48.2327C38.7225 48.4279 39.0131 48.6633 39.1998 48.9391C39.3907 49.2148 39.4861 49.5521 39.4861 49.9509C39.4861 50.6085 39.221 51.1367 38.6907 51.5355C38.1646 51.9342 37.4795 52.1336 36.6352 52.1336C36.0413 52.1336 35.5152 52.0297 35.057 51.8218C34.6031 51.6139 34.2467 51.3212 33.9879 50.9436C33.7334 50.5661 33.6061 50.1588 33.6061 49.7218H34.8725C34.8937 50.1461 35.0613 50.4833 35.3752 50.7336C35.6934 50.9797 36.1134 51.1027 36.6352 51.1027C37.1146 51.1027 37.4985 51.0073 37.787 50.8164C38.0755 50.6212 38.2198 50.3624 38.2198 50.04ZM44.204 52.1336C43.1985 52.1336 42.3818 51.8048 41.754 51.1473C41.1261 50.4897 40.8121 49.6094 40.8121 48.5064V48.2773C40.8121 47.5433 40.9521 46.8879 41.2321 46.3109C41.5121 45.7339 41.9024 45.2821 42.4031 44.9555C42.9079 44.6288 43.4552 44.4655 44.0449 44.4655C45.0079 44.4655 45.7546 44.7836 46.2849 45.42C46.8194 46.0521 47.0867 46.9579 47.0867 48.1373V48.6655H42.0785C42.0955 49.3952 42.3076 49.9848 42.7149 50.4345C43.1221 50.88 43.6397 51.1027 44.2676 51.1027C44.7173 51.1027 45.097 51.0115 45.4067 50.8291C45.7164 50.6467 45.9879 50.4048 46.2212 50.1036L46.9912 50.7082C46.3718 51.6585 45.4428 52.1336 44.204 52.1336ZM44.0449 45.5027C43.5358 45.5027 43.1073 45.6894 42.7594 46.0627C42.4115 46.4361 42.1973 46.9558 42.1167 47.6218H45.8203V47.5264C45.7864 46.8858 45.6146 46.3894 45.3049 46.0373C44.9952 45.6809 44.5752 45.5027 44.0449 45.5027ZM58.6729 47.6027H54.4984V52H53.1875V42.0473H59.3475V43.1291H54.4984V46.5336H58.6729V47.6027ZM62.0967 52H60.8367V44.6055H62.0967V52ZM60.7285 42.6391C60.7285 42.4355 60.7921 42.2636 60.9194 42.1236C61.0467 41.9794 61.2333 41.9073 61.4794 41.9073C61.7255 41.9073 61.9121 41.9794 62.0394 42.1236C62.1667 42.2636 62.2303 42.4355 62.2303 42.6391C62.2303 42.847 62.1667 43.0188 62.0394 43.1545C61.9121 43.2903 61.7255 43.3582 61.4794 43.3582C61.2333 43.3582 61.0467 43.2903 60.9194 43.1545C60.7921 43.0188 60.7285 42.847 60.7285 42.6391ZM65.501 52H64.241V41.5H65.501V52ZM70.6044 52.1336C69.5989 52.1336 68.7822 51.8048 68.1544 51.1473C67.5265 50.4897 67.2125 49.6094 67.2125 48.5064V48.2773C67.2125 47.5433 67.3525 46.8879 67.6325 46.3109C67.9125 45.7339 68.3028 45.2821 68.8034 44.9555C69.3083 44.6288 69.8556 44.4655 70.4453 44.4655C71.4083 44.4655 72.155 44.7836 72.6853 45.42C73.2198 46.0521 73.4871 46.9579 73.4871 48.1373V48.6655H68.4789C68.4959 49.3952 68.708 49.9848 69.1153 50.4345C69.5225 50.88 70.0401 51.1027 70.668 51.1027C71.1177 51.1027 71.4974 51.0115 71.8071 50.8291C72.1168 50.6467 72.3883 50.4048 72.6216 50.1036L73.3916 50.7082C72.7722 51.6585 71.8431 52.1336 70.6044 52.1336ZM70.4453 45.5027C69.9362 45.5027 69.5077 45.6894 69.1598 46.0627C68.8119 46.4361 68.5977 46.9558 68.5171 47.6218H72.2207V47.5264C72.1868 46.8858 72.015 46.3894 71.7053 46.0373C71.3956 45.6809 70.9756 45.5027 70.4453 45.5027Z"
                              fill="#757575"
                            />
                          </svg>
                        </label>
                      </center>
                      <v-file-input
                        id="uploadOne"
                        v-model="offerForm.offerObj.file"
                        style="opacity: 0;height: 1px;"
                        show-size
                        outlined
                        dense
                        validate-on-blur
                        label="File input"
                      />
                    </div>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="2">
                    <v-btn
                      :loading="loadingBtnSave"
                      :disabled="loadingBtnSave"
                      color="red"
                      class="btnSearch"
                      style="margin-top: 15px"
                      @click="removeAll"
                    >
                      {{ $t('buttons.delete') }}
                    </v-btn>
                  </v-col>
                  <v-col cols="8" />
                  <v-col cols="2">
                    <v-btn
                      :loading="loadingBtnSave"
                      :disabled="loadingBtnSave"
                      color="#84BD00"
                      class="btnSearch"
                      style="margin-top: 15px"
                      @click="save"
                    >
                      {{ $t('buttons.submit') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <!-- show error message in dialog box -->
              <v-row
                v-for="(error, index) in computedErrorsInCreateDialog"
                :key="index"
              >
                <v-col>
                  <v-alert
                    v-model="createUserErrors[index].isShow"
                    dismissible
                    dense
                    type="error"
                    elevation="2"
                    icon="mdi-alert-decagram-outline"
                    @click:close="createUserErrors[index].isShow = false"
                  >
                    {{ error.type }}
                  </v-alert>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>

        <!-- dialog افزودن key value به ردیف -->
        <!-- dialog افزودن key value به ردیف -->
        <!-- dialog افزودن key value به ردیف -->
        <v-dialog
          v-model="createParamDialog"
          persistent
          max-width="1000px"
          transition="dialog-bottom-transition"
        >
          <v-card
            :loading="loading"
          >
            <!-- title -->
            <!-- title -->
            <!-- title -->
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="position: absolute;left: 20px; top: 18px;cursor: pointer"
              @click="createParamDialog = false"
            >
              <g clip-path="url(#clip0_401_143)">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_401_143">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <v-card-title class=" black--text font-weight-bold headline mb-2" style="border-bottom: 1px solid #D8D8D8;">
              {{ 'افزودن پارامتر' }}
            </v-card-title>

            <v-container>
              <v-form
                ref="form"
              >
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      v-model="offerForm.paramObj.key"
                      :label="$t('offer.key')"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="offerForm.paramObj.value"
                      :label="$t('offer.value')"
                      outlined
                      dense
                    />
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      :loading="loadingBtnSave"
                      :disabled="loadingBtnSave"
                      color="#84BD00"
                      class="btnSearch"
                      @click="saveParam"
                    >
                      {{ $t('buttons.submit') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <v-data-table
                id="detailsTableShowParameterDialog"
                item-key="username"
                sort-by="username"
                :items="params"
                :headers="headersParam"
                class="fullScreen mb-16"
                :loading="loading"
                dense
                :footer-props="{
                  'items-per-page-options': [20, 50, 100, 500, 1000]
                }"
                :hide-default-footer="true"
                :items-per-page.sync="paramObject.paginate.length"
                :page.sync="paramObject.paginate.page"
                :server-items-length="totalNumberOfItems"
                @update:page="searchParams (paramObject)"
                @update:items-per-page="searchParams (paramObject)"
              />
            </v-container>
          </v-card>
        </v-dialog>

        <!-- dialog حذف پیشنهاد -->
        <!-- dialog حذف پیشنهاد -->
        <!-- dialog حذف پیشنهاد -->
        <v-dialog
          v-model="deleteUserDialog"
          max-width="290"
        >
          <v-card
            dark
            color="primary"
          >
            <v-card-title class="headline">
              {{ $t('messages.warning') }}
            </v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                class="mb-2"
                small
                color="success"
                @click="deleteItem(item)"
              >
                {{ $t('messages.ok') }}
              </v-btn>
              <v-btn
                class="mb-2"
                small
                color="error"
                @click="deleteUserDialog = false"
              >
                {{ $t('buttons.cancel') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment-jalaali'
import { mapMutations, mapGetters } from 'vuex'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import OfferFilter from '~/components/offer/OfferFilter'
import reportManager from '~/repository/report_manager'
import userManager from '~/repository/user_manager'

export default {
  name: 'OfferPage',
  components: {
    'offer-filter': OfferFilter,
    PDatePicker: VuePersianDatetimePicker
  },
  data: function () {
    return {
      isShowTitleOfEditDialog: false,
      file: null,
      checkbox1: true,
      from: this.currentDayFrom(),
      to: this.currentDayTo(),
      offerType: reportManager.offerType,
      offerToTypeItem: reportManager.offerToType,
      offerTypDisplayItem: reportManager.offerTypDisplay,
      totalNumberOfItems: 0,
      guids: [
        {
          icon: 'mdi-pencil',
          description: 'user.editGuide'
        },
        {
          icon: 'mdi-trash-can',
          description: 'user.deleteGuide'
        },
        {
          icon: 'mdi-broom',
          description: 'user.clearButton'
        }
      ],
      requestObject: {
        paginate: {
          page: 1,
          length: 50,
          sort: {
            property: 'id',
            direction: 'desc'
          }
        }
      },
      paramObject: {
        id: null,
        paginate: {
          page: 1,
          length: 50,
          sort: {
            property: 'id'
          }
        }
      },
      loading: false,
      loadingBtnSave: false,
      userForm: {
        showPassword: false,
        userObj: {
          userAccessList: []
        }
      },
      offerForm: {
        offerObj: {
          userAccessList: []
        },
        paramObj: {}
      },
      createDialog: false,
      createUpdateDialog: false,
      createParamDialog: false,
      deleteUserDialog: false,
      headers: [
        { text: this.$t('offer.title'), value: 'title', sortable: false },
        { text: this.$t('offer.widgetTitle'), value: 'widgetTitle', sortable: false },
        { text: this.$t('offer.active'), value: 'status', sortable: false },
        { text: this.$t('offer.description'), value: 'content', sortable: false },
        { text: this.$t('offer.url'), value: 'url', sortable: false },
        { text: this.$t('offer.alternativeUrl'), value: 'alternativeUrl', sortable: false },
        { text: this.$t('offer.uri'), value: 'uri', sortable: false },
        { text: this.$t('offer.type'), value: 'recommendationType', sortable: false },
        { text: this.$t('offer.to'), value: 'os', sortable: false },
        { text: this.$t('offer.dateFrom'), value: 'dateFrom', sortable: false },
        { text: this.$t('offer.dateTo'), value: 'dateTo', sortable: false },
        { text: '', value: 'addParams', sortable: false },
        { text: '', value: 'actions', sortable: false, align: 'center' }
      ],
      headersParam: [
        { text: this.$t('offer.key'), value: 'key' },
        { text: this.$t('offer.value'), value: 'value', align: 'center' }
      ],
      offers: [],
      params: [],
      createUserErrors: []
    }
  },
  head () {
    return {
      title: 'پیشنهاد روز' + ' :: ' + process.env.VUE_APP_NAME + ' :: ' + this.$t('version')
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'user/me'
    }),
    computedErrorsInCreateDialog: function () {
      if (this.createUserErrors !== undefined && this.createUserErrors !== null && this.createUserErrors.length !== 0) {
        this.createUserErrors.forEach((e) => {
          e.isShow = true
        })
        return this.createUserErrors
      } else {
        return []
      }
    }
  },
  mounted: function () {
    this.offerForm.offerObj.dateFrom = this.convertJalaliDateToTimestamp(this.from)
    this.offerForm.offerObj.dateTo = this.convertJalaliDateToTimestamp(this.to)

    this.search(this.requestObject, 'mounted')
  },
  methods: {
    ...mapMutations({
      alert: 'snacks/showMessage'
    }),
    clearAllDataInForm () {
      delete this.userForm.userObj.locationAccess
      delete this.userForm.userObj.userAccessList
      delete this.userForm.userObj.provinceCode
      delete this.userForm.userObj.cityCode
      delete this.userForm.userObj.branchCode
      this.resetValidation()
    },
    async search (searchModel) {
      this.loading = true
      try {
        const response = await reportManager.listOffer(searchModel, this.$axios)
        this.offers = response.data.itemList
        this.totalNumberOfItems = response.data.filteredItem
      } catch (e) {
        this.alert({
          color: 'orange',
          content: 'messages.failed'
        })
      } finally {
        this.loading = false
      }
    },
    convertToJalali (date) {
      return moment(date).format('HH:mm:ss jYYYY/jM/jD')
    },
    async searchParams (searchModel) {
      // searchModel.page = this.pagination.page
      // searchModel.length = this.pagination.rowsPerPage
      this.loading = true
      try {
        const response = await reportManager.listParam(searchModel, this.$axios)
        this.params = response.data.itemList
        this.totalNumberOfItems = response.data.filteredItem
      } catch (e) {
        this.alert({
          color: 'orange',
          content: 'messages.failed'
        })
      } finally {
        this.loading = false
      }
    },
    addParams (item) {
      this.offerForm.paramObj = {
        id: item.id
      }
      this.createParamDialog = true
    },
    editItem (item) {
      let status = true
      let recommendationType = '0'
      if (item.status === 'N') {
        status = false
      }
      if (item.recommendationType === 1) {
        recommendationType = '1'
      } else if (item.recommendationType === 2) {
        recommendationType = '2'
      }

      this.offerForm.offerObj = {
        id: item.id,
        title: item.title,
        widgetTitle: item.widgetTitle,
        url: item.url,
        recommendationType: recommendationType,
        alternativeUrl: item.alternativeUrl,
        dateFrom: item.dateFrom,
        dateTo: item.dateTo,
        uri: item.uri,
        type: item.type,
        description: item.description,
        os: item.os,
        file: item.file,
        explanation: item.content,
        status: status
      }
      this.createUpdateDialog = true
      this.isShowTitleOfEditDialog = true
    },
    checkIsNullFromDate () {
      if (this.from != null) {
        this.offerForm.offerObj.dateFrom = this.convertJalaliDateToTimestamp(this.from)
      }
    },
    checkIsNullToDate () {
      if (this.to != null) {
        this.offerForm.offerObj.dateTo = this.convertJalaliDateToTimestamp(this.to)
      }
    },
    showErrorsInCreateUserDialog (errors) {
      this.loading = false
      this.createUserErrors = errors
    },
    removeAll () {
      reportManager.deleteOffer(this.offerForm.offerObj, this.$axios).then(() => {
        this.alert({
          color: 'success',
          content: 'messages.successful'
        })
        this.loading = false
        this.closeCreateUserDialog()
        this.search(this.requestObject)
      }).catch((e) => {
        this.loading = false
        this.showErrorsInCreateUserDialog(e.response.data.detailList)
      }).finally(() => {
        this.loading = false
      })
    },
    save () {
      const formData = new FormData()
      formData.append('file', this.offerForm.offerObj.file)
      formData.append('title', this.offerForm.offerObj.title)
      formData.append('description', this.offerForm.offerObj.description)
      formData.append('url', this.offerForm.offerObj.url)
      formData.append('alternativeUrl', this.offerForm.offerObj.alternativeUrl)
      formData.append('uri', this.offerForm.offerObj.uri)/*
      formData.append('dateFromStr', this.offerForm.offerObj.dateFrom)
      formData.append('dateToStr', this.offerForm.offerObj.dateTo) */
      formData.append('type', this.offerForm.offerObj.type)
      formData.append('recommendationType', this.offerForm.offerObj.recommendationType)
      formData.append('offerType', this.offerForm.offerObj.offerType)
      formData.append('widgetTitle', this.offerForm.offerObj.widgetTitle)
      formData.append('status', this.checkbox1)
      formData.append('os', this.offerForm.offerObj.os)
      formData.append('explanation', this.offerForm.offerObj.explanation)
      this.checkIsNullToDate()
      this.checkIsNullFromDate()

      formData.append('dateFromStr', this.offerForm.offerObj.dateFrom)
      formData.append('dateToStr', this.offerForm.offerObj.dateTo)

      if (this.validate()) {
        this.loading = true
        this.loadingBtnSave = true
        try {
          if (this.offerForm.offerObj.id) {
            reportManager.updateUploadOffer(this.offerForm.offerObj, this.$axios).then(() => {
              this.alert({
                color: 'success',
                content: 'messages.successful'
              })
              this.loading = false
              this.loadingBtnSave = false
              this.closeCreateUserDialog()
              this.search(this.requestObject)
            }).catch((e) => {
              this.loading = false
              this.loadingBtnSave = false
              this.alert({
                color: 'orange',
                content: e.response.data.error_message
              })
              this.showErrorsInCreateUserDialog(e.response.data.detailList)
            })
          } else {
            reportManager.uploadOffer(formData, this.$axios).then(() => {
              this.alert({
                color: 'success',
                content: 'messages.successful'
              })
              this.loading = false
              this.loadingBtnSave = false
              this.closeCreateUserDialog()
              this.search(this.requestObject)
            }).catch((e) => {
              this.loading = false
              this.loadingBtnSave = false
              // this.alert({
              //   color: 'orange',
              //   content: e.response.data.error_message
              // })
              //   this.showErrorsInCreateUserDialog(e.response.data.detailList)
            })
          }
        } catch (e) {
          this.loading = false
          this.loadingBtnSave = false
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        } finally {
          this.loading = false
          this.loadingBtnSave = false
        }
      }
    },
    saveParam () {
      if (this.validate()) {
        this.loading = true
        this.paramObject.id = this.offerForm.paramObj.id
        this.searchParams(this.paramObject)
        try {
          reportManager.addParams(this.offerForm.paramObj, this.$axios).then(() => {
            this.alert({
              color: 'success',
              content: 'messages.successful'
            })
            this.closeCreateParamDialog()
            this.paramObject.id = this.offerForm.paramObj.id
            this.searchParams(this.paramObject)
          }).catch((e) => {
            this.alert({
              color: 'orange',
              content: e.response.data.error_message
            })
            this.showErrorsInCreateUserDialog(e.response.data.detailList)
          })
          //  }
        } catch (e) {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
      }
    },
    closeCreateUserDialog () {
      /*  this.loading = false
        this.offerForm.offerObj = {}
        this.reset()
        this.resetValidation() */

      this.offerForm.offerObj = {}
      this.resetValidation()
      this.createDialog = false
      this.createUpdateDialog = false
      /* if (this.isShowTitleOfEditDialog) {
        this.isShowTitleOfEditDialog = false
      } */
    },
    del (item) {
      this.deleteUserDialog = true
      this.item = item
    },
    async deleteItem (item) {
      try {
        const res = await userManager.deleteUser(item.id, this.$axios)
        if (res.status === 204) {
          this.alert({
            color: 'success',
            content: 'messages.successful'
          })
        } else {
          this.alert({
            color: 'orange',
            content: 'messages.failed'
          })
        }
      } catch (error) {
        this.alert({
          color: 'orange',
          content: 'messages.failed'
        })
      } finally {
        this.deleteUserDialog = false
      }
    },
    closeCreateOfferDialog () {
      this.loading = false
      this.offerForm.offerObj = {}
      // this.reset()
      // this.resetValidation()
      this.createDialog = false
      this.createUserErrors = null
      this.createUpdateDialog = false
      /*  if (this.isShowTitleOfEditDialog) {
          this.isShowTitleOfEditDialog = false
        } */
    },
    closeCreateParamDialog () {
      this.loading = false
      this.offerForm.offerObj = {}
      this.reset()
      this.resetValidation()
      this.createUserErrors = null
      /*  if (this.isShowTitleOfEditDialog) {
          this.isShowTitleOfEditDialog = false
        } */
    },
    showCreateDialog () {
      this.createDialog = true
    },
    closeCreateDialog () {
      this.createDialog = false
    },
    validate () {
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    currentDayFrom: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 0, 0, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')
      return '00:00 ' + year + '-' + month + '-' + day
    },
    currentDayTo: function () {
      const year = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jYYYY')
      const month = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jMM')
      const day = moment(new Date().toLocaleDateString(), 'MM/DD/YYYY').format('jDD')

      // const gmtDate = Date.UTC(year, month - 1, day, 23, 59, 0)
      // const d = new Date(gmtDate)
      // return moment(new Date(d.getTime() + (d.getTimezoneOffset() * 60000)).toLocaleString('en-US', { hour12: false }), 'MM/DD/YYYY, h24:mm:ss').format('HH:mm jYYYY/jMM/jDD')

      return '23:59 ' + year + '-' + month + '-' + day
    },
    convertJalaliDateToTimestamp (date) {
      const year = moment(date, 'HH:mm jYYYY/jMM/jDD').format('YYYY')
      const month = moment(date, 'HH:mm jYYYY/jMM/jDD').format('MM')
      const day = moment(date, 'HH:mm jYYYY/jMM/jDD').format('DD')
      const hour = moment(date, 'HH:mm jYYYY/jMM/jDD').format('HH')
      const minute = moment(date, 'HH:mm jYYYY/jMM/jDD').format('mm')
      const gmtDate = Date.UTC(year, month - 1, day, hour, minute, 0)
      const d = new Date(gmtDate)
      //  console.log(d.getTime() + (d.getTimezoneOffset() * 60000))
      return d.getTime() + (d.getTimezoneOffset() * 60000)
    }
  }
}
</script>

<style scoped>
/deep/ #detailsTableShowParameterDialog > .v-data-table__wrapper {
  min-height: 190px !important;
}
</style>
