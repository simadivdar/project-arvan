<template>
  <div class="container">
    <form @submit.prevent="validate" class="px-4">
      <div class="row d-flex">
        <div class="col gx-3" style="width: 100rem">
          <div>
            <label class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Title"
              v-model.lazy.trim="form.article.title"
            />
            <div class="form-text text-danger">
              {{ errorText.titleErrorText }}
            </div>
          </div>
          <div>
            <label class="form-label">Description</label>
            <input
              type="text"
              class="form-control"
              placeholder="Description"
              v-model.lazy.trim="form.article.description"
            />
            <div class="form-text text-danger">
              {{ errorText.descriptionErrorText }}
            </div>
          </div>
          <div>
            <label class="form-label">Body</label>
            <textarea
              class="form-control"
              rows="8"
              v-model.lazy.trim="form.article.body"
            ></textarea>
            <div class="form-text text-danger">
              {{ errorText.bodyErrorText }}
            </div>
          </div>
        </div>
        <div class="col ms-auto gx-3" style="width: 24rem">
          <div class="px-4">
            <label class="form-label">Taglist</label>
            <input
              type="text"
              class="form-control"
              placeholder="New tag"
              v-model.lazy.trim="form.article.tagList"
              style="width: 250px"
            />
            <div class="form-text text-danger">
              {{ errorText.tagListErrorText }}
            </div>
            <div
              class="border border-success py-4 border-opacity-25 rounded"
              style="width: 250px"
            >
              <div
                v-for="(tag, index) in sortedArray()"
                :key="index"
                class="form-check"
              >
                <input
                  class="form-check-input bg-light ms-1"
                  type="checkbox"
                  :value="tag"
                  v-model="listTags"
                  id="tag"
                />
                <label class="form-check-label ms-2" for="tag">
                  {{ tag }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-4">
        <button
          type="submit"
          class="btn btn-primary col-auto"
          :disabled="buttonLoading"
        >
          <div
            v-if="buttonLoading"
            class="spinner-border spinner-border-sm"
            role="status"
          ></div>
          {{ buttonText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import axios from "axios";

export default {
  name: "formpost-",
  props: {
    buttonLoading: Boolean,
    buttonText: String,
    post: Object,
  },
  setup(props, { emit }) {
    const listTags = ref([]);
    const form = reactive({
      article: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
    });
    form.article.tagList = listTags.value;

    const errorText = reactive({
      titleErrorText: "",
      bodyErrorText: "",
      descriptionErrorText: "",
      tagListErrorText: "",
    });
    getTagList();
    function setInput() {
      if (props.post !== undefined) {
        form.article.title = props.post.value.title;
        form.article.description = props.post.value.description;
        form.article.body = props.post.value.body;
        form.article.tagList = props.post.value.tagList;
      }
    }
    setInput();
    const tags = ref([]);
    function getTagList() {
      axios
        .get("https://api.realworld.io/api/tags")
        .then((resp) => {
        //  console.log(resp.data);
          tags.value = resp.data.tags;
        //  console.log(tags.value);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    function validate() {
      if (form.article.title === "") {
        errorText.titleErrorText = "Required field";
      } else {
        errorText.titleErrorText = "";
      }
      if (form.article.description === "") {
        errorText.descriptionErrorText = "Required field";
      } else {
        errorText.descriptionErrorText = "";
      }
      if (form.article.body === "") {
        errorText.bodyErrorText = "Required field";
      } else {
        errorText.bodyErrorText = "";
      }
      if (form.article.tagList === "") {
        errorText.tagListErrorText = "Required field";
      } else {
        errorText.tagListErrorText = "";
      }

      if (
        form.article.title !== "" &&
        form.article.body !== "" &&
        form.article.description !== "" &&
        form.article.tagList !== ""
      ) {
        form.article.tagList = listTags.value;
        emit("formData", form);
      }
    }
    function sortedArray() {
      return tags.value.sort((a, b) => (a > b ? 1 : -1));
    }
    return { form, getTagList, listTags, sortedArray, validate, errorText };
  },
};
</script>

<style></style>
