<template>
  <div class="login h100">
    <div class="cont">
      <div class="title">登陆XXXX系统</div>
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psd">
          <el-input v-model="form.psd" type="password"></el-input>
        </el-form-item>
        <el-row class="mb-10">
          <el-button type="primary" class="w100" size="medium" @click="onReg">注册</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" class="w100" size="medium" @click="onLogin">登陆</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setToken } from "@/utils/auth";
@Component
export default class Login extends Vue {
  log: any;
  form: any = {};
  rules: any = {
    name: [this.rulesFn("请输入名称", "blur")],
    psd: [this.rulesFn("请输入密码", "blur")]
  };

  // 表单验证方法
  rulesFn(msg: any, trigger: any) {
    return { required: true, message: msg, trigger: trigger };
  }
  // 登陆
  onLogin() {
    let ruleForm: any = this.$refs.ruleForm;
    ruleForm.validate(async (valid: any) => {
      if (valid) {
        setToken("sss");
        this.$store.commit("SET_TOKEN", "sss");
        this.$router.push({ path: "/" });
      } else {
        console.log("error submit!!");
        // alert(`还有必填项没录入`);
        return false;
      }
    });
  }
  // 注册
  onReg() {}
}
</script>
<style lang="scss" scoped>
.login {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  .cont {
    color: #eee;
    height: 100%;
    width: 600px;
    padding: 160px 35px 0;
    margin: 0 auto 40px auto;
    .title {
      font-size: 26px;
      text-align: center;
      margin-bottom: 40px;
      font-weight: 700;
    }
  }

  /deep/ .el-form-item {
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 30px;
    .el-form-item__label {
      line-height: 47px;
    }
    .el-form-item__error {
      padding-top: 5px;
    }
    .el-input__inner {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: #fff;
    }
  }
  // .title {
  //   font-size: 26px;
  //   color: #eee;
  //   margin: 0 auto 40px auto;
  //   margin-top: 160px;
  //   text-align: center;
  //   font-weight: 700;
  // }
}
</style>
