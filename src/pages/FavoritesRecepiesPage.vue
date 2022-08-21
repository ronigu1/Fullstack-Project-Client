<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h1 class="title">Favorites Recipes</h1>
                </b-col>
            </b-row>
            <b-row class="recepies">
                <b-col cols="6" class="randomCol">
                    <RecipePreviewList class="recepiesCol"
                        title="" 
                        :recipes=this.FavoritesRecipes
                        :colLen=recepieList
                    ></RecipePreviewList>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
    name: 'FavoritesRecepiesPage',
    components: {
        RecipePreviewList,
    },
    data() {
        return {
            FavoritesRecipes:[],
            recepieList: 0
        };
    },

    mounted() {
        this.updateFavorites()
    },

    methods: {
        async updateFavorites(){
            try {
                // set user favorites recepies
                var FavoritesRecipesIds = ""
                this.$root.store.getFavoritesRecipesIds().map((recipesId)=>{
                FavoritesRecipesIds+=recipesId
                FavoritesRecipesIds+=','
                })
                const response = await this.$root.apiRequest.get(
                    '/recipes/recipesBulk',
                    {
                        params: {
                            recipesIds: FavoritesRecipesIds
                        }
                    }
                );
                const recipes = response.data;
                this.FavoritesRecipes =[]
                this.FavoritesRecipes.push(...recipes)
                this.recepieList = recipes.length
            } catch (err) {
                console.log(err.response);
                this.form.submitError = err.response.data.message;
            }
        }
        
    },
};
</script>

<style lang="scss" scoped>
.title{
  padding-bottom: 8px;
  font-family: ‘Merriweather’, Georgia, serif;
  text-align: center;
}
.row{
    justify-content: center;
}
</style>