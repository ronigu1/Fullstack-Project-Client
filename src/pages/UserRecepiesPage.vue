<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h1 class="title">My Recipes</h1>
                </b-col>
            </b-row>
            <b-row class="recepies">
                <b-col cols="6" class="randomCol">
                    <RecipePreviewList class="recepiesCol"
                        title="" 
                        :recipes=this.UserRecipes
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
    name: 'UserRecepiesPage',
    components: {
        RecipePreviewList,
    },

    data() {
        return {
            UserRecipes:[],
            recepieList: 0
        };
    },

    mounted() {
         this.updateUserRecepies()
    },

    methods: {
        async updateUserRecepies(){
            try {
                // set user favorites recepies
                // var FavoritesRecipesIds = ""
                // this.$root.store.getFavoritesRecipesIds().map((recipesId)=>{
                // FavoritesRecipesIds+=recipesId
                // FavoritesRecipesIds+=','
                // })
                const response = await this.$root.apiRequest.get(
                    '/users/myrecipes',
                    // {
                    //     params: {
                    //         recipesIds: FavoritesRecipesIds
                    //     }
                    // }
                );
                const recipes = response.data;
                this.UserRecipes =[]
                this.UserRecipes.push(...recipes)
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