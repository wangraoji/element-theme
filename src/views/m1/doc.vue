<template>
  <div class="m1Doc h100">
    <el-row class="pd20">
      <h3 class="mb-10">参数</h3>
      <el-table :data="paramTable" style="width: 100%" class="mb-20">
        <el-table-column prop="name" label="参数名称" width="180"></el-table-column>
        <el-table-column prop="dec" label="说明"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="value" label="可选值"></el-table-column>
        <el-table-column prop="defaultValue" label="默认值"></el-table-column>
      </el-table>
      <h3 class="mb-10">事件</h3>
      <el-table :data="eventTable" style="width: 100%" class="mb-20">
        <el-table-column prop="name" label="事件名称" width="180"></el-table-column>
        <el-table-column prop="dec" label="说明"></el-table-column>
        <el-table-column prop="param" label="参数"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class M1Doc extends Vue {
  // 参数table
  paramTable: object[] = [
    {
      name: "url",
      dec: "第一波拉取数据的url",
      type: "string",
      value: "一",
      defaultValue: "一"
    },
    {
      name: "openAllSelect",
      dec: "是否开启表格多选",
      type: "boolean",
      value: "一",
      defaultValue: "false"
    }
  ];

  // 事件table
  eventTable: object[] = [
    {
      name: "toolBarlClick",
      dec: "工具栏点击事件",
      param: "item"
    },
    {
      name: "row-click",
      dec: "当表格某一行被点击时会触发该事件",
      param: "row, column, event"
    },
    {
      name: "row-dblclick",
      dec: "当表格某一行被双击时会触发该事件",
      param: "row, column, event"
    },
    {
      name: "selection-change",
      dec: "当表格开启多选后，选中行触发该事件",
      param: "rows"
    }
  ];
}
</script>
<style lang="scss" scoped>
.m1Doc {
  h3 {
    padding-left: 10px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
}
</style>