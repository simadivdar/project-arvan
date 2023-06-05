<template>
<showposts :url="url" />
<router-view></router-view>
</template>

<script>
import { ref } from "vue";
import Showposts from "@/components/showposts.vue"
export default {
name:"posts-",
components:{
  Showposts
},
setup(){
    const url=ref();
    url.value="https://api.realworld.io/api/articles?limit=45";
    console.log(url.value);
    return{url};
    }
}
</script>

<style>

</style>