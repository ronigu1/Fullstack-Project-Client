<template>
    <div style="display: flex; justify-content: center;">
        <div>
            <b-card-group deck class="row-item">
            <b-card
            border-variant="success"
            header="About Us"
            header-bg-variant="success"
            header-text-variant="white"
            align="center"
            >
                <b-card-text>
                    Hi there our names are Roni Guz and Hodaya Takele 
                    <br>
                    Welcome To Our Recepis Website
                    <br>
                    We put a lot of effort in the wensite and we hope you'll enjoy it
                    <br>
                </b-card-text>
            </b-card>
            <br>
            </b-card-group>
                        <br>
                                    <br>
                                                <br>
            <b-card-group deck class="row-item">                
                <b-card 
                style="max-width: 40rem;"
                border-variant="success"
                header="CookieMonster Website"
                header-bg-variant="success"
                header-text-variant="white"
                align="center"
                >
                    <b-card-text>
                        CookieMonster website, is the best version of the Pac-Man game!
                        <br>
                        The Sesame Street gang is having a party and the cookie monster is on the run trying to eat as many cookies as possible. Elmo and other friends are trying to stop him before he eats everything. If you want to be a winner and not a sore loser you need to help the Cookie-Man escape from his friends, eat cookies and gain at least 100 points before the time stop.
                    </b-card-text>
                    <div class="card-body">
                        <a href="https://github.com/Web-Development-Environments-2022/318256922_316607258" class="card-link">Visit</a>
                    </div>
                </b-card>
                <b-card 
                style="max-width: 40rem;"
                border-variant="success"
                header="Our's Website"
                header-bg-variant="success"
                header-text-variant="white"
                align="center"
                > 
                    <b-card-text>
                        In this exercise, We designed a website for elderly pepole. 
                        <br>
                       We chose famous pepole that we adore and 
                        <br>
                        You are more than welcome to take a look at my website and learn more about this character.
                    </b-card-text>
                    <div class="card-body">
                        <a href="https://github.com/Web-Development-Environments-2022/318256922" class="card-link">Yoram Gaon</a>
                        <a href="https://github.com/Web-Development-Environments-2022/316607258" class="card-link">Morgan Freeman</a>
                    </div>
                </b-card>
            </b-card-group>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.row-item{
    width: 90%;
    display: inline-flex;
    justify-content: center;

}
</style>
