import Vue from 'vue'
import VxTooltip from './layouts/components/vx-tooltip/VxTooltip.vue'
import VxCard from './components/vx-card/VxCard.vue'
import VxList from './components/vx-list/VxList.vue'
import VxBreadcrumb from './layouts/components/VxBreadcrumb.vue'
import FeatherIcon from './components/FeatherIcon.vue'
import VxInputGroup from './components/vx-input-group/VxInputGroup.vue'
import SmscTr from './components/smsc-table/SmscTr.vue'
import SmscTd from './components/smsc-table/SmscTd.vue'
import SmscTable from './components/smsc-table/SmscTable.vue'
import PerPage from './components/PerPage.vue'
import DropDown from './components/Inputs/DropDown.vue'
import SmscCol from './components/smsc-col/smsc-col.vue'
import SmscColItem from './components/smsc-col/smsc-col-item.vue'
import ActiveOnly from './components/ActiveOnly.vue'
import NoData from './components/NoData.vue'

Vue.component(VxTooltip.name, VxTooltip)
Vue.component(VxCard.name, VxCard)
Vue.component(VxList.name, VxList)
Vue.component(VxBreadcrumb.name, VxBreadcrumb)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component(VxInputGroup.name, VxInputGroup)
Vue.component(SmscTr.name, SmscTr)
Vue.component(SmscTd.name, SmscTd)
Vue.component(SmscTable.name, SmscTable)
Vue.component(PerPage.name, PerPage)
Vue.component(DropDown.name, DropDown)
Vue.component(SmscCol.name, SmscCol)
Vue.component(SmscColItem.name, SmscColItem)
Vue.component(ActiveOnly.name, ActiveOnly)
Vue.component(NoData.name, NoData)


// v-select component
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'XIcon',
        svgClasses: 'w-4 h-4 mt-1'
      }
    })
  },
  OpenIndicator: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'ChevronDownIcon',
        svgClasses: 'w-5 h-5'
      }
    })
  }
})

Vue.component(vSelect)
