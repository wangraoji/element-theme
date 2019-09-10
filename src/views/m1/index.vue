<template>
  <div class="m1 h100">
    <HsM1 :url="'mb1'" openAllSelect/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class M1 extends Vue {
  rowClick(row:any,col:any,event:any){
    // console.log(`测试一下`);
    // console.log(row);
    // console.log(col);
    // console.log(event);
  }
}
</script>
<style lang="scss" scoped>
</style>

