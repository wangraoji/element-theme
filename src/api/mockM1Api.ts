// 第一波数据
export const m1MockData = () => {
    return {
        toolbar: [
            {
                text: "新增",
                code: "add"
            },
            {
                text: "集合操作",
                type: "down",
                options: [
                    {
                        text: "禁用",
                        code: "disabled"
                    },
                    {
                        text: "反禁用",
                        code: "undisabled"
                    }
                ]
            },
        ],
        queryApi: {
            code1: "xxx",
            code2: "xxx2",
            code3: "xxx3",
        },
        columns: [
            {
                name: "标题一",
                code: "code1"
            },
            {
                name: "标题二",
                code: "code2"
            },
            {
                name: "标题三",
                code: "code3"
            },
            {
                name: "标题四",
                code: "code4"
            },
            {
                name: "标题五",
                code: "code5"
            },
        ],
    }
}

// 方案list
export const faMockData = () => {
    return [
        {
            label: "方案一",
            list: [
                {
                    v1: "mmgs",
                    v2: "<",
                    v3: "sss1"
                },
            ],
        },
        {
            label: "方案二",
            list: [
                {
                    v1: "mmgs2",
                    v2: "=",
                    v3: "sss2"
                },
                {
                    v1: "mmgs",
                    v2: ">",
                    v3: "啊啊啊"
                },
                {
                    v1: "mmgs3",
                    v2: "=",
                    v3: "2019-08-20 16:38:15"
                },
            ],
        },
    ]
}


// 过滤1数据
export const filterMockData = () => {
    return [
        {
            label: "某某公司1",
            value: "mmgs",
            options2: [
                {
                    label: "大于",
                    value: ">",
                },
                {
                    label: "小于",
                    value: "<",
                },
            ],
            options3: {
                type: "input",
                label: "中文名",
                value: "xxx",
            }
        },
        {
            label: "某某公司2",
            value: "mmgs2",
            options2: [
                {
                    label: "等于",
                    value: "=",
                },
                {
                    label: "不等于",
                    value: "!=",
                },
            ],
            options3: {
                type: "dialog",
                label: "中文名",
                value: "xxx",
            }
        },
        {
            label: "某某公司3",
            value: "mmgs3",
            options2: [
                {
                    label: "包含",
                    value: "=",
                },
                {
                    label: "不包含",
                    value: "!=",
                },
            ],
            options3: {
                type: "datepicker",
                label: "中文名",
                value: "",
            }
        }
    ]
}

// let a = {
//     "toolbar": [],
//     "scheme": {
//         "queryApi": "查询Api",
//         "useApi": "使用api"
//     }
//     "search": {
//         "column查询字段": [
//             {
//                 "name": "字段名称",
//                 "code": "字段编码"
//             }
//         ],
//         "logic查询条件": [
//             {
//                 "name": "逻辑名称",
//                 "code": "逻辑编码",
//             }
//         ]
//     }
//     "table": {
//         "header表头行"{

//         }
//         "total": "数据数量"
//         "rows数据集合": []
//     }



// }