<template>
<showposts/>
<router-view></router-view>
</template>

<script>
import Showposts from "@/components/showposts.vue"
export default {
name:"posts-",
components:{
  Showposts
}
}
</script>

<style>

</style>