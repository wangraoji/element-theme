<template>
  <div class="BoTabCom">
    <span class="on-left fl on-tab" @click="tabMove('left')">
      <svg-icon icon-class="vo_left" />
    </span>
    <span
      class="fl tab-li on-tab"
      :class="{active:home.active}"
      @click="tabClick(home)"
    >{{ home.name }}</span>
    <div class="fl tab-group h100" ref="tabGroup">
      <ul class="tab-ul fl" :style="{'margin-left':currentInx.left + 'px'}">
        <li
          class="fl tab-li on-tab"
          v-for="(tab,i) of tabs"
          :key="i"
          :class="{active:tab.active}"
          @click="tabClick(tab)"
          :ref="'tab'+i"
        >
          {{ tab.name }}
          <span class="tab-close" @click="tabClose($event,tab)">
            <svg-icon icon-class="vo_close" />
          </span>
        </li>
      </ul>
    </div>
    <el-dropdown trigger="click" class="close-btn" @command="closeAction">
      <span class="el-dropdown-link">
        关闭操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="other">关闭其他选项卡</el-dropdown-item>
        <el-dropdown-item command="all">关闭全部选项卡</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="on-right fr on-tab" @click="tabMove('right')">
      <svg-icon icon-class="vo_right" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { log } from "@/utils";
import _ from "lodash";
@Component
export default class BoTabCom extends Vue {
  // 首页tab
  home: any = {
    name: "首页",
    path: "/home",
    active: true
  };
  // 监视路由
  @Watch("$route")
  onRouteChanged(val: any, oldVal: any) {
    this.clearTabActive();
    if (val.path !== "/home") {
      let data = {
        name: val.meta.title,
        path: val.path,
        active: true,
        routeName: val.name
      };
      let inx = _.findIndex(
        this.tabs,
        (v: any) => v.routeName === data.routeName
      );
      if (inx === -1) {
        this.tabs.push(data);
      } else {
        this.$set(this.tabs[inx], "active", true);
      }
    } else {
      this.home.active = true;
    }
  }
  @Watch("tabs")
  onTabsChnaged(val: any, oldVal: any) {
    this.maxWidth = 0;
    // 给所有tab加自定义属性方便移动
    setTimeout(() => {
      _.forIn(this.$refs, (e: any, k: any) => {
        if (k !== "tabGroup") {
          if (e[0]) {
            this.maxWidth += e[0].clientWidth;
            e[0].setAttribute("left", e[0].offsetLeft);
          }
        }
      });
    }, 100);
  }
  // 其他tab
  tabs: any = [];
  // tab移动索引
  currentInx: any = {
    inx: 0,
    left: 0
  };
  // 总宽度
  maxWidth: any = 0;
  mounted() {
    // console.log(this.$refs);
    // 路由初始化
    let router: any = this.$router;
    // 如果当前不是首页
    if (router.history.current.name !== "home") {
      let data = {
        name: router.history.current.meta.title,
        path: router.history.current.path,
        active: true,
        routeName: router.history.current.name
      };
      this.tabs.push(data);
      this.home.active = false;
    }
  }
  // tab移动
  tabMove(target: any) {
    // 每次向 左|右 移动5个！
    let num = 5;
    // 左移
    if (target === "left") {
      if (this.currentInx.inx >= num) {
        this.currentInx.inx -= num;
      }
    }
    // 右移
    else {
      let tabGroup: any = this.$refs["tabGroup"];
      // 如果总宽大于盒子宽度才让移动
      if (this.maxWidth > tabGroup.clientWidth) {
        if (this.currentInx.inx + num < this.tabs.length) {
          this.currentInx.inx += num;
        }
      }
    }
    let tab: any;
    // 如果当前是0个，直接取0
    if (this.currentInx.inx === 0) {
      tab = this.$refs["tab" + this.currentInx.inx];
    } else {
      tab = this.$refs["tab" + (this.currentInx.inx - 1)];
    }
    this.currentInx.left = -tab[0].getAttribute("left");
  }
  // tab点击
  tabClick(tab: any) {
    this.clearTabActive();
    tab.active = true;
    this.$router.push(tab.path);
  }
  // 关闭tab
  tabClose(e: any, tab: any) {
    e.stopPropagation();
    let inx = this.tabs.indexOf(tab);
    this.$delete(this.tabs, inx);
    // 如果当前是选中的 需要吧选中的转移
    if (tab.active) {
      // 如果当选中不是最后一个，直接往后推
      if (inx !== this.tabs.length) {
        this.$set(this.tabs[inx], "active", true);
        this.$router.push(this.tabs[inx].path);
      }
      // 如果是第一个，直接选中变成 home
      else if (inx === 0) {
        this.$set(this.home, "active", true);
        this.$router.push(this.home.path);
      }
      // 如果不是第一个，且是最后一个，则往上推
      else {
        this.$set(this.tabs[inx - 1], "active", true);
        this.$router.push(this.tabs[inx - 1].path);
      }
    }
  }

  // 关闭操作
  closeAction(tag: any) {
    // 关闭所有
    if (tag === "all") {
      this.tabs = [];
      this.home.active = true;
      this.$router.push(this.home.path);
    }
    // 关闭其他
    else {
      // 如果当前是首页
      if (this.home.active) {
        this.tabs = [];
      } else {
        let inx = _.findIndex(this.tabs, (v: any) => v.active === true);
        let currentTab = this.tabs[inx];
        this.tabs = [];
        this.tabs.push(currentTab);
      }
    }
  }
  // 清空tab选中
  clearTabActive() {
    this.home.active = false;
    this.tabs.forEach((el: any) => {
      el.active = false;
    });
  }
}
</script>
<style lang="scss" scoped>
// 高度
$height: 36px;
// hover背景色 文本色
$hover_bgc: #f2f2f2;
$hover_color: #494949;
// 边框颜色
$bdc: 1px solid #ebeef5;
.BoTabCom {
  line-height: $height;
  border-left: $bdc;
  border-bottom: $bdc;
  // 左右箭头
  .on-left,
  .on-right {
    width: $height;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    svg {
      position: relative;
      top: 1px;
    }
  }
  .on-left {
    border-right: $bdc;
  }
  .on-right {
    border-left: $bdc;
  }

  // tab容器
  .tab-group {
    width: calc(100% - 240px);
    overflow: hidden;
    position: relative;
    .tab-ul {
      width: 10000px;
      position: absolute;
      transition: all 0.3s;
    }
  }
  .tab-li {
    user-select: none;
    line-height: 28px;
    padding: 0 10px;
    margin: 3px 5px;
    cursor: pointer;
    border: $bdc;
    .tab-close {
      margin-left: 2px;
      &:hover {
        color: red;
      }
    }
  }
  // 关闭操作
  .close-btn {
    float: right;
    .el-dropdown-link {
      outline: none;
      user-select: none;
      display: inline-block;
      cursor: pointer;
      border-left: $bdc;
      padding: 0 10px;
    }
  }
}
</style>



