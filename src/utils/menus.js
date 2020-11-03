import {getRequest} from "@/utils/api";

export const initMenu = (router, store) => {//初始化菜单
    if (store.state.routes.length > 0) {//说明有菜单，就不添加了,f5没清空数据时
        return;
    }
    getRequest("/system/config/menu").then(data => {//lambda
        if (data) {
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);//commit调用器，initRoutes方法
        }
    })
}
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(item => {
        let {//批量定义变量方法
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = item;
        if (children && children instanceof Array) {//递归children,存在且为数组时
            children = formatRoutes(children);//递归调用
        }
        let rnRoutes = {
            path: path,
            name: name,
            meta: meta,
            iconCls: iconCls,
            children: children,
            component(resolve) {//resolve
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);//拼接出相应组件，动态导入
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);//拼接出相应组件，动态导入
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);//拼接出相应组件，动态导入
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);//拼接出相应组件，动态导入
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);//拼接出相应组件，动态导入
                }
            }
        }
        fmRoutes.push(rnRoutes);
    })
    return fmRoutes;
}