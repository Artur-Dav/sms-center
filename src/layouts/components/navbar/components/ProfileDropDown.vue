<template>
  <div class="the-navbar__user-meta flex items-center" v-if="FullName">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ FullName }}</p>
      <!-- <small>Available</small> -->
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img v-if="Avatar" key="onlineImg" :src="Avatar" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
        <div v-else class="name-avatar">{{ FullNameLetter }}</div>
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/company/user/268').catch(() => {})">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/email').catch(() => {})">
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Invoice</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/todo').catch(() => {})">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Payment</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/topup').catch(() => {})">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Top-up</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/setting').catch(() => {})">
            <feather-icon icon="ListIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Setting</span>
          </li>

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    UserInfo () {
      return this.$store.getters['user/GetUserInfo']
    },
    FullName () {
      return this.$store.getters['user/GetFullName']
    },
    Avatar () {
      const logo_uuid = this.$store.getters['user/GetAvatar']

      if (!logo_uuid) {
        return null
      }

      return `http://88.198.219.62/api_smsc/v1/file/${logo_uuid}`
    },
    FullNameLetter () {
      const { first_name, last_name } = this.$store.getters['user/GetUserInfo']
      
      if (!first_name || !last_name) {
        return ''
      }

      return `${first_name[0]}${last_name[0]}`
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/Logout')
      .then(res => {
        
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.the-navbar__user-meta {
  .con-img {
    
    img {
      padding: 2px;
    }
    .name-avatar {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      font-weight: 600;
      background-color: #7367f0;
      color: #fff;
    }
  }
}
</style>
