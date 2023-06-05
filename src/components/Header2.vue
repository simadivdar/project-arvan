<template>
    <div class="bg-primary h-100" >
        <ul class="nav flex-column nav-pills">
            <span class="text-white fs-5 text-sm ps-3 py-2">Post</span>
            <li class="nav-item">
                <router-link to="/articels" class="nav-link text-white ps-4" data-toggle="pill">All Articles</router-link>
            </li>
            <li class="nav-item" >
                <router-link :to="{name:'MyArticels-'}"  class="nav-link text-white ps-4" data-toggle="pill">My Articles</router-link>
            </li>
            <li class="nav-item" >
                <router-link :to="{name:'CreateArticels-'}"  class="nav-link text-white ps-4" data-toggle="pill">New Article</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name : 'Header2-',
};
</script>

<style >
 .router-link-exact-active {
    background-color:rgba(246, 244, 240, 0.245) !important;
}

</style>