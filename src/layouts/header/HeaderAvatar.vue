<template>
  <el-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <el-avatar class="avatar" size="small" shape="circle" icon="el-icon-user-solid" />
      <span class="name">{{ userinfo && userinfo.username }}</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <router-link to="/manege/user">
          <i class="el-icon-setting" />
          <span>设置</span>
        </router-link>
      </el-dropdown-item>
      <el-dropdown-item>
        <div @click="logout">
          <i class="el-icon-switch-button" />
          <span>退出登录</span>
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeaderAvatar',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('user', ['userinfo'])
  },
  mounted() {
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
