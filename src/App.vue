<template>
  <div id="app">
 <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
     <el-menu-item ><img class="logo" src="@/assets/gelogo.png" alt="GE Logo"></el-menu-item>
      <el-menu-item class="menu-text" index="1">WIZARD-ADMIN</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
}
</script>

<style lang="scss">
.menu-text{
  font-size: 20px !important;
}
.el-menu--horizontal>.el-menu-item.is-active{
  border-bottom: 2px solid #3B73B9 !important;
}
.logo{
  width: 50px !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
