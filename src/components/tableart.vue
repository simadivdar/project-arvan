<template>
  <div class="table-responsive">  
  <table class="table ms-auto">
  <tbody>
    <tr>
      <td scope="col-1">{{ index+1 }}</td>
      <td scope="col-2">{{ articel.title}}</td>
      <td scope="col-1">{{ articel.author.username}}</td>
      <td scope="col-2">{{ articel.tagList}}</td>
      <td scope="col-3">{{ articel.body.split(" ").slice(0,20).join(" ")}}</td>
      <td scope="col-2"><date-format :date=" articel.createdAt.substring(0,10) "/></td>
      <td scope="col-1">
        <div class="dropdown position-absolute">
          <button type="button" class="btn btn-primary dropdown-toggle " data-bs-toggle="dropdown">
            ...
          </button>
    <ul class="dropdown-menu">
      <li><router-link  class="dropdown-item"  :to="{ name:'EditPost-' ,  params: { slug: articel.slug }}">Edit</router-link></li>
      <hr>
      <li>
        <button  class="btn dropdown-item " data-bs-toggle="modal" data-bs-target="#exampleModal" @click="setSlug(articel.slug)">Delete</button>
      </li>
    </ul>
  </div>    
      </td>
    </tr>
  </tbody>
</table>
        <div class=" modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" show>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Article</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Are you sure to delete Article?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-white" data-bs-dismiss="modal">No</button>
                <button  type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deletePost(setSlug())">Yes</button>
              </div>
            </div>
          </div>
        </div>
</div>
</template>

<script>
import axios from "axios";
import {setSHow ,textSHow,setSlug, reloadPage} from "@/services/Postservice.js"

export default {
 name:"Table-",
 mixins:[setSHow,textSHow, reloadPage,setSlug],
 props:{
    articel:Object,
    index:Number,
 },
 setup(){
 
  function deletePost() {
    const slugPost=localStorage.getItem("slug");
    console.log(slugPost)
      axios
        .delete(`https://api.realworld.io/api/articles/${slugPost}`)
          .then(function () {
            setSHow(true);
            textSHow("deleted");
            reloadPage();   })
          .catch(function (error) {
            if ( error.response.status === 403) {
              setSHow(true);
              textSHow("could not deleted because you are not the author,so NOT");
              reloadPage();
          }
            console.log(error);
        });
      }

    return {setSlug,deletePost};

 }
 
 
}
</script>

<style>

</style>