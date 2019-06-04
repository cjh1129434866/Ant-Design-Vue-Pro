<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout class="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      v-if= "navLayout === 'left'"
      :theme="navTheme"
      collapsible
      v-model="collapsed"
      :trigger="null"
      width="256px"
    >
      <div class="logo">Ant Design Vue Pro</div>
      <SideMenu :theme="navTheme"/>  
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon v-auth="['admin']" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed = !collapsed"></a-icon>
        <Header/>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer/>
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <Authorized :authority="['admin']">
    <settingDrawer/> 
  </Authorized>  
  </div>
</template>

<script>
import Header from './header'
import Footer from './footer'
import SideMenu from './sideMenu'
import settingDrawer from '../components/settingDrawer'

export default {
  name: 'basicLayout',
  components: {
    Header,
    Footer,
    SideMenu,
    settingDrawer
  },
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    navTheme () {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout () {
      return this.$route.query.navLayout || 'left'
    }
  }
}
</script>

<style scoped>
/* .components-layout-demo-side >>> .ant-menu.ant-menu-dark .ant-menu-item-selected{
  color: #000;
} */
.trigger{
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
  cursor: pointer;
}
.trigger:hover{
  background: #eeeeee;
}
.logo{
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>
