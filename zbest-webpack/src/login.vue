<template>
        <!-------------------login-------------------------->
    <div class="login">
        <form action="#" method="post">
            <h1><a href="index.html"><img src="img/logo.png"></a></h1>
            <p></p>
            <div class="msg-warn hide"><b></b>公共场所不建议自动登录，以防账号丢失</div>
            <p><input type="text" name="" value="" placeholder="昵称/邮箱/手机号"></p>
            <p><input type="text" name="" value="" placeholder="密码"></p>
            <p><input type="submit" name="" value="登  录"></p>
            <p class="txt"><a class="" href="reg.html">免费注册</a><a href="forget.html">忘记密码？</a></p>
        </form>
    </div>
</template>

<script>
import "./css/login.css";

export default {
  name: "login",
  components: {},
  mixins: [],
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss"></style>
