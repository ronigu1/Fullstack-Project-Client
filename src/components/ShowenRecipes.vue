<template>
    <div class="results">
        <div class="group of recipes">
            <RecipePreviewList 
                class="RecipesPreview"
                :recipes="fullRecipes.slice(retSize*5, retSize*5+5)"
                :title="title"
                :colLen = "fullRecipes.length"
            ></RecipePreviewList>
            {{retSize}}/{{maxPageF}}
            <!-- searchClickNow: {{searchClickNow}}
            max page {{maxPageF}} -->
        </div>
        <div class="buttons">
            <b-button variant="dark" 
            class="prevButton" 
            @click="prev"
            :disabled="prevDisabled"
            > Previous </b-button>
            <b-button variant="dark"
            class="nextButton" 
            @click="next"
            :disabled="nextDis"
            > Next </b-button>
        </div>
    </div>
</template>
<script>
 import RecipePreviewList from "./RecipePreviewList.vue";
 export default{ 
    name:"ShowenRecipes",
    components: {
        RecipePreviewList
    },
    props: {
        fullRecipes:{
        type: Array,
        required: true
        },
        title: {
        type: String,
        required: false
        },
        colLen: {
        type: Number,
        required: true
        },
        pageStartSearch:{
        type: Number,
        required: true
        },   
    },
    
    data(){
        return{
            fiveRecipes:this.fullRecipes.slice(this.page*5, this.page*5+5),
            page:0,
            maxPage:Math.ceil((this.fullRecipes.length/5))-1,
            prevDisabled:true,
            nextDisabled:this.nextDis,
            searchClickNow:this.pageStartSearch,
        }
    },
    computed:{
        retSize(){
            if(this.searchClickNow===0){
                return 0;                
            }
            else{return this.page}
        },
        maxPageF(){
            return Math.ceil((this.fullRecipes.length/5))-1;
        },
        nextDis(){
            console.log("maxPageF",this.maxPageF);
            console.log("this.page",this.page);

            if(this.maxPageF>0 && this.page<this.maxPageF){
                return false;
            }
             else{return true;}
          
        },

    },
    mounted() {
        console.log("mounted, this.fiveRecipes", this.fiveRecipes);
        this.maxPage = Math.ceil((this.fullRecipes.length/5))-1;

        // if(this.recipes){
        //     this.fiveRecipes = this.recipes.slice(this.page*5, this.page*5+5);
        //      console.log("mounted, this.fiveRecipes-in if:", this.fiveRecipes);
        // }
        if(this.maxPageF>0 && this.page<this.maxPageF){
            this.nextDisabled=false;
        }
        else{this.nextDisabled=true;}
        
        this.searchClickNow=this.pageStartSearch;
        console.log("mounted, this.fiveRecipes At END", this.fiveRecipes);
        this.page=0;
        console.log("mounted,  this.page",  this.page);
        console.log("mounted, maxPageF",this.maxPageF);

    },
    // computed:{
    //     nextDis(){
    //         if(this.maxPage>0){
    //             this.nextDisabled=false;
    //         }
    //     },
    // },
    methods:{
        next(){
            this.searchClickNow=1;
            console.log("next---this.fiveRecipes",this.fiveRecipes);
            console.log("page",this.page);
            console.log("maxPageF",this.maxPageF);
            // this.pageStartSearch=1;
            if(this.page<this.maxPageF){
                this.page++;
                this.fiveRecipes = this.fullRecipes.slice(this.page*5, this.page*5+5);
                // Object.assign(this.fiveRecipes, this.recipes.slice(this.page*5, this.page*5+5));
                this.prevDisabled=false;
                console.log("this.fiveRecipes",this.fiveRecipes);
            }
            if(this.page == this.maxPageF){
                this.nextDisabled=true;
            }
            console.log("next,  this.page",  this.page);
            return this.fiveRecipes;

        },
        prev(){
            if(this.page>0){
                this.page--;
                this.fiveRecipes = this.fullRecipes.slice(this.page*5, this.page*5+5);
                this.nextDisabled=false;
            }
            if(this.page === 0){
                this.prevDisabled=true;
            }
            console.log("prev,  this.page",  this.page);
            return this.fiveRecipes;
        }
      },
    }
</script>