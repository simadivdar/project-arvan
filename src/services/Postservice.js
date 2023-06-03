
export const setSHow = (show) => {
    if(show){
    localStorage.setItem("show",show);
    }else{
        localStorage.getItem("show");
        localStorage.removeItem("show");
    }
};

export const reloadPage=() => {
window.location.reload();
}

export const textSHow = (text) => {
    if(text){
    localStorage.setItem("text",text);
    }else{
        localStorage.getItem("text");
        localStorage.removeItem("text");
    }
};

export const setSlug = (slug) => {
    if(slug){
    localStorage.setItem("slug",slug);
    }else{
        localStorage.getItem("slug");
    }
};
export const setPosts= (Articels) => {
    if(Articels){
    localStorage.setItem("Articels",JSON.stringify(Articels.value));
    console.log(Articels);
    }else{
        localStorage.getItem("Articels");
    }
};
export const setPage = (page) => {
    if(page){
    localStorage.setItem("page",page);
    console.log(page)
    }else{
        localStorage.getItem("page");
        localStorage.removeItem("page");
    }
};