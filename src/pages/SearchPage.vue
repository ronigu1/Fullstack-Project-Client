<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="searchFunc" @reset.prevent="resetForm">
      <div class="formQ">
        <b-form-group id="query">
          <b-form-input
                  v-model="form.query"
                  id="queryInput"
                  name="query"
                  type="text"
                  class="formControl"
                  placeholder="Enter key words here"
          ></b-form-input> 
        </b-form-group>
        </div>
        <b-row class="dropDownForm">
          <div class="cuisineD">
            <!-- <b-form-group label-align="right"> -->
                <b-dropdown 
                  id="cuisine" 
                  text="Cuisine" 
                  variant="primary" 
                class="ml-3">
                  <b-dropdown-item href="#" v-for="cuisine in cuisinesOptions" :value="cuisine" :key="cuisine" @click="addFilterFunc('cuisine',cuisine)">
                    <option >
                      {{ cuisine }}
                    </option>
                  </b-dropdown-item>
                </b-dropdown>
                <ul class="ulFilter">
                  <li v-for="val in this.form.cuisine" :key="val">{{val}}</li>
                </ul>
          </div>
          <div class="dietD"> 
                <b-dropdown 
                  id="diet" 
                  text="Diet" 
                  variant="primary" 
                class="ml-3 ">
                <b-dropdown-item href="#" v-for="diet in dietsOptions" :value="diet" :key="diet"  @click="addFilterFunc('diet',diet)">
                    <option>
                      {{ diet }}
                    </option>
                  </b-dropdown-item>
                </b-dropdown>
                <ul class="ulFilter">
                  <li v-for="val in this.form.diet" :key="val">{{val}}</li>
                </ul>
          </div>
          <div class="intoleranceD"> 
              <b-dropdown 
                  id="intolerance" 
                  text="Intolerance" 
                  variant="primary" 
                class="ml-3">
                <!-- @click.native לבדוק אופציה  -->
                  <b-dropdown-item href="#" v-for="intolerance in intolerancesOptions" :value="intolerance" :key="intolerance" @click="addFilterFunc('intolerance',intolerance)">
                    <option >
                      {{ intolerance }}
                    </option>
                  </b-dropdown-item>
                </b-dropdown>
                <ul class="ulFilter">
                  <li v-for="val in this.form.intolerance" :key="val">{{val}}</li>
                </ul>
          </div>
        </b-row>
        <div class="formResNum">
          <b-form-select
                  class="form-control"
                  name="Cuisine"
                  id="number"
                  text = "Enter number of results"
                  v-model="form.number"
                  
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </b-form-select>
        </div>
        <div class="btnResAndSwarch"> 
        <b-button class="buttenReset" type="reset" variant="danger">Reset</b-button>
          <b-button
              type="submit"
              variant="primary"
              class="ml-3 w-30"
              :disabled="resetDisabled"
              > Search </b-button>
        </div>
    </b-form>
    <!-- <div> 
      intolerance:
      <h1>{{ form }}</h1>
    </div> -->
    <!-- create two columns: in the right col we show the search result, in the left col we will show the last search of the logged user -->
    <div class="searchRes">
      <b-row>
        <b-col>
          <div>
              <div id="searchResults" v-if="!arrIsEmpty">
                <div class="filterRes">
                  <!-- <h2> Search Results:</h2> -->
                  <label>Sort Results: </label>&nbsp;
                  <select name="sorts" id="sort" @change="sortResults($event)" class="form-control" v-model="selectedStatus">
                    <option selected disabled value="0">Select option</option>
                    <option value="likes">Recipe's Popularity</option>
                    <option value="time">Preparation Time</option>
                  </select>
                  </div>
                <ShowenRecipes  class="Search Results" 
                :fullRecipes="recipes"
                title="Search Results"
                :colLen = "recipes.length"
                :pageStartSearch = "pageSearch"
                ></ShowenRecipes>
            </div> 
            <div v-else> 
              <h2> Search Results:</h2>
              <h6><strong>Please enter recipe parameters to the search line </strong></h6>
              <h6><strong>and press on theSearch button. </strong></h6>
             
            </div>
          </div>
        </b-col>

        <b-col>
          <!-- <h2> Yout last searched recipes:</h2> -->
          <div v-if="lastRecipesRestore != null">
          <p class="lastSearchForm">
            <strong>Past Query: </strong> {{ this.lastestSearch }}<br/>
            <strong>Diet: </strong> {{ this.lastestDietFilter }}<br/>
            <strong>Cuisine: </strong> {{ this.lastestCuisineFilter }}<br/>
            <strong>intolerance: </strong> {{ this.lastestIntoleranceFilter }}<br/>
          </p>
          
              <!-- <b-row v-for="r in lastRecipesRestore" :key="r.id">
                <RecipePreviewSearch class="recipePreview" :recipe="r" />
              </b-row> -->
              <ShowenRecipes  class="last Results" 
                :fullRecipes="lastRecipesRestore"
                title="Yout last searched recipes"
                :colLen = "recipes.length"
                :pageStartSearch ="pageSearch"
              ></ShowenRecipes>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import RecipePreviewListSearch from "../components/RecipePreviewListSearch";
  import ShowenRecipes from "../components/ShowenRecipes";

  import diets from "../assets/diets";
  import cuisines from "../assets/cuisines";
  import intolerances from "../assets/intolerances";
  import RecipePreview from "../components/RecipePreview";
  import RecipePreviewSearch from "../components/RecipePreviewSearch.vue";
  export default{ 
    name:"SearchPage",
    components: {
    // RecipePreviewListSearch,
    ShowenRecipes,
    
},
    data(){
      return{
        form:{
          query: "",
          number: 5,
          cuisine: [],
          diet: [],
          intolerance: [],
          },
        recipes: [],
        cuisinesOptions: cuisines,
        dietsOptions: diets,
        intolerancesOptions: intolerances,
        pageSearch: 0,

        lastestSearch: null,
        lastestDietFilter: null,
        lastestCuisineFilter: null,
        lastestIntoleranceFilter: null,
        lastRecipesRestore: null,

        currentSearch: null,
        currentDietFilter: null,
        currentCuisineFilter: null,
        currentIntoleranceFilter: null,
      }
    },

    mounted() {
      if ("username" in localStorage){
        console.log("username in localStorage");    
        if(localStorage.getItem("username") !== 'undefined'){
          //update lastest Search detailes from local storage:
            this.lastestSearch = localStorage.getItem("lastestSearch");
            this.lastestDietFilter = localStorage.getItem("lastestDietFilter");
            this.lastestCuisineFilter = localStorage.getItem("lastestCuisineFilter");
            this.lastestIntoleranceFilter = localStorage.getItem("lastestIntoleranceFilter");
            this.lastRecipesRestore = JSON.parse(localStorage.getItem("lastRecipesRestore"));
            console.log(localStorage);
        }
      }

    },
    // watch:{
    //     recipes:function(){return this.recipes;}
    // },
    computed: {
      arrIsEmpty(){
        if(Array.isArray(this.recipes) && this.recipes.length==0)
        {
          console.log(true);
          return true;
        }
        else{
          console.log(false);
          return false;
        };
      },
      resetDisabled() {
        if (this.form.query === null || this.form.query === "" || this.form.query.value === 0) 
        {
          return true;
        }
        return false;
      },
      sortByLikes(){
        function compare(x,y){
          if(x.popularity < y.popularity) return 1;
          if(x.popularity > y.popularity) return -1;
          return 0;
        }
        return [...this.recipes].sort(compare);
      },
      sortByTime(){
        function compare(x,y){
          if(x.readyInMinutes < y.readyInMinutes) return -1;
          if(x.readyInMinutes > y.readyInMinutes) return 1;
          return 0;
        }
        return [...this.recipes].sort(compare);
      },
    },

    methods:{
      addFilterFunc(filter,event){
        let filterArr =this.form[filter];
        // console.log("filterArr before:   "+filterArr);
        // console.log("form before:   "+this.form[filter]);
        if (filterArr.includes(event)) {
          const index = filterArr.indexOf(event);
          if(index > -1){
            // only splice array when item is found
            filterArr.splice(index,1);
          }
        }
        else {
          this.form[filter].push(event);
        }
        this.form[filter] =filterArr;
        // console.log("filterArr after:   "+filterArr);
        // console.log("form before:   "+this.form[filter]);
      },
      updateLastSearchDetails() {
        //get from local Storage
        // console.log("login", this.username);
        // console.log("login localStorage", localStorage.username);
        // console.log("login localStorage GET", localStorage.getItem("username"));
        // console.log("localStorage", localStorage);        
        if (localStorage.username){
          if(localStorage.getItem("username") !== 'undefined'){
            this.lastestSearch = localStorage.getItem("lastestSearch");
            this.lastestDietFilter = localStorage.getItem("lastestDietFilter");
            this.lastestCuisineFilter = localStorage.getItem("lastestCuisineFilter");
            this.lastestIntoleranceFilter = localStorage.getItem("lastestIntoleranceFilter");
            this.lastRecipesRestore = JSON.parse(localStorage.getItem("lastRecipesRestore"));
          }
        }
      },
      sortResults(event){
        if(event.target.value === "likes"){
          this.recipes = this.sortByLikes;
        }
        if(event.target.value === "time"){
          this.recipes = this.sortByTime;
        }
      },

      async searchFunc(){
        try {
          this.selectedStatus = "0";
          this.pageSearch = 0;
          this.updateLastSearchDetails();
          // this.axios.defaults.withCredentials=false;
          //set data acording the user's input
          console.log("this.store.username",this.$root.store.username);
          this.currentSearch = this.form.query;
          console.log( this.currentSearch);
          this.currentDietFilter = this.form.diet;
          console.log( this.currentDietFilter.toString());

          this.currentCuisineFilter = this.form.cuisine;
          console.log( this.currentCuisineFilter.toString());

          this.currentIntoleranceFilter = this.form.intolerance;
          console.log( this.currentIntoleranceFilter.toString());

          const response = await this.axios.get(
            ` ${this.$root.store.server_domain}/recipes/search/query/${this.form.query}/amount/${this.form.number}`,
            {
              //query params(after the "?"):
              params: {
                cuisine: "'"+ this.currentCuisineFilter.toString() +"'",
                diet: "'"+ this.currentDietFilter.toString() +"'",
                intolerance: "'"+ this.currentIntoleranceFilter.toString() +"'",
              },
            },
          );
          //set to local Storage
          if (localStorage.username){
            if(localStorage.getItem("username") !== 'undefined'){
              localStorage.setItem("lastestSearch", this.currentSearch);
              localStorage.setItem("lastestDietFilter", this.currentDietFilter);
              localStorage.setItem("lastestCuisineFilter", this.currentCuisineFilter);
              localStorage.setItem("lastestIntoleranceFilter", this.currentIntoleranceFilter);
              // localStorage.setItem("lastRecipesRestore", this.lastRecipesRestore);
              localStorage.setItem("lastRecipesRestore", JSON.stringify(response.data));
            }
          }
          this.recipes = [];
          this.recipes=response.data;
          return this.recipes;
          console.log("--------recipes----------")
          console.log(this.recipes)
          // console.log("-------------------------")
          // localStorage.setItem("lastRecipesRestore", JSON.stringify(response.data));
          // console.log("--------lastRecipesRestore----------")
          // console.log(this.lastRecipesRestore)
          // console.log("-------------------------")
          // console.log("--------lastRecipesRestore[0]----------")
          // console.log(this.lastRecipesRestore[0])
          // console.log("-------------------------")


          //coockie saveSearch //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        } catch (err){
          console.log(err);
        }
      },
      resetForm(){
        this.form = 
        {
          query: "",
          number: 5,
          cuisine: [],
          diet: [],
          intolerance: [],

        };
      },
      
    },
  }
</script>
<style>
  /* .dropDownForm{
    variant:"primary",
  } */
  .ulFilter{
    list-style: none;
  }  
  .searchRes{
    padding-top: 60px;
  }
  .btnResAndSwarch{
    padding-top: 15px;
  }
  .dropDownForm{
    padding-top: 0px;
  }
  .formResNum{
    width: 14.5%;
  }
  .lastSearchForm{
    height: 100%;
    width: 100%;
    padding-left: 35.5%;
    padding-right: 35.5%;
    margin-right: 0;
    margin-left: 0;
  }
  .filterRes{
    height: 100%;
    width: 100%;
    padding-left: 35.5%;
    padding-right: 35.5%;
    padding-top:5.6%;
    padding-bottom: 5.6%;
    margin-right: 0;
    margin-left: 0;
  }
  label{
    display: inline-block;
    margin-bottom: 0.63rem;
    font-weight: bold;
    /* align-items: center; */
    /* object-position: center; */
    padding-left: 20%;
  }
</style>
