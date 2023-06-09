<template>
  <div class="d-flex flex-column text-center mt-5">
    <h1>Welcome in Arvan challenge</h1>
    <button type="button" class="btn btn-primary col mt-2">
      <router-link class="text-white" to="/login">log in</router-link>
    </button>
    <button type="button" class="btn btn-primary col mt-2">
      <router-link class="text-white" to="/register">register</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: "Welcome-",
};
</script>

<style></style>
