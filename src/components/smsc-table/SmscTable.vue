<!-- ====================================================================
  Props: header [Array] (required)
         body [Array] (optional)
==================================================================== -->

<template>
  <data-not-found v-if="!listLength" />
  <div
    v-else
    class="smsc-table__wrapper"
  >
    <div class="smsc-table__container">
      <table class="smsc-table">
        <thead class="smsc-table__head">
          <tr class="smsc-table__row">
            <td
              v-for="(elem, index) in header"
              :key="`smsc-table__cell-${index}`"
              :style="{ 'min-width': `${elem.width}px` }"
              class="smsc-table__cell"
            >{{ elem.name }}</td>
          </tr>
          <tr class="smsc-table__row">
            <td
              v-for="(elem, index) in header"
              :key="`smsc-table__cell-${index}`"
              :style="{ 'min-width': `${elem.width}px` }"
              class="smsc-table__cell"
            >
              <div class="table__filter">
                <input
                  type="text"
                  class="filter__input"
                />
                <svg
                  viewBox="0 0 459 459"
                  class="filter__icon"
                >
                  <g>
                    <g>
                      <path d="M178.5,382.5h102v-51h-102V382.5z M0,76.5v51h459v-51H0z M76.5,255h306v-51h-306V255z"/>
                    </g>
                  </g>
                  </svg>
              </div>
            </td>
          </tr>
        </thead>
        <tbody class="smsc-table__body">
          <slot />
        </tbody>
      </table>
    </div>
    <div class="smsc-table__footer">
      <div class="smsc-table__col">
        <div class="smsc-table__per-page">
          <per-page
            :currentPage="currentPage"
            :list-length="listLength"
            :queriedItems="total"
            @select-per-page="$emit('change-per-page', $event)"
          />
        </div>
      </div>
      <div class="smsc-table__col">
        <div class="smsc-table__pagination">
          <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataNotFound from '@/components/DataNotFound.vue'
import PerPage from '@/components/PerPage.vue'

export default {
  name: 'smsc-table',
  components: {
    DataNotFound,
    PerPage
  },
  props: {
    header: {
      type: Array,
      default: () => []
    },
    body: {
      type: Array,
      default: () => []
    },
    listLength: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    currentPage: {
      get() {
        const page = Number(this.$route.query['page']) + 1
        return page || 1
      },
      set(value) {
        const per_page = this.$route.query['per-page']
        const query = { 'page': value - 1, 'per-page': per_page }
        this.$router.push({ query })
      }
    },
    totalPages() {
      const per_page = Number(this.$route.query['per-page']) || 10
      return Math.ceil(Number(this.total) / per_page)
    }
  },
}
</script>

<style lang="scss">
.smsc-table__wrapper {
  width: 100%;

  .smsc-table__container {
    width: 100%;
    overflow-x: auto;

    // table tag
    .smsc-table {
      min-width: 100%;
      background: #fff;
      border-collapse: collapse;
      // padding: 15px 10px;
      // border: 1px solid #e0e0e0;

      // thead tag
      .smsc-table__head {
        width: 100%;
        background: #fff;

        .smsc-table__row {
          // outline: 1px solid #e0e0e0;
          background: #fff;

          .smsc-table__cell {
            // padding: 18px 24px;
            height: 56px;
            line-height: 56px;
            // border-right: 1px solid #e0e0e0;
            // border-bottom: 1px solid #000;
            font-size: 14px;
            color: #0000008a;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s ease;

            &:last-child {
              border-right: none;
            }
            &:hover {
              background: #f2f2f2;
            }
            .table__filter {
              display: flex;
              align-items: center;
              height: inherit;
              padding: 9px 0;

              .filter__input {
                height: 100%;
                width: calc(100% - 30px);
                padding-bottom: 8px;
                border: none;
                border-bottom: 2px solid #e2e2e2;
                background: transparent;
                font-size: 14px;
                color: #626262;

                &:focus {
                  border-color: #7367f0;
                }
              }
              .filter__icon {
                box-sizing: border-box;
                width: 17px;
                height: 17px;
                margin-left: 13px;
                padding: 2px;

                path {
                  fill: #333;
                }
              }
            } 
          }
        }
      }

      // tbody tag
      .smsc-table__body {
        width: 100%;

        .smsc-table__row {

          &:hover {
            background: #f9f9f9;
          }
        }
      }

      // All tr tag's
      .smsc-table__row {
        width: 100%;

        .smsc-table__cell {
          // padding: 8px 12px;
          height: 48px;
          line-height: 48px;
          padding: 0px 24px;
          border-bottom: 1px solid #e2e2e2;
        }
      }
    }

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      // border-bottom-left-radius: 6px;
      // border-bottom-right-radius: 6px;
      // background-color: #d0d0d0;
      background: #dae1e7;
      border-radius: 20px;
    }
    // &::-webkit-scrollbar-thumb:hover {
    //   background-color: #909090;
    // }
  }
  .smsc-table__footer {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 15px 0 0;

    .smsc-table__col {
      flex-grow: 1;
    }
  }
}
</style>