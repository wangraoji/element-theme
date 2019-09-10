
import { log } from "@/utils";
import { m1MockData, faMockData, filterMockData } from "@/api/mockM1Api";
let _this: any;
// 初始化 this
const initData = (that: any) => {
    _this = that;
    getOneData(_this.url);
}

// 第一波数据
const getOneData = (url: string) => {
    _this.pageLoading = true;
    let res = m1MockData();
    log(`第一波数据`, res);
    _this.queryApi = res.queryApi;
    _this.pageLoading = false;
    _this.toolBarData = res.toolbar;
    _this.table.columns = res.columns;
    getfaData("根据第一波的入参");
    getFilterData("根据第一波的入参");
}

// 获取方案list
const getfaData = (param: string) => {
    let res = faMockData();
    res.forEach((el: any) => {
        el.active = false;
        _this.falistData.push(el);
    });
}
// 获取查询数据
const getFilterData = (param: string) => {
    let res = filterMockData();
    _this.v1Data = res;
    log(`查询字段1下拉框数据`, res);
}

// 最终查询数据
const query = () => {
    let param: any = [];
    _this.queryList.forEach((el: any) => {
        let obj: any = {};
        obj[_this.queryApi.code1] = el.v1 || "";
        obj[_this.queryApi.code2] = el.v2 || "";
        obj[_this.queryApi.code3] = el.v3 || "";
        param.push(obj);
    });
    log(`执行查询`, param);
}




export default {
    initData,
    query,
}