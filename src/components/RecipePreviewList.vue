<template>
  <div>
  <!-- <b-container class="recipePreviewList"> -->
    <!-- <b-row> -->
    <b-container class="title">
      <h3>
        {{ title }}
        <slot></slot>
      </h3>
    </b-container>
    <!-- </b-row> -->
    <!-- <b-container> -->
    <b-container v-for="r in recipes" :key="r.id">
      <RecipePreview class="recipePreview" :recipe="r" />
    </b-container>
    <!-- </b-container> -->
  <!-- </b-container> -->
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes:{
      type: Array,
      required: true
    },
    colLen: {
      type: Number,
      required: true
    }
  },
  // data() {
  //   return {
  //     recipes: []
  //   };
  // },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      // try {
      //   const response = await this.axios.get(
      //     this.$root.store.server_domain + "/recipes/random",
      //     // "https://test-for-3-2.herokuapp.com/recipes/random"
      //   );

      //   console.log(response);
      //   // const recipes = response.data.recipes;
      //   const recipes = response.data;        
      //   this.recipes = [];
      //   this.recipes.push(...recipes);
      //   // console.log(this.recipes);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }
};
</script>

<style lang="scss" scoped>

// .container{
//   padding: 0;
// }

.title {
  font-family: ‘Merriweather’, Georgia, serif;
  text-align: center;
  // padding-bottom: 10px;
}
.recipePreview{
  padding-bottom: 5px;
  padding-left: 0;
  padding-right: 0;
}
// .recipePreviewList {
//   min-height: 400px;
// }
</style>
