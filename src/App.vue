<template>
  <router-view></router-view>
</template>

<script>
import { onMounted } from "vue";
import { setAuthToken } from "@/services/Authservice.js";
export default {
  name: "App",
  mixins: [setAuthToken],
  setup() {
    onMounted(() => {
      console.log("hiiii");
      const token = localStorage.getItem("token");
      setAuthToken(token);
      console.log(token);
    });
  },
};
</script>

<style>
.navbar {
  color: white;
}
</style>
