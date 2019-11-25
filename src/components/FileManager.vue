<template>
  <div class="uk-grid">
    <ul class="uk-width-1-2 uk-list uk-list-striped">
      <li>
        <span uk-icon="icon: folder"></span>
        <a class="uk-link-text" href="#" @click="loadFiles(getLocalDirUp)">..</a>
      </li>
      <li v-for="file in getSortedFiles" v-bind:key="file.path">
        <span uk-icon="icon: folder" v-if="file.type === 'directory'"></span>
        <span uk-icon="icon: file-text" v-if="file.type === 'file'"></span>
        <a class="uk-link-text" href="#" @click="loadFiles(getLocalDirMove(file.path))" v-if="fileIsDirectory(file)">{{ file.path }}</a>
        <span v-else>{{ file.path }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import sortBy from 'lodash.sortby';

export default {
  name: 'FileManager',
  methods: {
    loadFiles: function(url) {
      this.$store.dispatch('files/loadFiles', { url });
    },
    getLocalDirMove(to) {
      return this.getLocalDir + '/move:' + to;
    },
    fileIsDirectory(file) {
      return file.type === 'directory';
    }
  },
  computed: {
    getLocalDir() {
      return this.$store.state.files.localDir;
    },
    getLocalDirUp() {
      return this.getLocalDir + '/up';
    },
    getFiles() {
      return this.$store.state.files.files;
    },
    getSortedFiles() {
      return sortBy(this.getFiles, ['type', 'path']);
    }
  }
}
</script>

<style>

</style>