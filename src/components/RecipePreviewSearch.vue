<template>
    <div class="recipe-body">
        <b-container class="recipe-body">
            <b-row> 
                <b-col>
                    <div :title="recipe.title" class="recipe-title">
                        {{ recipe.title }}
                    </div>                    
                    <div class="recipe-footer">
                        <ul class="recipe-overview">
                            <li > <img class="imageLogo" src="../assets/clockLogo.jpg"/> {{ recipe.readyInMinutes }} minutes</li>
                            <li > <img class="imageLogo" src="../assets/favoriteLogo.png"/> {{ recipe.aggregateLikes }} likes</li>
                            <!-- <li v-if="this.recipe.vegetarian"> <img class="imageSign" src="../assets/vegetarian-image.png"/>vegetarian</li>

                            <li>{{ recipe.Vegetarian }} minutes</li>
                            <li>{{ recipe.Vegan }} minutes</li>
                            <li>{{ recipe.readyInMinutes }} minutes</li>
                            <li>{{ recipe.readyInMinutes }} minutes</li>
                            <li>{{ recipe.aggregateLikes }} likes</li> -->
                        </ul>
                    </div>
                </b-col>
                <b-col>
                    <router-link
                        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
                        class="recipe-preview">  
                        <img v-if="image_load" :src="recipe.image" class="recipe-image" />
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
      isWatched: false,
      isLiked: false,
    };
  },
  methods:{
    // async searchRecipes(){
    //   try{
    //     this.axios.default.withCredebtials = true;
    //     const res = await this.axios.get(
    //       "http://"
    //     )
    //   }
    // }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};
</script>

<style>

</style>
