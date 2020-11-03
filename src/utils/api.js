import axios from 'axios'
import {Message} from 'element-ui'
//封装响应信息
axios.interceptors.response.use(success => {
        if (success.status && success.status == 200 && success.data.status == 500) {//访问成功但是登录失败
            Message.error({message: success.data.msg})//显示后台传送回来的错误信息
            return;
        }
        if( success.data.msg){//如何有返回内容
            Message.success({message: success.data.msg})//显示后台传送回来的 信息
        }
        return success.data;
    }, error => {
        if (error.response.status == 504 || error.response.status == 404) {
            Message.error({message: "服务器被吃了！💂"})
        } else if (error.response.status == 403) {
            Message.error({message: "禁止访问！··"})
        } else if (error.response.status == 401) {
            Message.error({message: "尚未登录，请登录后访问！··"})
        } else {
            if (error.response.data.msg) {//data就是我们后台封装的返回类respBean，msg是其一个属性
                Message.error({message: error.response.data.msg})
            } else {
                Message.error({message: "未知错误！！！"})
            }
        }
        return
    }
)

//封装请求信息
let base='';
export const postKeyValueRequest=(url,params) => {
    return axios({
        method:"post",
        url:`${base}${url}`,
        data:params,
        transformRequest:[function (data){//默认以json格式传到服务器，需要转换为param=value这样
            let ret = '';
            for(let key in data ){
                ret += encodeURIComponent(key)+'='+encodeURIComponent(data[key])+'&'
            }
            console.log(ret);
            return ret;//此处困扰了我半天，必须返回参数串，否则后台获取不到参数——2020-09-25 下午
         }],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'//模拟表单数据格式
        }
    })
}
export const postRequest=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
}
export const getRequest=(url,params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params
    })
}
export const putRequest=(url,params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params
    })
}
export const deleteRequest=(url,params)=>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params
    })
}



// export const postKeyValueRequest = (url, params) => {
//     return axios({
//         method: 'post',
//         url: `${base}${url}`,
//         data: params,
//         transformRequest: [function (data) {
//             let ret = '';
//             for (let i in data) {
//                 ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
//             }
//             return ret;
//         }],
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     });
// }