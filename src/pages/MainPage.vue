<template>
  <div>
    <!-- <h1 class="title">Main Page</h1> -->
    <b-container>
      <b-row>
        <b-col>
          <h1 class="title">Main Page</h1>
        </b-col>
      </b-row>
    <!-- </b-container>
    <b-container>  -->
      <b-row class="recepies">
          <b-col cols="6" class="randomCol">
            <RecipePreviewList class="recepiesCol"
              title="Explore This Recipes" 
              :recipes=this.randomRecepies
              :colLen=recepieList
            ></RecipePreviewList>
            <b-button class="refresh" @click="updateRandomRecipes">
                get new
            </b-button>
          </b-col>
          <b-col v-if="!$root.store.username" cols="6" class="GuestCol">
                
                <router-link to="/login"><b-button>Login here</b-button></router-link>
                <router-link to="/register"><b-button>Register here</b-button></router-link>
                <div class="backimg"></div>
                <!-- <img :class="{blur:true, center:true}" src="../assets/lastViewdRecepiesBackGround.jpg"/> -->
          </b-col>
          <!-- <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link> -->
          <!-- {{ !$root.store.username }} -->
          <b-col  v-else cols="6">
            <RecipePreviewList
              title="Last Viewed Recipes" 
              :recipes=this.lastViewdRecepies
              :colLen=recepieList
              :class="{
                recepiesCol: true,
                blur: !$root.store.username,
                center: true
              }"
              disabled
            ></RecipePreviewList>
          </b-col>
      </b-row>
    </b-container>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
// import LoginPage from "./LoginPage.vue";
export default {
  components: {
    RecipePreviewList,
    // LoginPage
  },
  data(){
    return{
      randomRecepies: [],
      lastViewdRecepies: [],
      recepieList: 3
    }
  },
  mounted(){
    console.log("MainPage Mounted started")
    console.log("updateLastViewdRecepies")
    this.updateLastViewdRecepies();
    console.log("updateRandomRecipes")
    this.updateRandomRecipes();
    console.log("MainPage Mounted finised")
  },
  beforeUpdate(){
    console.log("MainPage beforeUpdate started")
    console.log("MainPage beforeUpdate finised")
  },
  methods:{
    async updateRandomRecipes() {
      // if (this.$root.store.username){
      //   console.log("this.$root.store.watchedRecipes");
      //   console.log(this.$root.store.watchedRecipes);
      //   const recipes = this.$root.store.watchedRecipes;
      //   console.log("recipes");
      //   console.log(recipes);
      //   this.randomRecepies = [];
      //   this.randomRecepies.push(...recipes);
      //   console.log("randomRecepies");
      //   console.log(this.randomRecepies);
      // }
      
  
      try {
        const response = await this.$root.apiRequest.get(
           "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
        );

        console.log(response);
        // const recipes = response.data.recipes;
        const recipes = response.data;   
           
        this.randomRecepies = [];
        this.randomRecepies.push(...recipes);
        // localStorage.setItem("randomRecepies",  JSON.stringify(this.randomRecepies));
        console.log(this.recipes);
        
        
       
      } catch (error) {
        console.log(error);
      }
      //  this.randomRecepies = JSON.parse(localStorage.getItem("randomRecepies"));
    },
    async updateLastViewdRecepies() {
      if (this.$root.store.username){
        var WatchedRecipesIds = ""
        this.$root.store.getWatchedRecipesIds().map((recipesId)=>{
          WatchedRecipesIds+=','
          WatchedRecipesIds+=recipesId
        })
        try {
          const response = await this.$root.apiRequest.get(
            '/recipes/recipesBulk',
            {
              params: {
                recipesIds: WatchedRecipesIds
              }
            }
          );
          const recipes = response.data;        
          this.lastViewdRecepies = [];
          this.lastViewdRecepies.push(...recipes);
        } catch (error) {
          console.log(error);
        }
      }
    }

  }
};
</script>

<style lang="scss" scoped>
.title{
  padding-bottom: 8px;
  font-family: ‘Merriweather’, Georgia, serif;
  text-align: center;
}

.randomCol {
    display: flex;
    flex-direction: column;
}

.refresh{
    display: block;
    margin: auto;
}

// .GuestCol{
//     display: flex;
//     flex-direction: column; 
// }

.backimg{
    height: 100%;
    background-image: url("../assets/lastViewdRecepiesBackGround.jpg");
    background-size: cover;
    // background-position: center;
    background-repeat: no-repeat;
    filter: blur(2px);
    -webkit-filter: blur(5px);
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}


// .container{
//   position: absolute;
//   top: 20%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }
// .row{
//   position: absolute;
//   top: 20%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

// .recepies{
//   padding: 0px 20px;
//   display: flex;
//   width: 100%;
// }

// .row{
//   margin: 0;
// }

// .recepiesCol {
//   padding: 0;
// }
</style>
