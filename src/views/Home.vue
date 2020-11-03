<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">微人事</div>
        <el-dropdown class="homeDropdown" @command="commandHandder">
          <span class="el-dropdown-link">
            {{ user.name }}<i><img :src="user.userface" alt="用户"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="center">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!--版本1-->
          <!--    <el-menu @select="handeSelect">
                <el-submenu index="1">
                  <template slot="title">
                    <i></i>
                    <span>菜单</span>
                  </template>
                  <el-menu-item index="/test1">选项1</el-menu-item>
                  <el-menu-item index="/test2">选项2</el-menu-item>
                </el-submenu>
              </el-menu>-->
          <!--版本2-->
          <!--<el-menu @select="handeSelect">
            <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="sub.path" v-for="(sub,subindex) in item.children" :key="subindex">{{
                  sub.name
                }}
              </el-menu-item>
            </el-submenu>
          </el-menu>-->
          <!--版本3-->
          <el-menu @select="handeSelect" unique-opened>
            <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
              <template slot="title">
                <i :class="item.iconCls" style="margin-right: 5px;color: #ff8222"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="sub.path" v-for="(sub,subindex) in item.children" :key="subindex">{{
                  sub.name
                }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path !='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view/>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path =='/home'">
            欢迎来到微人事！
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home.vue",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    }
  }, computed: {
    routes() {
      return this.$store.state.routes;//状态管理中寸的路由信息
    }
  },
  methods: {
    handeSelect(index, indexPath) {//idnex是选中菜单项的index，indexPath是从父菜单到子菜单的完整路径
      this.$router.replace(index);
    },
    commandHandder(command) {
      if (command == 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest("/logout");//注销请求
          window.sessionStorage.removeItem("user");//移除本地seesion中的用户信息
          //删除vuex中的菜单信息
          this.$store.commit('initRoutes', []);//commit调用器，initRoutes方法
          this.$router.replace("/")//路由到登录页面
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });


      }
    }
  }
}
</script>

<style scoped>
.homeWelcome{
  font-size: 50px;
  font-family: 华文行楷;
  color: #2e62ff;
  margin-top: 50px;
  text-align: center;
}
.homeHeader {
  background-color: #3a8ee6;
  display: flex; /*弹性布局*/
  align-items: center; /*在竖轴上居中*/
  justify-content: space-between; /*空白内容居中*/
  padding: 0px 12px; /**/
  box-sizing: border-box;
}

.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #f0f7ff;
}

.homeDropdown {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>