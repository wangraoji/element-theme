<template>
  <div class="HsM2 h100" v-loading="pageLoading">
    <HsToolBarCom :toolBarData="toolBarData" @toolBarlClick="toolBarlClick" />
    <el-row class="pd20">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <h1>基本信息</h1>
          </template>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;">
                </el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;">
                </el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h1>供应商信息</h1>
          </template>

        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h1>明细信息</h1>
          </template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { log } from "@/utils";
import { m1MockData, faMockData, filterMockData } from "@/api/mockM1Api";
@Component
export default class HsM2 extends Vue {
  @Prop({ default: null }) url!: string;
  activeNames: any = ["1"];
  tableData: any = [
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄"
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄"
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄"
    }
  ];
  // 页面加载
  pageLoading: boolean = false;
  // 工具栏数据
  toolBarData: any = [];
  // 方案list
  falistData: any = [
    {
      label: "默认方案",
      list: [],
      active: true
    }
  ];
  form: any = {
    name: "",
    region: "",
    date1: "",
    date2: "",
    delivery: false,
    type: [],
    resource: "",
    desc: ""
  };
  // 临时查询字段
  queryApi: any = {};
  // 过滤1的数据
  v1Data: any = [];
  // 过滤2的数据
  v2Data: any = [];
  // 过滤3的数据
  v3Data: any = {};
  // 过滤集合
  queryList: any = [{}];

  v1: any = "";
  v2: any = "";
  v3: any = "";
  // 是否展开更多过滤查询
  isOpenFilterList: boolean = false;
  handleChange(val: any) {
    console.log(val);
  }
  mounted() {
    // 第一波请求根据URL拿到列表数据
    if (this.url) {
      this.initData(this.url);
    }
  }
  // 工具栏事件
  toolBarlClick(e: any) {
    if (e.code === "自定通用逻辑") {
      return;
    }
    this.$emit("toolBarlClick", e);
  }
  // 第一波数据
  initData(url: string) {
    this.pageLoading = true;
    let res = m1MockData();
    this.queryApi = res.queryApi;
    this.pageLoading = false;
    this.toolBarData = res.toolbar;
    this.getfaData("根据第一波的入参");
    this.getFilterData("根据第一波的入参");
  }

  // 获取方案list
  getfaData(param: string) {
    let res = faMockData();
    res.forEach((el: any) => {
      el.active = false;
      this.falistData.push(el);
    });
  }

  // 展开更多查询
  openFilterList() {
    this.isOpenFilterList = !this.isOpenFilterList;
  }
  // 获取查询数据
  getFilterData(param: string) {
    let res = filterMockData();
    this.v1Data = res;
    log(`查询数据`, res);
  }

  // 方案点击
  faClick(item: any) {
    this.falistData.forEach((el: any) => {
      el.active = false;
    });
    item.active = true;
    log(`方案点击`, item);

    this.query();
  }

  // 字段1 change
  zd1Change(e: any) {
    this.v1Data.forEach((el: any) => {
      if (e === el.value) {
        this.v2Data = el.options2;
        this.v3Data = el.options3;
        this.v2 = "";
        this.v3 = "";
      }
    });
  }

  // 查询按钮
  query() {
    // log("v1", this.v1);
    // log("v2", this.v2);
    // log("v3", this.v3);
    let list: any = [];
    let param: any = {};
    param[this.queryApi.code1] = this.v1;
    param[this.queryApi.code2] = this.v2;
    param[this.queryApi.code3] = this.v3;
    list.push(param);
    log(list);
  }
}
</script>
<style lang="scss" scoped>
.HsM2 {
  // 我的方案
  .fa-list {
    display: flex;
    line-height: 30px;
    .list-title {
      width: 80px;
      cursor: default;
    }
    .list-data {
      flex: 1;
      display: flex;
      .fa-span {
        display: inline-block;
        line-height: 26px;
        position: relative;
        border-radius: 3px;
        padding: 0 10px;
        cursor: pointer;
        color: #2383eb;
        margin-right: 5px;
        &.active {
          background: #2383eb;
          color: #fff;
        }
      }
    }
  }
  // 快捷查询
  .query-list {
    display: flex;
    line-height: 34px;
    .list-title {
      width: 80px;
      cursor: default;
    }
    .list-data {
      flex: 1;
      display: flex;
      .list-l {
        // border: 1px solid #dcdfe6;
        width: 730px;
        padding: 0 2px;
        margin-right: 10px;
        &.open {
          position: relative;
          padding: 5px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
        }
      }
      .list-r {
        flex: 1;
      }
    }
  }
  // 展开查询
  .openList-btn {
    padding: 7px 0;
    width: 28px;
    .el-icon-d-arrow-right {
      transform: rotate(90deg);
      transition: all 0.5s;
      &.open {
        transform: rotate(-90deg);
      }
    }
  }
  // 通用
  .mr-10 {
    margin-right: 10px;
  }
  .mr-20 {
    margin-right: 20px;
  }
  .diag-icon {
    line-height: 24px !important;
  }
}
</style>

