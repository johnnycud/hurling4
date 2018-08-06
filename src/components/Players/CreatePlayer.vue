<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Player</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreatePlayer">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="firstName"
                label="First Name"
                id="firstName"
                v-model="firstName"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="surName"
                label="Sur Name"
                id="surName"
                v-model="surName"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="dob"
                label="DoB"
                id="dob"
                v-model="dob"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="dod"
                label="DoD"
                id="dod"
                v-model="dod"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="club"
                label="Club"
                id="club"
                v-model="club"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="county"
                label="County"
                id="county"
                v-model="county"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="imageUrl"
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
              <v-text-field
                name="fieldPosition"
                label="FieldPosition"
                id="fieldPosition"
                v-model="fieldPosition"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sb6 offset-sm3>
              <h3>Choose a Date & Time</h3>
            </v-flex>
          </v-layout>
          <v-layout row class="mb2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
              <p>{{ date }}</p>
            </v-flex>
          </v-layout>
          <v-layout row class="mb2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="time"></v-date-picker>
              <p>{{ time }}</p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Create Player</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import * as VCard from 'vuetify/es5/components/VCard'
  export default {

    data () {
      return {
        firstName: '',
        surName: '',
        dob: '',
        dod: '',
        club: '',
        county: '',
        imageUrl: '',
        fieldPosition: '',
        description: '',
        date: new Date(),
        time: new Date()
      }
    },
    components: {
      VCard
    },
    computed: {
      formIsValid () {
        return this.firstName !== '' &&
          this.surName !== '' &&
          this.dob !== '' &&
          this.club !== '' &&
          this.county !== '' &&
          this.imageUrl !== '' &&
          this.fieldPosition !== '' &&
          this.description !== ''
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
      }
    },
    methods: {
      onCreatePlayer () {
        if (!this.formIsValid) {
          return
        }
        const playerData = {
          firstName: this.firstName,
          surName: this.surName,
          dob: this.dob,
          dod: this.dod,
          club: this.club,
          county: this.location,
          imageUrl: this.imageUrl,
          fieldPosition: this.fieldPosition,
          description: this.description,
          date:this.submittableDateTime
        }
        this.$store.dispatch('createPlayer', playerData)
        this.$router.push('/players')
      }
    }
  }
</script>
