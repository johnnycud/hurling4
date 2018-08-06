<template>
  <v-container>
      <h2 class="centre">This is a list of Hurling players from the past;</h2>
      <v-layout row wrap v-for="player in players" :key="player.id" class="mb-2">
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
             <v-card class="info" >
                 <v-container fluid>
                     <v-layout row>
                         <v-flex xs5 sm4 md3>
                             <v-card-media
                             :src="player.imageUrl"
                             height="125px">
                             </v-card-media>
                         </v-flex>
                         <v-flex xs7 sm8 md9>
                             <v-card-title primary-title>
                                 <div>
                                   <h3 class="white--text">{{player.title}}</h3>
                                   <div>{{player.date}}</div>
                                 </div>
                             </v-card-title>
                             <v-card-actions>
                                 <v-btn flat :to="'/players/' + player.id">
                                     <v-icon left light>arrow_forward</v-icon>
                                     View Player
                                 </v-btn>
                             </v-card-actions>
                         </v-flex>
                     </v-layout>
                 </v-container>
             </v-card>
          </v-flex>

      </v-layout>
  </v-container>

</template>
<script>
/* eslint-disable */
    export default{
        computed: {
            players(){
              return this.$store.getters.loadedPlayers
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
