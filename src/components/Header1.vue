<template>
  <header>
    <div class="container-fluid p-0">
      <nav
        class="navbar navbar-expand-sm bg-dark bg-body-white w-100"
        style="height: 60px"
      >
        <div class="row container-fluid ">
          <div class="col-11">
            <span class="fs-4 ms-4">Arvan Challenge</span>
            <span class="media">
              <span class="text-sm ms-4 me-1">Welcome</span>
              <span ref="root" class="text-sm"></span>
            </span>
          </div>
          <div
            class="col-1 col-ms-auto"
            id="navbarSupportedContent"
          >
            <button
              type="button"
              @click="logOut"
              class="btn btn-outline-primary btn-head"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from "vue";
import { setAuthToken, setUser } from "@/services/Authservice.js";
import { reloadPage } from "@/services/Postservice.js";
export default {
  name: "Header-",
  mixins: [setAuthToken, setUser, reloadPage],
  setup() {
    const root = ref(null);
    const User = ref();
    const username = localStorage.getItem("username");
    setUser();
  //  console.log(username);
    User.value = username;
    function logOut() {
      let token;
      setAuthToken(token);
      reloadPage();
    }
    onMounted(() => {
      root.value.innerHTML = "{{ " + User.value + " }}";
    });
    return { logOut, root, User };
  },
};
</script>

<style>
@media (max-width:576px){
  .media{
    display: block;
  }
  .btn-head{
    margin-left: -4rem;
  }
}
</style>
