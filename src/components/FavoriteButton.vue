<template>
  <!-- <div class="favoriting"> -->
    <!-- <label class="favorite__heart" 
            v-bind:class="{'favorite__heart__selected': value, 'is-disabled': disabled}" 
            @click="favorite"> -->
    <label class="favorite__heart" 
            v-bind:class="{'favorite__heart__selected': value, 'is-disabled': disabled}">
        <input class="favorite__checkbox"
                type="checkbox"
                v-bind:name="name"
                v-bind:value="value"
                v-model="value"
                @click="$emit('click')">
                &#9829;
    </label>
  <!-- </div> -->
</template>

<script>
export default {
    name: "FavoriteButton",
    props: {
        name: {
            type: String,
            default: "favoriteBtn"
        },
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.favoriting{
    display: inline-block;
}

.favorite__heart {
    display: inline-block;
    padding: 0px 5px;
    vertical-align: middle;
    /* line-height: 1; */
    font-size: 20px;
    color: #ABABAB;
    cursor: pointer;
    -webkit-transition: color .2s ease-out;
    transition: color .2s ease-out;
    margin: 0;
}

.favorite__heart.is-disabled:hover {
     cursor: default;
 }

.favorite__checkbox {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: 0;
    /* margin: -1px; */
    padding: 0;
    border: 0;
}

.favorite__heart__selected{
    color: #df470b;
}
</style>