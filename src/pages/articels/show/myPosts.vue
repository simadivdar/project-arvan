<template>
  <showposts :url="url" :text="text" />
  <router-view></router-view>
</template>

<script>
import { ref } from "vue";
import { setUser } from "@/services/Authservice.js";
import Showposts from "./components/showposts.vue";
export default {
  name: "MyArticels-",
  components: {
    Showposts,
  },
  mixins: [setUser],
  setup() {
    const User = ref();
    const text=ref("My Posts");
    const url = ref();
    const username = localStorage.getItem("username");
    setUser();
  //  console.log(username);
    User.value = username;
    url.value = `https://api.realworld.io/api/articles?author=${User.value}`;
  //  console.log(url.value);
    return { url,text };
  },
};
</script>

<style></style>
