export default {
  data() {
    return {
      list: [],
      page: this.$route.query['page'] || 0,
      per_page: this.$route.query['per-page'] || 10,
      total_pages: 0,
    }
  },
  watch: {
    '$route.query.page': function(page) {
      this.page = page
      this.GetList()
    }
  },
  computed: {
    listLength() {
      return this.list.length || 0
    }
  },
  beforeCreate() {
    const { query } = this.$route
    const is_there_query = Object.keys(query).length

    if (is_there_query) {
      this.$router.push({ query })
    } else {
      this.$router.push({ query: { 'page': 0, 'per-page': 10 } })
    }
  },
  methods: {
    ChangePerPage(per_page) {
      this.$router.push({ query: { 'page': 0, 'per-page': per_page } })
      this.page = 0
      this.per_page = per_page
      this.GetList()
    },
  }
}