<template>
  <el-dialog
    :title="dialogCfg.title"
    class="HsDialogCom"
    :visible.sync="dialogCfg.isShow"
    :close-on-click-modal="false"
    width="50%"
    append-to-body
  >
    <el-row class="toolbar">
      <span @click="backData">返回数据</span>
      <span @click="dialogCfg.isShow = false">退出</span>
    </el-row>
    <el-row class="main">
      <el-col :span="6" class="leftCol" v-if="dialogCfg.layout==='dbtable'">
        <el-row>
          <el-table
            :data="ltable"
            highlight-current-row
            :height="'500px'"
            @current-change="lhandleCurrentChange"
            ref="ltable"
          >
            <el-table-column :prop="dialogCfg.data.code" :label="dialogCfg.data.name"></el-table-column>
          </el-table>
        </el-row>
      </el-col>
      <el-col :span="6" class="leftCol" v-if="dialogCfg.layout==='trellAndtable'">
        <el-row>
          <el-tree
            :data="treedata"
            :props="dialogCfg.data.defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-row>
      </el-col>
      <el-col :span="dialogCfg.layout==='table'? 24 : 18">
        <el-table
          :data="tableData.data"
          highlight-current-row
          v-loading="onLoading"
          border
          :height="'500px'"
          style="width: 100%"
          @current-change="(v)=>rSelectRow = v"
          @row-dblclick="handleRowDblclick"
          :class="{bld:dialogCfg.layout!=='table'}"
        >
          <el-table-column
            v-for="(column,index) in tableData.columns"
            :key="index"
            :prop="column.columnCode"
          >
            <!-- :width="column.columnName.length > 3 ? column.columnName.length * 20 : 80" -->
            <template slot="header" slot-scope="slot">
              <span class="yichu" :title="column.columnName">{{column.columnName}}</span>
            </template>
            <template slot-scope="scope">
              <span
                class="yichu"
                :title="scope.row[column.columnCode]"
              >{{ scope.row[column.columnCode] === "Y" ? "是" : scope.row[column.columnCode] === "N" ? "否" : scope.row[column.columnCode] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="text-right"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
          :current-page="pageCfg.page"
          :page-sizes="pagination.pages"
          :page-size="pageCfg.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { commonApi, a2GetLeftData } from "@/api/comApi";
import { log } from "@/utils";
@Component
export default class HsDialogCom extends Vue {
  @Prop({
    default: () => {
      return {
        isShow: false,
        // 展示显示  table 单表, dbtable 双表 ,trellAndtable 树加表格
        layout: "table"
      };
    }
  })
  dialogCfg!: any;
  onLoading: boolean = false;
  @Watch("dialogCfg", { deep: true })
  dialogCfgChnage(newV: any, oldV: any) {
    if (newV.isShow) {
      if (newV.layout !== "table") {
       
        this.a2GetLeftDataFn(newV.layout, newV.data.lurl);
      } else {
        this.pageCfg = {
          pageNum: 1,
          pageSize: 10
        };
        this.getListFn(newV.data.param || {});
      }
    }
  }

  log: any;
  // tree 数据
  treedata: any = [];

  // 表格数据
  tableData: any = {
    data: [],
    columns: []
  };
  rSelectRow: any = null;
  // 分页数据
  pagination: any = {
    pages: [10, 20],
    total: 0
  };
  pageCfg: any = {
    pageNum: 1,
    pageSize: 10
  };

  // 左边表数据
  ltable: any = [];
  // 初始化
  mounted() {
    // if (this.dialogCfg.url) {
    //   // this.getListFn(this.pageCfg);
    //   // this.log(1);
    // }
  }
  // 左边表点击
  lhandleCurrentChange(row: any) {
    if (row) {
      let param: any = {};
      param[this.dialogCfg.data.id] = row.id;
      // if (this.dialogCfg.data.code1) {
      //   param[this.dialogCfg.data.code1] = "N";
      // }
      // log(`kanakaa`,param)
      this.getListFn(param);
    }
  }
  // 左边树点击
  handleNodeClick(node: any) {
    let param: any = {};
    param[this.dialogCfg.data.id] = node.id;
    this.getListFn(param);
  }
  // 分页
  pageSizeChange(val: any) {
    this.pageCfg.pageSize = val;
    this.getListFn(this.dialogCfg.data.param || {});
  }
  // 分页
  currentPageChange(val: any) {
    this.pageCfg.pageNum = val;
    this.getListFn(this.dialogCfg.data.param || {});
  }
  // 表格行双击
  handleRowDblclick(row: any) {
    this.backData();
  }

  // 返回数据
  backData() {
    if (!this.rSelectRow) {
      alert(`还没选中数据`);
      return false;
    }
    this.$emit("backData", this.rSelectRow);
  }

  // 获取list
  async getListFn(body: any) {
    this.onLoading = true;
    this.tableData.columns = [];
    let res: any = await commonApi(this.dialogCfg.data.rurl, {
      page: this.pageCfg.pageNum,
      pageSize: this.pageCfg.pageSize,
      param: body
    });
    this.onLoading = false;
    if (res.flag) {
      this.tableData.columns = res.data.columns;
      this.tableData.data = res.data.rows;
      this.pagination.total = res.data.total;
    }
  }

  // 获取左边数据
  async a2GetLeftDataFn(layout: string, url: any) {
    let res: any = await a2GetLeftData(url);
    if (layout === "dbtable") {
      if(res){
        this.ltable = res.data.rows;
        let ltable: any = this.$refs.ltable;
        ltable.setCurrentRow(res.data.rows[0]);
      }
      // this.ltable = res.body;
      // let ltable: any = this.$refs.ltable;
      // ltable.setCurrentRow(res.body[0]);
    } else {
      this.treedata = res.body;
    }
  }
}
</script>