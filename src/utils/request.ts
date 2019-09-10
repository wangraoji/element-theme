import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_URL, // api 的 base_url
    timeout: 5000 // 请求超时时间
})
// console.log(111111111);
// console.log(process.env.VUE_APP_URL);
// request拦截器
service.interceptors.request.use(
    config => {
        // if (store.getters.token) {
        // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        // }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data;
        if (res.flag) {
            return res;
        } else {
            console.log(`查看错误输出`, res)
            Message({
                message: res.message,
                type: "error",
                duration: 5 * 1000
            });
            return false;
        }
        // console.log(`看输出`, res);
        //
        // if (res.header.code) {
        //     if (res.header.code === "200") {
        //         return response.data
        //     } else {
        //         console.log(`请求发生错误--------------beg`)
        //         console.log(res);
        //         console.log(`请求发生错误--------------end`)
        //         Message({
        //             message: res.header.message,
        //             type: 'error',
        //             duration: 5 * 1000
        //         })
        //         return Promise.reject('error')
        //     }
        // } else {
        //     let msg = "";
        //     res.body.forEach((el: any) => {
        //         msg += "<p>" + el.message + "</p>"
        //     })
        //     Message({
        //         dangerouslyUseHTMLString: true,
        //         message: msg,
        //         duration: 5 * 1000
        //     })
        //     return response.data;
        // }
        // if (res.header.code === "200") {
        //     return response.data
        // } else {
        //     console.log(`请求发生错误--------------beg`)
        //     console.log(res);
        //     console.log(`请求发生错误--------------end`)
        //     if (res.body.length && res.body.length > 0) {
        //         let msg = "";
        //         res.body.forEach((el: any) => {
        //             msg += "<p>" + el.message + "</p>"
        //         })
        //         Message({
        //             dangerouslyUseHTMLString: true,
        //             message: msg,
        //             type: 'error',
        //             duration: 5 * 1000
        //         })
        //     } else {
        //         Message({
        //             message: res.header.message,
        //             type: 'error',
        //             duration: 5 * 1000
        //         })
        //     }
        //     // let msg = "";
        //     // if (res.body.length > 0) {
        //     //     res.body.forEach((el: any) => {
        //     //         msg += "<p>" + el.message + "</p>"
        //     //     })
        //     //     Message({
        //     //         dangerouslyUseHTMLString: true,
        //     //         message: msg,
        //     //         type: 'error',
        //     //         duration: 5 * 1000
        //     //     })
        //     // } else {
        //     //     Message({
        //     //         message: res.header.message,
        //     //         type: 'error',
        //     //         duration: 5 * 1000
        //     //     })
        //     // }
        //     return false
        // }
        // if (res.code !== 20000) {
        //     Message({
        //         message: res.message,
        //         type: 'error',
        //         duration: 5 * 1000
        //     })

        //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //         MessageBox.confirm(
        //             '你已被登出，可以取消继续留在该页面，或者重新登录',
        //             '确定登出',
        //             {
        //                 confirmButtonText: '重新登录',
        //                 cancelButtonText: '取消',
        //                 type: 'warning'
        //             }
        //         ).then(() => {
        //             store.dispatch('FedLogOut').then(() => {
        //                 location.reload() // 为了重新实例化vue-router对象 避免bug
        //             })
        //         })
        //     }
        //     return Promise.reject('error')
        // } else {
        // return response.data
        // }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: `没有请求到数据`,
            type: 'error',
            duration: 5 * 1000
        })
        return false
    }
)

export default service;