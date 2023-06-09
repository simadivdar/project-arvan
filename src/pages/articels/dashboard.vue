<template >
  <div class="row">
    <Header1 />
  </div>
  <div class="d-flex w-100 vh-100 container-fluid p-0">
    <div class="row w-100">
      <div class="col-2">
        <Header2 />
      </div>
      <div class="col-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header1 from "@/components/Header1.vue"
import Header2 from "@/components/Header2.vue"
import { useRoute } from 'vue-router'
export default {
    name:"articels-",
    components:{
    Header1,
    Header2
    },
  setup(){
 const route=useRoute();
 return {route}}
}
</script>

<style>

</style>