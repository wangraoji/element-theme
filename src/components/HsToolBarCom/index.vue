<template>
  <div class="HsToolBarCom">
    <!-- <span class="btn one-el">新增</span> -->
    <template v-for="(item,i) of toolBarData">
      <!-- 没有分组 并且 没有icon的时候 没有下拉 -->
      <span
        v-if="!item.group && !item.icon && !item.type"
        class="btn no-group no-icon"
        :key="i"
        @click="toolBarlClick(item)"
      >{{item.text}}</span>
      <!-- 没有分组 并且 有icon的时候的时候 没有下拉 -->
      <span
        v-if="!item.group && item.icon && !item.type"
        class="btn no-group has-icon"
        :key="i"
        @click="toolBarlClick(item)"
      >
        <svg-icon :icon-class="item.icon" class="svg"/>
        <span>{{item.text}}</span>
      </span>
      <!-- 没有分组 但是有下拉框的时候 -->
      <span v-if="!item.group && item.type" class="has-type no-group">
        <el-dropdown trigger="click" @command="toolBarlClick">
          <span :key="i" class="dropdown-span">
            <span v-if="!item.icon" class="type-btn no-icon no-group">{{ item.text }}</span>
            <span v-if="item.icon" class="type-btn has-icon no-group">
              <svg-icon :icon-class="item.icon" class="svg"/>
              <span>{{ item.text }}</span>
            </span>
            <span class="type-svg no-group">
              <svg-icon icon-class="down"/>
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(op,ic) of item.options"
              :key="ic"
              :command="op"
              :disabled="op.disabled"
              :divided="op.divided"
            >{{ op.text }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <!-- 有分组的时候 -->
      <span v-if="item.group">
        <template v-for="(g,i1) of item.group">
          <!--  没有icon的时候-->
          <span
            v-if="!g.icon"
            class="btn has-group no-icon"
            :key="i1"
            @click="toolBarlClick(g)"
          >{{g.text}}</span>
          <!-- 有icon的时候-->
          <span v-if="g.icon" class="btn has-group has-icon" :key="i1" @click="toolBarlClick(g)">
            <svg-icon :icon-class="g.icon" class="svg"/>
            <span>{{g.text}}</span>
          </span>
        </template>
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import _ from "lodash";
@Component
export default class HsToolBarCom extends Vue {
  log: any;
  @Prop({
    default: () => {
      return [
        {
          text: "新增",
          code: "add"
        },
        {
          text: "编辑",
          code: "edit"
        },
        {
          text: "保存",
          code: "save"
        },
        // {
        //   text: "测试",
        //   icon: "home",
        //   code: "test"
        // },
        // {
        //   text: "下拉",
        //   type: "down",
        //   options: [
        //     {
        //       text: "提交",
        //       code: "submit"
        //     },
        //     {
        //       text: "撤销",
        //       code: "cancel"
        //     }
        //   ]
        // },
        // {
        //   text: "下拉2",
        //   type: "down",
        //   icon: "home",
        //   options: [
        //     {
        //       text: "提交",
        //       code: "submit"
        //     },
        //     {
        //       text: "撤销",
        //       code: "cancel"
        //     }
        //   ]
        // },
        // {
        //   group: [
        //     {
        //       text: "分组1"
        //       // code: "g1"
        //     },
        //     {
        //       text: "分组2",
        //       icon: "home"
        //       // code: "g2"
        //     }
        //   ]
        // },
        {
          text: "返回",
          code: "back"
        }
      ];
    }
  })
  toolBarData!: any;
  toolBarlClick(item: any) {
    if (item.code === "back") {
      this.$router.go(-1);
      return;
    }
    this.$emit("toolBarlClick", item);
  }
}
</script>

<style scoped lang="scss">
</style>
