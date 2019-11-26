<template>
  <div>
    <div class="no-connection uk-flex uk-flex-row uk-flex-center uk-flex-middle" v-if="isNotConnected">
      <div class="uk-card uk-card-default uk-card-body uk-width-1-3@m uk-width-1-2@s uk-text-center">
        <h3 class="uk-card-title">Connection not found</h3>
        <span class="uk-icon" uk-icon="icon: server; ratio: 2"></span>
        <p>Seems that you're not connected to any FTP server. Let's fix that!</p>
        <button class="uk-button uk-button-primary" uk-toggle="target: #modal-new-connection">New connection</button>
      </div>
    </div>
    <div class="no-connection uk-flex uk-flex-row uk-flex-center uk-flex-middle" v-else-if="isLoading">
      <div uk-spinner="ratio: 2"></div>
    </div>
    <FileManager v-else-if="isConnected"></FileManager>
    <ConnectionModal></ConnectionModal> <!-- #modal-new-connection -->
  </div>
</template>

<script>
import ConnectionModal from './ConnectionModal.vue';
import FileManager from './FileManager.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  components: {
    ConnectionModal, FileManager
  },
  methods: {
    loadFiles() {
      this.$store.dispatch('files/loadFiles', { url: '/' });
    }
  },
  computed: {
    isConnected() {
      return this.$store.state.connection.connected === 'true';
    },
    isNotConnected() {
      return this.$store.state.connection.connected === 'false';
    },
    isLoading() {
      return this.$store.state.connection.connected === 'loading';
    },
    files() {
      return this.$store.state.files.files
    }
  }
}
</script>

<style lang="scss">
.no-connection {
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;

	.uk-card {
		pointer-events: all;
	}
}
</style>