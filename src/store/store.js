import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// import moduleTodo from './todo/moduleTodo.js'
// import moduleCalendar from './calendar/moduleCalendar.js'
// import moduleChat from './chat/moduleChat.js'
// import moduleEmail from './email/moduleEmail.js'
import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'
import reseller from './reseller'
import company from './company'
import invoice from './invoice'
import payment from './payment'
import did from './did'
import smscConnection from './smscConnection'
import filters from './filters'
import vendor from './vendor'
import vendorProduct from './vendorProduct'
import usageReport from './usageReport'
import country from './country'
import product from './product'
import user from './user'
import gateway from './gateway'
import paymentTerm from './paymentTerm'
import smsTemplate from './smsTemplate'
import aniGroup from './aniGroup'
import transaction from './transaction'
import rateTable from './rateTable'
import mobileNetwork from './mobileNetwork'
import rate from './rate'
import bulk from './bulk'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    // todo: moduleTodo,
    // calendar: moduleCalendar,
    // chat: moduleChat,
    // email: moduleEmail,
    auth: moduleAuth,
    eCommerce: moduleECommerce,
    reseller,
    company,
    invoice,
    payment,
    did,
    smscConnection,
    filters,
    vendor,
    vendorProduct,
    usageReport,
    country,
    product,
    user,
    gateway,
    paymentTerm,
    smsTemplate,
    aniGroup,
    transaction,
    rateTable,
    mobileNetwork,
    rate,
    bulk
  },
  strict: process.env.NODE_ENV !== 'production'
})
