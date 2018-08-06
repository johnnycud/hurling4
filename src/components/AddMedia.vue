<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Add new Media</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onAddMedia">
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
              name="photo"
              label="PHOTO"
              id="photo"
              v-model="photo"
              ></v-text-field>
          </v-flex>
        </form>
      </v-flex>
    </v-layout>
    <v-layout row><v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required></v-text-field>
            </v-flex>

          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
    <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Add Photo</v-btn>
            </v-flex>
          </v-layout>
          <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onAddMedia">
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field
              name="video"
              label="Video"
              id="video"
              v-model="video"
              ></v-text-field>
          </v-flex>
        </form>
      </v-flex>
    </v-layout>
    <v-layout row><v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required></v-text-field>
            </v-flex>

          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="video" height="150">
            </v-flex>
          </v-layout>
    <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Add Video</v-btn>
            </v-flex>
          </v-layout>
    </v-container>
  </template>

  <script>
  /* eslint-disable */
  export default {
    data () {
      return {
          photo: '',
          video: '',
          description: '',
          date: new Date(),
          time: new Date()
      }
    },
    submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      },

    methods: {
      onAddMedia () {
        if (!this.formIsValid) {
          return
        }
        const mediaData = {
          photo: this.photo,
          video: this.video,
          description: this.description,
          date:this.submittableDateTime
        }
        this.$store.dispatch('addMedia', mediaData)
        this.$router.push('/media')
      }
    }
  }
</script>
