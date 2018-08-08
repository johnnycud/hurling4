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
            <file-pond
              name="test"
              ref="pond"
              label-idle="Drop files here..."
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png"
              server="/api"
              v-bind:files="myFiles"
              v-on:init="handleFilePondInit"/>
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
   // Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
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
      },
    name: 'app',
    data: function() {
        return { myFiles: ['cat.jpeg'] };
    },
    methods: {
        handleFilePondInit: function() {
            console.log('FilePond has initialized');

            // FilePond instance methods are available on `this.$refs.pond`
        }
    },
    components: {
        FilePond
    }

    }
  }
</script>
