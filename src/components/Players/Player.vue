<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                      <h3 class="primary--text">{{ player.title }}</h3>
                    </v-card-title>
                    <v-card-media
                      :src="player.imageUrl"
                      height="400px">
                    </v-card-media>
                    <v-card-text>
                        <div class="info--text">{{ player.date }}</div>
                        <div>Rest of info from database Club: BennetBridge County: Kilkenny</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
/* eslint-disable */
export default{
    props: ['id'],
    computed:{
        player(){
            return this.$store.getters.loadedPlayer(this.id)
        }
    }
}
</script>
