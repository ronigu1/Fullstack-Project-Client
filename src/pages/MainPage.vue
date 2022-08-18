<template>
  <div class="container">
    <!-- <h1 class="title">Main Page</h1> -->
    <b-container>
      <b-row>
          <h1 class="title">Main Page</h1>
      </b-row>
      <b-row class="recepies">
      <b-col>
        <RecipePreviewList class="recepiesCol"
          title="Explore This Recipes" 
          :recipes=this.randomRecepies
          :colLen=recepieList
        ></RecipePreviewList>
      </b-col>
      <b-col>
        <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>
        <!-- {{ !$root.store.username }} -->
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
export default {
  components: {
    RecipePreviewList
  },
  data(){
    return{
      randomRecepies: [],
      lastViewdRecepies: [],
      recepieList: 3
    }
  },
  mounted(){
    this.updateLastViewdRecepies();
    this.updateRandomRecipes();
  },
  computed:{
    // updateLastViewdRecepies();
  },
  methods:{
    async updateRandomRecipes() {
      if (this.$root.store.username){
        console.log("this.$root.store.watchedRecipes");
        console.log(this.$root.store.watchedRecipes);
        const recipes = this.$root.store.watchedRecipes;
        console.log("recipes");
        console.log(recipes);
        this.randomRecepies = [];
        this.randomRecepies.push(...recipes);
        console.log("randomRecepies");
        console.log(this.randomRecepies);
      }
      // try {
      //   const response = await this.axios.get(
      //     this.$root.store.server_domain + "/recipes/random",
      //     // "https://test-for-3-2.herokuapp.com/recipes/random"
      //   );

      //   console.log(response);
      //   // const recipes = response.data.recipes;
      //   const recipes = response.data;        
      //   this.randomRecepies = [];
      //   this.randomRecepies.push(...recipes);
      //   // console.log(this.recipes);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async updateLastViewdRecepies() {
      if (this.$root.store.username){
        console.log("this.$root.store.watchedRecipes");
        console.log(this.$root.store.watchedRecipes);
        const recipes = this.$root.store.watchedRecipes;
        console.log("recipes");
        console.log(recipes);
        this.lastViewdRecepies = [];
        this.lastViewdRecepies.push(...recipes);
        console.log("lastViewdRecepies");
        console.log(this.lastViewdRecepies);
        // try {
        //   const response = await this.$root.apiRequest.get(
        //     '/watchedRecipes',
        //   );

        //   console.log(response);
        //   // const recipes = response.data.recipes;
        //   const recipes = response.data;        
        //   this.lastViewdRecepies = [];
        //   this.lastViewdRecepies.push(...recipes);
        //   // console.log(this.recipes);
        // } catch (error) {
        //   console.log(error);
        // }
      }
    }

  }
};
</script>

<style lang="scss" scoped>

// .container{
//   padding: 0;
// }

.title{
  padding-bottom: 8px;
  font-family: ‘Merriweather’, Georgia, serif;
}

// .recepies{
//   padding: 0px 20px;
//   display: flex;
//   width: 100%;
// }

.recepiesCol {
  padding: 0;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
