<template>
  <vs-dropdown vs-trigger-click class="cursor-pointer items-per-page-handler">
    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
    <span class="mr-2">{{ firstNumber }} - {{ lastNumber }} of {{ queriedItems }}</span>
    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
    </div>
    <vs-dropdown-menu>

      <vs-dropdown-item
        v-for="item in perPageOptions"
        :key="item"
        @click="SelectPerPage(item)"
      >
        <span>{{ item }}</span>
      </vs-dropdown-item>
    </vs-dropdown-menu>
</vs-dropdown>
</template>

<script>
export default {
  name: 'per-page',
  props: {
    perPageOptions: {
      type: Array,
      default: () => [10, 50, 100]
    },
    currentPage: {
      type: Number,
      default: 1
    },
    listLength: {
      type: Number,
      default: 0
    },
    queriedItems: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      itemsPerPage: 0,
    }
  },
  computed: {
    firstNumber() {
      return this.currentPage * this.itemsPerPage - (this.itemsPerPage - 1)
    },
    lastNumber() {
      return this.listLength + (this.currentPage - 1) * this.itemsPerPage
    }
  },
  created() {
    this.itemsPerPage = this.$route.query['per-page'] || this.perPageOptions[0]
  },
  methods: {
    SelectPerPage(per_page) {
      if (per_page == this.itemsPerPage) {
        return
      }
      
      this.itemsPerPage = per_page
      this.$emit('select-per-page', per_page)
    }
  }
}
</script>