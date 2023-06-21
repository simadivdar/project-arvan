<template>
  <div v-if="pageLoading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

  <div v-else>
    <div>
      <div class="col">
        <div v-if="show" class="col alert alert-danger fade show" role="alert">
          <p>Failed! Because you are not the author of this article.</p>
        </div>
        <h2 class="my-5 px-3">Edit Article</h2>
      </div>
    </div>
    <div class="row">
      <postForm
        @formData="updatePost"
        :button-loading="loading"
        button-text="Edit Post"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import postForm from "./components/postForm.vue";
import { reactive, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { setSHow, textSHow, reloadPage } from "@/services/Postservice.js";

export default {
  name: "Editpost-",
  mixins: [setSHow, textSHow, reloadPage],
  components: {
    postForm,
  },
  setup() {
    const show = ref(false);
    const loading = ref(false);
    const pageLoading = ref(true);
    const post = reactive({});
    const route = useRoute();
  //  console.log(route.params);
    function getPost() {
      axios
        .get(`https://api.realworld.io/api/articles/${route.params.slug}`)
        .then(function (response) {
          post.value = response.data.article;
          //console.log(post.value);
          pageLoading.value = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getPost();

    function updatePost(formData) {
      loading.value = true;
      axios
        .put(
          `https://api.realworld.io/api/articles/${route.params.slug}`,
          formData
        )
        .then(function () {
          loading.value = false;
          setSHow(true);
          textSHow("updated");
          reloadPage();
        })
        .catch(function (error) {
          if (error.response.status === 403) {
            show.value = true;
          }
          console.log(error);
        });
    }

    return { updatePost, show, loading, post, pageLoading };
  },
};
</script>

<style></style>
