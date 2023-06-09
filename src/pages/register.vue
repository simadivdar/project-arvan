<template>
  <section class="vh-100">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="bg-light mb-3">
              <div class="card-body p-5">
                <h2 class="text-center mb-5">Register</h2>
                <form>
                  <div class="form-outline mb-4">
                    <label
                      class="form-label"
                      :class="{ 'text-danger': redcolor.redColorUser }"
                      for="form3Example1cg"
                      >User</label
                    >
                    <input
                      type="text"
                      v-model.lazy="body.user.username"
                      id="form3Example1cg"
                      class="form-control form-control-lg"
                    />
                    <div class="form-text text-danger">
                      {{ errorText.usernameErrorText }}
                    </div>
                  </div>
                  <div class="form-outline mb-4">
                    <label
                      class="form-label"
                      :class="{ 'text-danger': redcolor.redColorEmail }"
                      for="form3Example3cg"
                      >Email</label
                    >
                    <input
                      type="email"
                      required
                      v-model.lazy="body.user.email"
                      id="form3Example3cg"
                      class="form-control form-control-lg"
                    />
                    <div class="form-text text-danger">
                      {{ errorText.emailErrorText }}
                    </div>
                  </div>
                  <div class="form-outline mb-4">
                    <label
                      class="form-label"
                      :class="{ 'text-danger': redcolor.redColorPassword }"
                      for="form3Example4cg"
                      >Password</label
                    >
                    <input
                      type="password"
                      v-model.lazy="body.user.password"
                      id="form3Example4cg"
                      class="form-control form-control-lg"
                    />
                    <div class="form-text text-danger">
                      {{ errorText.passwordErrorText }}
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button
                      type="button"
                      @click="validate"
                      class="btn btn-primary col mt-2"
                    >
                      Register
                    </button>
                  </div>
                  <p class="mt-3 mb-0 text-capitalize">
                    already regestered?
                    <router-link to="/login" class="fw-bold text-body"
                      ><u>Login</u></router-link
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { setAuthToken } from "@/services/Authservice.js";
import { reactive } from "vue";
import { setSHow, textSHow, reloadPage } from "@/services/Postservice.js";
export default {
  name: "Register-",
  mixins: [setAuthToken, setSHow, textSHow, reloadPage],
  setup() {
    const redcolor = reactive({
      redColorUser: false,
      redColorEmail: false,
      redColorPassword: false,
    });
    const body = reactive({
      user: {
        email: "",
        password: "",
        username: "",
      },
    });
    const errorText = reactive({
      emailErrorText: "",
      passwordErrorText: "",
      usernameErrorText: "",
    });
    function register() {
      axios
        .post("https://api.realworld.io/api/users", body)
        .then((resp) => {
          console.log("helo");
          const token = resp.data.user.token;
          setAuthToken(token);
          console.log(token);
          setSHow(true);
          textSHow("regestred");
          reloadPage();
        })

        .catch((error) => {
          console.log(error);
          console.log(body);
        });
    }
    function validate() {
      if (body.user.username === "") {
        errorText.usernameErrorText = "Required field";
        redcolor.redColorUser = true;
      } else {
        errorText.usernameErrorText = "";
      }
      if (body.user.email === "") {
        errorText.emailErrorText = "Required field";
        redcolor.redColorEmail = true;
      } else {
        errorText.emailErrorText = "";
      }
      if (body.user.password == "") {
        errorText.passwordErrorText = "Required field";
        redcolor.redColorPassword = true;
      } else {
        errorText.passwordErrorText = "";
      }
      if (
        body.user.email !== "" &&
        body.user.password !== "" &&
        body.user.username !== ""
      ) {
        register();
      }
    }

    return { body, errorText, redcolor, register, validate };
  },
};
</script>

<style></style>
