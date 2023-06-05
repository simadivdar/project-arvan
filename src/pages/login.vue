<template>
    <section class="vh-100">
        <div class="container-fluid">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-sm-6 text-black bg-light mt-5">
                    <div class="d-flex align-items-center h-custom-2 px-4 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-5">
                        <form style="width: 100rem;">
                            <h3 class="text-center fs-1 text-secondary mb-3 pb-3 text-uppercase">Login</h3>
                            <div class="form-outline mb-4">
                            <label class="form-label" :class="{'text-danger':redcolor.redColorEmail}" for="form2Example18">Email</label>
                            <input type="email" v-model="body.user.email" id="form2Example18" class="form-control  form-control-lg" />
                            <div class="form-text text-danger">
                                {{ errorText.emailErrorText }}
                            </div>
                            </div>
                            <div class="form-outline mb-4">
                            <label class="form-label" :class="{'text-danger':redcolor.redColorPassword}"  for="form2Example28">Password</label>
                            <input type="password"  v-model="body.user.password" id="form2Example28" class="form-control form-control-lg" />
                            <div class="form-text text-danger">
                                {{ errorText.passwordErrorText }}
                            </div>
                            </div>
                            <div class="d-flex justify-content-center">
                            <router-link @click="validate" class="btn btn-primary col my-2" to="/articels">Login</router-link>
                            </div>
                            <p class="mt-2 mb-4">Don't have an account? <router-link to="/register" class="fw-bold text-body">Register Now</router-link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
import { setAuthToken,setUser } from "@/services/Authservice.js";
import { reactive} from "vue";
import {setSHow ,textSHow, reloadPage} from "@/services/Postservice.js";
export default {
    name:"login-",
  mixins:[setAuthToken,setUser,setSHow ,textSHow, reloadPage],
    setup () {
      const redcolor=reactive({
          redColorEmail:false,
          redColorPassword:false
        });
        const body = reactive ({
        "user":{
        email:"",
        password:"",
        }});
        const errorText = reactive ({
        emailErrorText:"",
        passwordErrorText:"",
        });
    function login(){
        axios
        .post("https://api.realworld.io/api/users/login",body)
        .then((resp) => {
        const token = resp.data.user.token;
        setAuthToken(token);
        const username=resp.data.user.username; 
        setUser(username);
        console.log(username);
        setSHow(true);
          textSHow("conected");
          reloadPage(); 
        })

        .catch((error) => {
        console.log(error);
        });
    }
   
    
function validate() {
        if (body.user.email === "") {
          errorText.emailErrorText = "Required field";
          redcolor.redColorEmail=true;
        } else {
          errorText.emailErrorText = "";
        }
        if (body.user.password== "") {
          errorText.passwordErrorText = "Required field";
          redcolor.redColorPassword=true;
        } else {
          errorText.passwordErrorText = "";
        }
        if (body.user.email !== "" && body.user.password !== "") {
            login();
        }
      }
    return{body,login,validate,redcolor,errorText}
    }
}
</script>

<style>

</style>