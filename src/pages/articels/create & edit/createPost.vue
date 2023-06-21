<template>
  <div class="col-md-6">
    <h2 class="my-5 px-3">New Article</h2>
  </div>
  <div class="row">
    <postForm
      @formData="createPost"
      :button-loading="loading"
      button-text="Submit"
    />
  </div>
</template>

<script>
import postForm from "./components/postForm.vue";
import { ref } from "vue";
import axios from "axios";
import { setSHow, textSHow, reloadPage } from "@/services/Postservice.js";

export default {
  name: "CreateArticels-",
  mixins: [setSHow, textSHow, reloadPage],
  components: {
    postForm,
  },
  setup() {
    const loading = ref(false);
    function createPost(formData) {
      loading.value = true;
      axios
        .post("https://api.realworld.io/api/articles", formData)
        .then(() => {
        //  console.log(resp.data);
          setSHow(true);
          textSHow("created");
          reloadPage();
          loading.value = false;
        })
        .catch(function (error) {
          console.log(error);
          console.log(formData);
        });
    }

    return { createPost, loading };
  },
};
</script>

<style></style>
