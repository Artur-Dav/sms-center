<template>
  <vs-dropdown vs-trigger-click class="cursor-pointer">
    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
      <span class="mr-2">{{ pageStart }} - {{ pageEnd }} of {{ total }}</span>
      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
    </div>
    <vs-dropdown-menu>
      <vs-dropdown-item
        v-for="item in perPageValue"
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
    perPageValue: {
      type: Array,
      default: () => [10, 50, 100]
    },
    currentPerPage: {
      type: Number,
      default: 0
    },
    pageStart: {
      type: Number,
      default: 0
    },
    pageEnd: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    SelectPerPage(per_page) {
      if (this.currentPerPage == per_page) {
        return
      }
      
      this.$emit('change-per-page', per_page)
    }
  }
}
</script>