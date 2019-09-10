<template>
  <div class="BoTopCom h100">
    <div class="top-menu icon-color fl" @click="toggleMenu">
      <span>
        <svg-icon icon-class="menu" />
      </span>
    </div>
    <div>
      <el-select v-model="theme" placeholder="请选择系统主题" @change="toggleTheme">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { log } from "@/utils";
@Component
export default class BoTopCom extends Vue {
  theme: string = "default";
  options: any = [
    {
      value: "default",
      label: "默认主题"
    },
    {
      value: "luomu",
      label: "薄暮主题"
    },
    {
      value: "jiangzi",
      label: "酱紫主题"
    },
    {
      value: "rimu",
      label: "日暮主题"
    }
  ];
  mounted() {
    // console.log(1);
  }
  toggleMenu() {
    this.$emit("toggleMenu");
  }
  // 主题切换
  toggleTheme() {
    // this.$emit("toggleTheme", this.theme);
    document.getElementsByTagName('body')[0].className = 'theme-'+ this.theme;
  }
}
</script>


