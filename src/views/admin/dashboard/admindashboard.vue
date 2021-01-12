<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="subscribersGained.analyticsData"
          icon="UsersIcon"
          :statistic="subscribersGained.analyticsData.subscribers | k_formatter"
          statisticTitle="SMS Delivered"
          :chartData="subscribersGained.series"
          type="area"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="revenueGenerated.analyticsData"
          icon="DollarSignIcon"
          :statistic="revenueGenerated.analyticsData.revenue | k_formatter"
          statisticTitle="SMS Sent"
          :chartData="revenueGenerated.series"
          color="success"
          type="area"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="quarterlySales.analyticsData"
          icon="ShoppingCartIcon"
          :statistic="quarterlySales.analyticsData.sales"
          statisticTitle="Revenue"
          :chartData="quarterlySales.series"
          color="danger"
          type="area"
        />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="ordersRecevied.analyticsData"
          icon="ShoppingBagIcon"
          :statistic="ordersRecevied.analyticsData.orders | k_formatter"
          statisticTitle="DID Count"
          :chartData="ordersRecevied.series"
          color="warning"
          type="area"
        />
      </div>
    </div>

    <div class="vx-row">

      <!-- LINE CHART -->
      <div class="vx-col w-full md:w-2/3 mb-base">
        <vx-card title="Revenue">
          <template slot="actions">
            <feather-icon icon="SettingsIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
          </template>
          <div slot="no-body" class="p-6 pb-0">
            <div class="flex" v-if="revenueComparisonLine.analyticsData">
              <div class="mr-6">
                <p class="mb-1 font-semibold">This Month</p>
                <p class="text-3xl text-success"><sup class="text-base mr-1">$</sup>{{ revenueComparisonLine.analyticsData.thisMonth.toLocaleString() }}</p>
              </div>
              <div>
                <p class="mb-1 font-semibold">Last Month</p>
                <p class="text-3xl"><sup class="text-base mr-1">$</sup>{{ revenueComparisonLine.analyticsData.lastMonth.toLocaleString() }}</p>
              </div>
            </div>
            <vue-apex-charts
              type="line"
              height="266"
              :options="analyticsData.revenueComparisonLine.chartOptions"
              :series="revenueComparisonLine.series"
            />
          </div>
        </vx-card>
      </div>

      <!-- RADIAL CHART -->
      <div class="vx-col w-full md:w-1/3 mb-base">
        <vx-card title="Goal Overview">
          <template slot="actions">
            <feather-icon icon="HelpCircleIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
          </template>

          <!-- CHART -->
          <template slot="no-body">
            <div class="mt-10">
              <vue-apex-charts type="radialBar" height="240" :options="analyticsData.goalOverviewRadialBar.chartOptions" :series="goalOverview.series" />
            </div>
          </template>

          <!-- DATA -->
          <div class="flex justify-between text-center mt-6" slot="no-body-bottom">
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
              <p class="mt-4">Completed</p>
              <p class="mb-4 text-3xl font-semibold">786,617</p>
            </div>
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
              <p class="mt-4">In Progress</p>
              <p class="mb-4 text-3xl font-semibold">13,561</p>
            </div>
          </div>
        </vx-card>
      </div>
    </div>

    <vx-card>
      <!-- Per Page -->
      <div class="mb-4 md:mb-0">
        <per-page
          :currentPerPage="per_page"
          :pageStart="pageStart"
          :pageEnd="pageEnd"
          :total="total"
          @change-per-page="ChangePerPage($event)"
        />
      </div>

      <!-- Table -->
      <ag-grid-vue
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="list"
        @gridReady="GridReady"
        @filterChanged="Filtering"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="isFloatingFilter"
        :pagination="true"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
        >
      </ag-grid-vue>

      <!-- Pagination -->
      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="Page" />
    </vx-card>
    <!-- <vx-card>
      <vs-table
        :sst="true"
        @search="handleSearch"
        @change-page="handleChangePage"
        @sort="handleSort"
        v-model="selected"
        pagination
        max-items="3"
        search
        stripe
        :data="users">

          <template slot="header">
              <h3></h3>
          </template>

          <template slot="thead">
            <vs-th width="16%" sort-key="email">Date</vs-th>
            <vs-th width="12%" sort-key="email">Sent(SMS)</vs-th>
            <vs-th width="12%" sort-key="email">Delivered(SMS)</vs-th>
            <vs-th width="12%" sort-key="email">Cost(SMS)</vs-th>
            <vs-th width="12%" sort-key="email">Minute(Inbound Call)</vs-th>
            <vs-th width="12%" sort-key="email">Cost(Inbound Call)</vs-th>
            <vs-th width="12%" sort-key="email">Minute(Outbound Call)</vs-th>
            <vs-th width="12%" sort-key="email">Cost(Outbound Call)</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td> {{ data[indextr].date }} </vs-td>
              <vs-td> {{ data[indextr].sms_sent }} </vs-td>
              <vs-td> {{ data[indextr].sms_delivered }} </vs-td>
              <vs-td> {{ data[indextr].sms_cost }} </vs-td>
              <vs-td> {{ data[indextr].inbound_minute }} </vs-td>
              <vs-td> {{ data[indextr].inbound_cost }} </vs-td>
              <vs-td> {{ data[indextr].outbound_minute }} </vs-td>
              <vs-td> {{ data[indextr].outbound_cost }} </vs-td>
              <template class="expand-user" slot="expand">
                <table class="sub-table">
                  <tbody>
                    <tr>
                      <td class="empty" width="25"></td>
                      <td width="16%"> China </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                    </tr>
                    <tr>
                      <td class="empty" width="25"></td>
                      <td width="16%"> United State </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                      <td width="12%"> 1 </td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </vs-tr>
          </template>
      </vs-table>
    </vx-card> -->
  </div>
</template>

<script>
// Mixins
import TableMixin from '@/mixins/table.js'

// Packages
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from './StatisticsCardLine.vue'
import analyticsData from './analyticsData.js'
import ChangeTimeDurationDropdown from './ChangeTimeDurationDropdown.vue'

export default {
  mixins: [TableMixin],
  components: {
    AgGridVue,
    VueApexCharts,
    StatisticsCardLine,
    VuePerfectScrollbar,
    ChangeTimeDurationDropdown
  },
  data () {
    return {
      // table header value
      columnDefs: [
        {
          headerName: 'Country',
          field: 'country',
          minWidth: 200,
          // sortable: true
        },
        {
          headerName: 'Date',
          field: 'date',
          minWidth: 200,
          // sortable: true
        },
        {
          headerName: 'Sent(SMS)',
          field: 'sent',
          minWidth: 130,
          // sortable: true
        },
        {
          headerName: 'Delivered(SMS)',
          field: 'delivered',
          minWidth: 165,
          // sortable: true
        },
        {
          headerName: 'Cost(SMS)',
          field: 'cost',
          minWidth: 130,
          // sortable: true
        },
        {
          headerName: 'Minute(Inbound Call)',
          field: 'minute_inbound',
          minWidth: 210,
          // sortable: true
        },
        {
          headerName: 'Cost(Inbound Call)',
          field: 'cost_inbound',
          minWidth: 190,
          // sortable: true
        },
        {
          headerName: 'Minute(Outbound Call)',
          field: 'minute_outbound',
          minWidth: 220,
          // sortable: true
        },
        {
          headerName: 'Cost(Outbound Call)',
          field: 'cost_outbound',
          minWidth: 200,
          // sortable: true
        },
      ],

      users: [
        {
          date: '2020/08/01',
          sms_sent: 1,
          sms_delivered: 1,
          sms_cost: '$0.1',
          inbound_minute: '2',
          inbound_cost: '$0.1',
          outbound_minute: '3',
          outbound_cost: '$0.2'
        },
        {
          date: '2020/08/01',
          sms_sent: 1,
          sms_delivered: 1,
          sms_cost: '$0.1',
          inbound_minute: '2',
          inbound_cost: '$0.1',
          outbound_minute: '3',
          outbound_cost: '$0.2'
        }
      ],
      subscribersGained: {},
      revenueGenerated: {},
      quarterlySales: {},
      ordersRecevied: {},

      revenueComparisonLine: {},
      goalOverview: {},

      browserStatistics: [],
      clientRetentionBar: {},

      sessionsData: {},
      chatLog: [],
      chatMsgInput: '',
      customersData: {},

      analyticsData,
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  mounted () {
    const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
    scroll_el.scrollTop = this.$refs.chatLog.scrollHeight
  },
  created () {
    this.GetList()
    // Subscribers gained - Statistics
    this.$http.get('/api/card/card-statistics/subscribers')
      .then((response) => { this.subscribersGained = response.data })
      .catch((error) => { console.log(error) })

      // Revenue Generated
    this.$http.get('/api/card/card-statistics/revenue')
      .then((response) => { this.revenueGenerated = response.data })
      .catch((error) => { console.log(error) })

      // Sales
    this.$http.get('/api/card/card-statistics/sales')
      .then((response) => { this.quarterlySales = response.data })
      .catch((error) => { console.log(error) })

      // Orders - Statistics
    this.$http.get('/api/card/card-statistics/orders')
      .then((response) => { this.ordersRecevied = response.data })
      .catch((error) => { console.log(error) })

      // Revenue Comparison
    this.$http.get('/api/card/card-analytics/revenue-comparison')
      .then((response) => { this.revenueComparisonLine = response.data })
      .catch((error) => { console.log(error) })

      // Goal Overview
    this.$http.get('/api/card/card-analytics/goal-overview')
      .then((response) => { this.goalOverview = response.data })
      .catch((error) => { console.log(error) })

      // Browser Analytics
    this.$http.get('/api/card/card-analytics/browser-analytics')
      .then((response) => { this.browserStatistics = response.data })
      .catch((error) => { console.log(error) })

      // Client Retention
    this.$http.get('/api/card/card-analytics/client-retention')
      .then((response) => { this.clientRetentionBar = response.data })
      .catch((error) => { console.log(error) })

      // Sessions By Device
    this.$http.get('/api/card/card-analytics/session-by-device')
      .then((response) => { this.sessionsData = response.data })
      .catch((error) => { console.log(error) })

      // Chat Log
    this.$http.get('/api/chat/demo-1/log')
      .then((response) => { this.chatLog = response.data })
      .catch((error) => { console.log(error) })

      // Customers
    this.$http.get('/api/card/card-analytics/customers')
      .then((response) => { this.customersData = response.data })
      .catch((error) => { console.log(error) })
  },
  methods: {
    GetList () {
      this.total = 2
      this.list = [
        {
          country: 'China',
          date: '2020:08:01 15:18:44',
          sent: 1,
          delivered: 3,
          cost: `$${0.1}`,
          minute_inbound: 2,
          cost_inbound: `$${0.2}`,
          minute_outbound: 2,
          cost_outbound: `$${0.2}`
        },
        {
          country: 'United State',
          date: '2020:09:21 22:05:32',
          sent: 2,
          delivered: 5,
          cost: `$${0.2}`,
          minute_inbound: 1,
          cost_inbound: `$${0.1}`,
          minute_outbound: 1,
          cost_outbound: `$${0.1}`
        },
      ]
    }
  }
}
</script>

<style lang="scss">
.chat-card-log {
    height: 400px;

    .chat-sent-msg {
        background-color: #f2f4f7 !important;
    }
}

.sub-table {
  font-size: 1rem !important;

  td {
    padding: 10px 15px;
  }

  .empty {
    padding: 10px 12px !important;
  }
}

.content-tr-expand {
  padding: 0 !important;
}
</style>
