import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postKeyValueRequest} from "@/utils/api";
import {postRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import store from "./stoge";
import 'font-awesome/css/font-awesome.min.css'
import fr from "element-ui/src/locale/lang/fr";
import {initMenu} from "@/utils/menus";

Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

Vue.config.productionTip = false
Vue.use(ElementUI);

//进入页面时初始化菜单
router.beforeEach((to, from, next) => {
    if (to.path == '/') {
        next();
    } else {
        if(window.sessionStorage.getItem("user")){
            initMenu(router, store);
            next();
        }else{
            //当未登录访问页面时带上要访问的页面地址，这样当登录成功后访问目标页面
            next('/?redirect='+to.path);
        }
    }
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
