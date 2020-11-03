<template>
<div>
  <el-tabs v-model="activeName" type="card"  >
    <el-tab-pane label="部门管理" name="first"><DepMana></DepMana></el-tab-pane>
    <el-tab-pane label="职位管理" name="second"><PostMana></PostMana></el-tab-pane>
    <el-tab-pane label="职称管理" name="third"><EcMana></EcMana></el-tab-pane>
    <el-tab-pane label="奖惩管理" name="fourth"><JobLevelMana></JobLevelMana></el-tab-pane>
    <el-tab-pane label="权限组" name="fifth"><PermissMana></PermissMana></el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import DepMana from "@/components/sys/DepMana";
import PostMana from "@/components/sys/PostMana";
import EcMana from "@/components/sys/EcMana";
import JobLevelMana from "@/components/sys/JobLevelMana";
import PermissMana from "@/components/sys/PermissMana";
export default {
  name: "SysBasic",
  data() {
    return{
    activeName:'first'
    }
  },
  components:{
    "PostMana":PostMana,//完整写法
    DepMana,//简写
    EcMana,
    JobLevelMana,
    PermissMana
  }
}
</script>

<style scoped>

</style>