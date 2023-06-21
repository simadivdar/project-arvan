<template>
  <div class="container-fluid w-100 h-100">
    <div class="row gy-5 d-flex justify-content-around">
      <div class="col-6"><h2>All Posts</h2></div>
      <div class="col-6">
        <div v-if="show" class="alert alert-success fade show" role="alert">
          <p>Well done! Article {{ textshow }} successfuly.</p>
        </div>
      </div>
    </div>
    <div class="row m-0">
      <div class="table-responsive ">
        <table class="table">
          <thead class="table-light">
            <tr>
              <th scope="col-1">#</th>
              <th scope="col-2">Title</th>
              <th scope="col-1">Author</th>
              <th scope="col-2">Tags</th>
              <th scope="col-2">Excerpt</th>
              <th scope="col-2">Created</th>
              <th scope="col-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(articel, index) in Articels" :key="index">
              <Table v-if="index>page-11 && index<page" :articel="articel" :index="index" />
            </tr>
          </tbody>
        </table>
      </div>
      <nav
        aria-label="Page navigation example"
        class="d-flex justify-content-center mt-5"
      >
        <ul class="pagination pagination-lg">
          <li class="page-item" v-if="pagechange > 1">
            <a
              class="page-link"
              @click="
                pagechange--,
                  setPage(pagechange),
                  $router.replace({ params: { page: pagechange } }),
                  changePage()
              "
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="(page, index) in pageNumber"
            :key="index"
          >
            <a
              class="page-link"
              @click="
                setPage(page),
                  $router.replace({ params: { page: page } }),
                  changePage()
              "
            >
              {{ page }}
            </a>
          </li>
          <li class="page-item" v-if="pagechange < pageNumber">
            <a
              class="page-link"
              @click="
                pagechange++,
                  setPage(pagechange),
                  changePage(),
                  $router.replace({ params: { page: pagechange } })
              "
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import {
  setSHow,
  textSHow,
  setPosts,
  setPage,
  reloadPage,
} from "@/services/Postservice.js";
import Table from "./components/tabulation.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "PagesPosts-",
  mixins: [setSHow, textSHow, setPosts, setPage, reloadPage],
  components: {
    Table,
  },
  setup() {
    const router = useRouter();
    const pageNumber = ref(1);
    const Articels = ref();
    const page = ref();
    const pagechange = ref();
    Articels.value = JSON.parse(localStorage.getItem("Articels"));
    setPosts();
    pageNumber.value = Math.ceil(Articels.value.length / 10);
    const show = localStorage.getItem("show");
    setSHow();
    const text = localStorage.getItem("text");
    textSHow();
    const textshow = ref(text);
    function changePage() {
      pagechange.value = localStorage.getItem("page");
      setPage();
    //  console.log(pagechange.value);
      page.value = pagechange.value * 10;
    //  console.log(page.value);
    }
    changePage();

    return {
      Articels,
      pageNumber,
      changePage,
      router,
      pagechange,
      textshow,
      show,
      setPage,
      page,
    };
  },
};
</script>

<style>

</style>
