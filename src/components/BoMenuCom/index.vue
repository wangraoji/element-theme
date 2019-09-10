<template>
  <div class="BoMenuCom w100">
    <el-menu :collapse="isCollapse" class="hs-menu h100" router :default-active="defaultActive">
      <template v-for="(menu,i) of options">
        <el-menu-item
          v-if="menu.children.length === 1 && !menu.alwaysShow && !menu.hidden"
          :index="menu.path"
          :key="i"
        >
          <i class="el-icon-icon">
            <svg-icon :icon-class="menu.children[0].meta.icon" />
          </i>
          <span slot="title">{{ menu.children[0].meta.title }}</span>
        </el-menu-item>
        <el-submenu
          v-if="menu.children.length === 1 && menu.alwaysShow && !menu.hidden"
          :key="i"
          :index="i + '1'"
        >
          <template slot="title">
            <i class="el-icon-icon">
              <svg-icon :icon-class="menu.meta.icon" />
            </i>
            <span slot="title">{{ menu.meta.title }}</span>
          </template>
          <template v-for="(sub,i1) of menu.children">
            <el-menu-item v-if="!sub.children && !sub.hidden" :index="sub.path">{{ sub.meta.title }}</el-menu-item>
            <el-submenu v-if="sub.children && !sub.hidden" :index="i1 + '1'">
              <span slot="title">{{ sub.meta.title }}</span>
              <el-menu-item
                v-for="(s,si) of sub.children"
                :index="s.path"
                :key="si"
                v-if="!s.hidden"
              >{{ s.meta.title }}</el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
        <el-submenu v-if="menu.children.length > 1" :key="i" :index="menu.path">
          <template slot="title">
            <i class="el-icon-icon">
              <svg-icon :icon-class="menu.meta.icon" />
            </i>
            <span slot="title">{{menu.meta.title}}</span>
          </template>
          <template v-for="(sub,i1) of menu.children">
            <el-menu-item v-if="!sub.children && !sub.hidden" :index="sub.path">{{ sub.meta.title }}</el-menu-item>
            <el-submenu v-if="sub.children && !sub.hidden" :index="i1 + '1'">
              <span slot="title">{{ sub.meta.title }}</span>
              <el-menu-item
                v-for="(s,si) of sub.children"
                :index="s.path"
                :key="si"
                v-if="!s.hidden"
              >{{ s.meta.title }}</el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class BoMenuCom extends Vue {
  defaultActive: any = "";
  @Prop({ default: false }) isCollapse!: boolean;
  @Watch("$route")
  onRouteChanged(val: any, oldVal: any) {
    this.defaultActive = val.path;
  }
  options: any = [];
  mounted() {
    let router: any = this.$router;
    this.options = [...router.options.routes];
    this.defaultActive = this.$route.path;
  }
}
</script>

<style>
.BoMenuCom {
  height: calc(100% - 40px);
  /* height: 100%; */
}
</style>
