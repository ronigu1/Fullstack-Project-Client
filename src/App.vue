<template>
  <div id="app">
    <div id="nav">
      <b-navbar  class="fullBar" variant="success">
        <b-navbar>
        <router-link :to="{ name: 'mainpage' }">Main</router-link>|
        <router-link :to="{ name: 'search' }">Search</router-link>|
        <router-link :to="{ name: 'about' }">About</router-link>|
      </b-navbar>
      <b-navbar-nav class="ml-auto">
              <span class="navbar-text space" v-if="!$root.store.username"> <b>Hello Guest</b> </span>
              <span class="navbar-text space" v-if="$root.store.username"> <b>Hello {{$root.store.username}}</b> </span>
              <!-- <b-nav-item-dropdown :text="$root.store.username" v-if="$root.store.username" right> -->
              <b-nav-item-dropdown v-if="$root.store.username" right>
              <b-textarea name="Profile" style="font-weight: bold; color: #2c3e50; font-size: 1rem;">Profile:</b-textarea>
                  <router-link tag="" :to="{ name: 'main' }" @click.native="$root.store.logout">Logout</router-link>
                  <router-link tag="b-dropdown-item" :to="{ name: 'favoritesrecepies' }">My favorites</router-link>
                  <router-link tag="b-dropdown-item" :to="{ name: 'userrecepies' }">My Recipes</router-link>
                  <router-link tag="b-dropdown-item" :to="{ name: 'familyrecepies' }">My Family Recipes</router-link>
                  <b-button id="show-modal" class="ModalBtn" @click="showModal = true">Add New Recipe</b-button>
                  <Teleport to="body">
                    <modal :show="showModal" @close="showModal = false">
                      <template #header>
                        <h3>New Recipe</h3>
                      </template>
                    </modal>
                </Teleport>
        </b-nav-item-dropdown>
        <b-button @click="Logout" v-if="$root.store.username">Logout</b-button>
        <b-button :to="{ name: 'register' }" v-if="!$root.store.username" class="space">Register</b-button>
        <b-button :to="{ name: 'login' }" v-if="!$root.store.username">Login</b-button>   

        <!-- <span v-if="!$root.store.username">
          Guest:
          <router-link :to="{ name: 'register' }">Register</router-link>|
          <router-link :to="{ name: 'login' }">Login</router-link>|
        </span>
        <span v-else>
          <button @click="Logout">Logout</button>|
        </span> -->
      </b-navbar-nav>  
      

      </b-navbar>
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
      this.$root.store.favoritesRecepies = JSON.parse(localStorage.getItem("favoritesRecepies"));
    }
  },
  beforeUpdate(){
    console.log("App beforeUpdate")
     if (this.$root.store.username){
      localStorage.setItem("watchedRecipes", JSON.stringify(this.$root.store.watchedRecipes));
      localStorage.setItem("favoritesRecepies", JSON.stringify(this.$root.store.favoritesRecepies));
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
              recipeId3: watchedRecipesIds[2],
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

.ModalBtn{
  padding: 4px 24px !important;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#show-modal {
  font-weight: bold;
  color: #2c3e50;
  background-color: white;
  border: 0px;
}

.space{
  margin-right: 10px;
}
</style>
