import request from '@/utils/request'
import server from "@/utils/api";
let api = server.api;

export function a2GetLeftData(url: any) {
    return request({
        url: api + url,
        method: 'post',
        data: {
            param: {}
        }
    })
}

let commonApiUrl: any = {

}

// 服务1的接口
export function commonApi(code: any, data: any) {
    return request({
        url: api + commonApiUrl[code],
        method: 'post',
        data: data
    })
}


let getByIdUrl: any = {
    // 工具栏按钮
    opreation: "bindAu/opreation/select?boId="
};

// 服务1的get Id
export function getById(url: any, id: any) {
    return request({
        url: api + getByIdUrl[url] + id,
        method: 'post'
    })
}

// 岗位汇报体系 getlist
export function queryPositionThreeAndSearch(params: any) {
    return request({
        url: api + "positionController/queryPositionThreeAndSearch",
        method: 'get',
        params: params
    })
}

