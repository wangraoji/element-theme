import { Message } from 'element-ui'
import _ from "lodash";


// 成功弹框
export function successMsg(res: any) {
    Message({
        message: res.message,
        type: "success",
        duration: 5 * 1000
    });
}



//guid
export function getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// 输出
export function log(v1?: any, v2?: any) {
    if (v2) {
        console.log(_.cloneDeep(v1), _.cloneDeep(v2));
    } else {
        console.log(_.cloneDeep(v1));
    }
}

export function setDialogCfg(data: any) {
    return {
        isShow: true,
        data: data,
        title: data.title,
        layout: data.layout
    }
}

export function getDialogList(tag: any, param?: any, title?: any) {
    let data = null;
    switch (tag) {
        case "dictList":
            data = {
                rurl: "dictList",
                title: "字段类型列表",
                layout: "table",
                param: param
            };
            break;
        case "dictChildrenList":
            data = {
                rurl: "dictChildrenList",
                title: "子字典项列表",
                layout: "table",
                param: param
            };
            break;
        case "bolist":
            data = {
                rurl: "bolist",
                title: "业务对象列表",
                layout: "table",
                param: param
            };
            break;
        case "fieldList":
            data = {
                rurl: "fieldList",
                title: "字段列表",
                layout: "table",
                param: param
            };
            break;
        case "zxt":
            data = {
                rurl: "domainList",
                lurl: "domain/list",
                code: "name",
                name: "业务领域",
                id: "parentId",
                title: "子系统列表",
                layout: "dbtable",
                param: param
            };
            break;
        case "tempList":
            data = {
                rurl: "tempList",
                title: "模板分类列表",
                layout: "table",
                param: param
            };
            break;
        case "dbList":
            data = {
                rurl: "dbList",
                title: "数据源列表",
                layout: "table",
                param: param
            };
            break;
        case "zzdx":
            data = {
                rurl: "dictChildrenList",
                title: "子字典项列表",
                layout: "table",
                param: param
            };
            break;

        case "ywdx":
            data = {
                rurl: "domainbolist",
                lurl: "domain/list",
                code: "name",
                name: "业务领域",
                id: "domainId",
                title: "业务对象列表",
                layout: "dbtable",
                param: param
            };
            break;
        case "gxlx":
            data = {
                rurl: "relationTypeList",
                lurl: "relation/type/list",
                code: "name",
                name: "关系类型",
                id: "parentId",
                title: "关系类型列表",
                layout: "dbtable",
                param: param
            };
            break;
        default:
            console.log(`没有该列表`)
    }
    return data;
}