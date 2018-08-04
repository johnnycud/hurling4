<template>
  <v-container>
      <v-layout row wrap class="mb-2">
        <v-flex xs12 sm6 class="text-xs-centre text-sm-right">
          <v-btn large router to="/players" class="success">Explore Players</v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-centre text-sm-left">
          <v-btn large router to="/media" class="success">Search Media</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-2" v-if="!loading">
        <v-flex xs12>
          <v-carousel style="cursor: pointer;">
            <v-carousel-item
              v-for="(player) in players"
              :src="player.imageUrl"
              :key="player.id"
              @click="onLoadPlayer(player.id)">
              <div class="title">
                {{player.title}}
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-2">
        <v-flex xs12 class="text-xs-center ">
          <p>Join our awesome Hurling App</p>
        </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
  export default{
  computed : {
    players() {
      return this.$store.getters.featuredPlayers
    }
  },
    loading () {
      return this.$store.getters.loading
    },
    methods: {
      onLoadPlayer (id) {
        this.$router.push('/players/' + id)
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
