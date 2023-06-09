<template>
  <div class="container-fluid w-100 h-100">
    <div class="row d-flex justify-content-around">
      <div class="col-6"><h2 class="py-4">{{ text }}</h2></div>
      <div class="col-6">
        <div v-if="show" class="alert alert-success fade show" role="alert">
          <p>Well done! Article {{ textshow }} successfuly.</p>
        </div>
      </div>
    </div>
    <div v-if="loading" class="d-flex justify-content-around text-primary">
      <div>Loading...</div>
      <div
        class="spinner-border ms-auto"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
    <div v-else class="row m-0">
      <div class="table-responsive">
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
          <div v-if="pageNumber == 0">
            <h2 class="text-center text-secondary">
              There Are No Articels Available
            </h2>
          </div>
          <tbody v-else>
            <tr v-for="(articel, index) in Articels" :key="index">
              <Table v-if="index<10" :articel="articel" :index="index" />
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="pageNumber > 1">
        <nav
          aria-label="Page navigation example"
          class="d-flex justify-content-center mt-5"
        >
          <ul class="pagination pagination-lg">
            <li class="page-item">
              <router-link
                class="page-link"
                @click="setPage(1)"
                :to="{ name: 'PagesPosts-', params: { page: 1 } }"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </router-link>
            </li>
            <li
              class="page-item"
              v-for="(page, index) in pageNumber"
              :key="index"
            >
              <router-link
                class="page-link"
                @click="setPage(page)"
                :to="{ name: 'PagesPosts-', params: { page: page } }"
              >
                {{ page }}
              </router-link>
            </li>
            <li class="page-item">
              <router-link
                class="page-link"
                @click="setPage(2)"
                :to="{ name: 'PagesPosts-', params: { page: 2 } }"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import Table from "./tabulation.vue";
import {
  setSHow,
  setPosts,
  setPage,
  textSHow,
} from "@/services/Postservice.js";
export default {
  name: "showarticels-",
  components: {
    Table,
  },
  props: {
    url: String,
    text:String,
  },
  mixins: [setSHow, setPage, setPosts, textSHow],
  setup(props) {
    const Articels = ref([]);
    const pageNumber = ref(1);
    const loading = ref(true);
    const show = localStorage.getItem("show");
    setSHow();
    console.log(show);
    const textMsg = localStorage.getItem("text");
    textSHow();
    console.log(textMsg);
    const textshow = ref(textMsg);
    onMounted(() => {
      axios
        .get(props.url)
        .then(function (response) {
          Articels.value = response.data.articles;
          console.log(response.data.articles);
          console.log(Articels.value.length);
          setPosts(Articels);
          pageNumber.value = Math.ceil(Articels.value.length / 10);
          console.log(pageNumber.value);
          loading.value = false;
        })
        .catch(function (error) {
          if (error.response.status === 403) {
            show.value = true;
          }
          console.log(error);
        });
    });
    return { Articels, pageNumber, setPage, textshow, loading, show };
  },
};
</script>

<style></style>
