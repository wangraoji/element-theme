<template>
  <div class="HsM1 h100" v-loading="pageLoading">
    <HsToolBarCom :toolBarData="toolBarData" @toolBarlClick="toolBarlClick" />
    <el-row class="main">
      <div class="fa-list mb-10">
        <div class="list-title">我的方案：</div>
        <div class="list-data">
          <span
            class="fa-span"
            :class="{active:item.active}"
            v-for="(item,i) of falistData"
            :key="i"
            @click="faClick(item)"
          >{{ item.label }}</span>
        </div>
      </div>
      <div class="query-list mb-10">
        <div class="list-title">快捷查询：</div>
        <div class="list-data">
          <div class="list-l" :class="{open:isOpenFilterList}">
            <template v-for="(query,i) of queryList">
              <div v-if="i===0 || isOpenFilterList">
                <el-select
                  v-model="query.v1"
                  placeholder="请选择字段1"
                  @change="zd1Change($event,query)"
                  class="mr-10"
                  style="width:200px"
                >
                  <el-option
                    v-for="op1 of v1Data"
                    :key="op1.value"
                    :label="op1.label"
                    :value="op1.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="query.v2"
                  placeholder="请选择字段2"
                  class="mr-10"
                  style="width:150px"
                >
                  <el-option
                    v-for="op2 of query.v2Data"
                    :key="op2.value"
                    :label="op2.label"
                    :value="op2.value"
                  ></el-option>
                </el-select>
                <!-- 默认 || input -->
                <el-input
                  v-if="!query.v3Data.type || query.v3Data.type === 'input'"
                  v-model="query.v3"
                  style="width:300px"
                  placeholder="请输入字段3"
                  class="mr-10"
                ></el-input>
                <!-- 弹框 -->
                <el-input
                  v-if="query.v3Data.type === 'dialog'"
                  v-model="query.v3"
                  readonly
                  style="width:300px"
                  placeholder="请选择字段3"
                  class="mr-10"
                >
                  <i slot="suffix" class="el-input__icon el-icon-search diag-icon"></i>
                </el-input>
                <!-- 时间 -->
                <el-date-picker
                  v-model="query.v3"
                  v-if="query.v3Data.type === 'datepicker'"
                  class="mr-10"
                  style="width:300px"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
                <el-button
                  class="openList-btn"
                  @click="isOpenFilterList = !isOpenFilterList"
                  v-if="i===0"
                >
                  <i class="el-icon-d-arrow-right" :class="{open:isOpenFilterList}"></i>
                </el-button>
                <el-button class="openList-btn" @click="deleteTj(i)" v-if="i!==0">
                  <i class="el-icon-remove-outline"></i>
                </el-button>
              </div>
            </template>
            <el-dropdown v-if="isOpenFilterList" trigger="click" @command="addTj">
              <span class="el-dropdown-link">
                <i class="el-icon-circle-plus-outline"></i>
                添加条件
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="it of v1Data"
                  :command="it.value"
                  :key="it.value"
                >{{ it.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="list-r">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="primary" @click="programDialog = true">保存</el-button>
            <el-button type="primary" @click="resetTj">重置</el-button>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <el-table
        :data="table.data"
        border
        style="width: 100%"
        highlight-current-row
        :height="'calc(100% - 90px - 32px)'"
        @row-click="rowClick"
        @row-dblclick="rowDblClick"
        @selection-change="rowSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
          align="center"
          v-if="openAllSelect || typeof this.openAllSelect === 'string'"
        ></el-table-column>
        <el-table-column v-for="h of table.columns" :key="h.code" :prop="h.code" :label="h.name"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="text-right"
        @size-change="pageChange('size',$event)"
        @current-change="pageChange('current',$event)"
        :current-page="pageCfg.page"
        :page-sizes="pageCfg.sizes"
        :page-size="pageCfg.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCfg.total"
      ></el-pagination>
    </el-row>
    <!-- 保存方案 -->
    <el-dialog title="保存方案" :visible.sync="programDialog" width="400px">
      <el-form :model="programForm" label-width="80px">
        <el-form-item label="方案名称">
          <el-input v-model="programForm.label"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="programDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveTj">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import my from "./methods";
import { log } from "@/utils";
import { __assign } from "tslib";
@Component
export default class HsM1 extends Vue {
  @Prop({ default: null }) url!: string;
  @Prop() openAllSelect!: boolean;
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
  // 临时查询字段
  queryApi: any = {};
  // 过滤1的下拉框数据
  v1Data: any = [];
  // 默认方案
  defaultQuery: object = {
    v1: "",
    v2: "",
    v3: "",
    v3Data: {}
  };
  // 过滤默认集合
  queryList: any = [__assign({}, this.defaultQuery)];
  // 是否展开更多过滤查询
  isOpenFilterList: boolean = false;

  // 保存方案弹框
  programDialog: boolean = false;
  programForm: any = {};

  // 表格数据
  table: object = {
    columns: [],
    data: [
      {
        code1: "行一数据一",
        code2: "行一数据二",
        code3: "行一数据三",
        code4: "行一数据四",
        code5: "行一数据五"
      },
      {
        code1: "行二数据一",
        code2: "行二数据二",
        code3: "行二数据三",
        code4: "行二数据四",
        code5: "行二数据五"
      }
    ]
  };

  // 分页数据
  pageCfg: object = {
    sizes: [10, 30, 50],
    size: 10,
    page: 1,
    total: 30
  };
  mounted() {
    // 第一波请求根据URL拿到列表数据
    if (this.url) {
      // 初始化数据
      my.initData(this);
    }
  }

  // 工具栏事件
  toolBarlClick(e: any) {
    if (e.code === "自定通用逻辑") {
      return;
    }
    // 导出工具栏
    this.$emit("toolBarlClick", e);
  }

  // 方案点击
  faClick(item: any) {
    this.isOpenFilterList = false;
    this.falistData.forEach((el: any) => {
      el.active = false;
    });
    item.active = true;
    let tempArr: object[] = [];
    item.list.forEach((e: any) => {
      let obj: any = {};
      this.v1Data.forEach((e1: any) => {
        if (e.v1 === e1.value) {
          obj.v1 = e.v1;
          obj.v2Data = e1.options2;
          obj.v3Data = e1.options3;
          obj.v2 = e.v2;
          obj.v3 = e.v3;
        }
      });
      tempArr.push(obj);
    });
    // 默认方案为用户自选查询，不自动查询
    if (item.label === "默认方案") {
      this.queryList = [__assign({}, this.defaultQuery)];
    } else {
      this.queryList = [...tempArr];
      this.query();
    }
  }

  // 添加条件
  addTj(e: any) {
    let obj: any = {};
    this.v1Data.forEach((el: any) => {
      if (e === el.value) {
        obj.v1 = e;
        obj.v2Data = el.options2;
        obj.v3Data = el.options3;
        obj.v2 = "";
        obj.v3 = "";
      }
    });
    this.queryList.push(obj);
  }

  // 字段1 change
  zd1Change(e: any, query: any) {
    this.v1Data.forEach((el: any) => {
      if (e === el.value) {
        query.v2Data = el.options2;
        query.v3Data = el.options3;
        query.v2 = "";
        query.v3 = "";
      }
    });
  }

  // 删除条件
  deleteTj(i: number) {
    this.$delete(this.queryList, i);
  }

  // 重置条件
  resetTj() {
    this.queryList = [__assign({}, this.defaultQuery)];
  }

  // 保存条件
  saveTj() {
    this.programForm.list = [];
    let flag = true;
    this.queryList.forEach((el: any) => {
      if (el.v1 === "") {
        flag = false;
      }
      this.programForm.list.push({
        v1: el.v1,
        v2: el.v2,
        v3: el.v3
      });
    });
    if (flag) {
      this.falistData.forEach((el: any) => {
        el.active = false;
      });
      this.programForm.active = true;
      this.falistData.push(this.programForm);
      this.programDialog = false;
      this.programForm = {};
    } else {
      alert(`字段1不能为空值`);
    }
  }

  // 分页按钮
  pageChange(t: string, v: any) {
    console.log(`分页t`, t);
    console.log(`分页v`, v);
  }

  // 表格行单击
  rowClick(row: any, column: any, event: any) {
    this.$emit("row-click", row, column, event);
  }

  // 表格行双击
  rowDblClick(row: any, column: any, event: any) {
    this.$emit("row-dblclick", row, column, event);
  }

  // 表格行多选
  rowSelectionChange(v: any) {
    this.$emit("selection-change", v);
  }

  // 查询按钮
  query() {
    my.query();
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

