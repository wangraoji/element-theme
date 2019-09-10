<template>
  <div class="layout h100">
    <el-container class="h100">
      <el-aside class="h100" :style="{width:isCollapse ? '64px' : '200px'}">
        <div class="logo">Vosung</div>
        <BoMenuCom :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header style="height:40px">
          <BoTopCom @toggleMenu="toggleMenu" />
        </el-header>
        <BoTabCom />
        <el-main class="main">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { log } from "@/utils";
@Component
export default class Layout extends Vue {
  // 菜单是否收缩
  isCollapse: boolean = false;
  mounted() {}
  // 菜单展开收缩
  toggleMenu() {
    this.isCollapse = !this.isCollapse;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.logo {
  line-height: 39px;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
}
/deep/ .el-header {
  padding: 0;
}
/deep/ .el-aside {
  transition: all 0.5s;
}
/deep/ .el-main {
  border-left: 1px solid #ebeef5;
}
</style>
