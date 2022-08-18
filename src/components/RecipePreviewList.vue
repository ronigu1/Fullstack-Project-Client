<template>
  <b-container>
    <b-row>
      <h3 class="title">
        {{ title }}
        <slot></slot>
      </h3>
    </b-row>
    <b-row v-for="r in recipes" :key="r.id">
      <RecipePreview class="recipePreview" :recipe="r" />
    </b-row>
  </b-container>
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
.title{
  font-family: ‘Merriweather’, Georgia, serif;
}
.container {
  min-height: 400px;
}
</style>
