<template>
    <div class="recipe-preview">
        <b-container class="recipe-body">
            <b-row> 
                <b-col>
                    <div class="recipe-footer">
                      <div class="recipe-title" :title="recipe.title" >
                        <h5>{{ recipe.title }}</h5>
                      </div>    
                      <ul class="recipe-overview">
                        <b-col>
                          <b-row>
                            <li > <img class="imageLogo" src="../assets/clockLogo.jpg"/> </li>
                          </b-row>
                            <li >{{ recipe.readyInMinutes }} minutes </li>
                        </b-col> 
                        <b-col>
                          <b-row>
                            <li > <img class="imageLogo" src="../assets/favoriteLogo.png"/> </li>
                          </b-row><b-row>
                            <li >{{recipe.aggregateLikes}} likes </li>
                          </b-row>
                        </b-col>
                          <!-- <li>{{ recipe.Vegetarian }} minutes</li>
                          <li>{{ recipe.Vegan }} minutes</li>
                          <li>{{ recipe.readyInMinutes }} minutes</li>
                          <li>{{ recipe.readyInMinutes }} minutes</li>
                          <li>{{ recipe.aggregateLikes }} likes</li>  -->
                      </ul>
                      <ul class="recipe-overview">
                      <b-col>
                        <b-row>
                          <li v-if="this.recipe.vegetarian"> <img class="imageLogo" src="../assets/vegetarianLogo.png" /> </li>
                        </b-row> <b-row>
                          <li >vegetarian </li>
                        </b-row>
                      </b-col>
                          <!-- <li v-if="this.recipe.vegan"> <img class="imageLogo" src="../assets/veganLogo.jpg" />vegetarian</li>
                          <li v-if="this.recipe.glutenFree"> <img class="imageLogo" src="../assets/glutenFreeLogo.png" />vegetarian</li>
                          <li v-if="this.recipe.glutenFree"> <img class="imageLogo" src="../assets/vegetarianLogo.png" />vegetarian</li>
                          <li v-if="this.recipe.glutenFree"> <img class="imageLogo" src="../assets/vegetarianLogo.png" />vegetarian</li> -->


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
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: 200px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.recipe-preview .recipe-footer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 0px 0px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 20%;
  display: table-cell;
  text-align: center;
}
.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 14pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.imageLogo{
    height: 25px;
    width: auto;
    margin-top: 10px;
}
element.style {
    padding-top: 30px;
    padding-bottom: 10px;
    padding-left: 2px;
    padding-right: 2px;
}
.recipe-preview .recipe-footer ul.recipe-diets-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 20%;
  display: table-cell;
  text-align: center;
}
</style>
