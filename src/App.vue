<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'mainpage' }">Vue Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      {{ !$root.store.username }}
      <span v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </span>
    </div>
    <router-view />
  </div>
</template> 

<script>
export default {
  name: "App",
  mounted(){
    console.log("App Mounted")
    if (localStorage.getItem("username") !== 'undefined'){
      this.$root.store.username = localStorage.getItem("username");
      this.$root.store.watchedRecipes = JSON.parse(localStorage.getItem("watchedRecipes"));
    }
  },
  beforeUpdate(){
    console.log("App beforeUpdate")
     if (this.$root.store.username){
      localStorage.setItem("watchedRecipes", JSON.stringify(this.$root.store.watchedRecipes));
    }
  },
  methods: {
    async Logout() {
      try{
        if(localStorage.getItem("username") !== 'undefined'){
          // Save users last watched recepies ids in server
          let watchedRecipesIds = this.$root.store.getWatchedRecipesIds();
          console.log("watchedRecipesIds");
          console.log(watchedRecipesIds);
          const setResponse = await this.$root.apiRequest.post(
            '/users/watchedrecipes',
            {
              recipeId1: watchedRecipesIds[0],
              recipeId2: watchedRecipesIds[1],
              recipeId3: watchedRecipesIds[2]
            }
          );
          console.log(setResponse)
          
          // send server logout request
          const logoutResponse = await this.$root.apiRequest.post('/logout');
          console.log(logoutResponse)
          
          this.$root.store.logout();
          this.$root.toast("Logout", "User logged out successfully", "success");
          
          // navigat to main page
          this.$router.push("/").catch(() => {
            this.$forceUpdate();
          });
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
