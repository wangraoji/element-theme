<template>
  <div class="home h100 pd20">
    <!-- <BoListCom :data="data" /> -->
    首页
    <div style="height:1500px">测试</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component
export default class Home extends Vue {
  data: any = {
    lcfg: {
      url: "domainList",
      paramCode: "parentId"
    },
    rcfg: {
      url: "domainbolist",
      paramCode: "domainId"
    }
  };
}
</script>
<style lang="scss" scoped>
</style>

