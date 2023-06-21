<template>
  <div class="container-fluid">
    <showposts :url="url"  :text="text" />
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
import Showposts from "./components/showposts.vue";
export default {
  name:"posts-",
  components: {
    Showposts,
  },
  setup() {
    const text=ref("All Posts")
    const url = ref();
    url.value = "https://api.realworld.io/api/articles?limit=45";
  //  console.log(url.value);
    return { url,text };
  },
};
</script>

<style></style>
