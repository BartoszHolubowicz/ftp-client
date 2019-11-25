<template>
  <div id="modal-new-connection" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">New connection</h2>
      <form class="uk-form-stacked">
        <div class="uk-margin uk-grid uk-grid-match uk-grid-column-small">
          <div class="uk-width-1-4">
            <label class="uk-form-label">Type:</label>
            <select class="uk-select" v-model="type">
              <option default>FTP</option>
              <option>SFTP</option>
            </select>
          </div>
          <div class="uk-width-1-2">
            <label class="uk-form-label">Host: {{ host }}</label>
            <input class="uk-input" placeholder="localhost" v-model="host">
          </div>
          <div class="uk-width-1-4">
            <label class="uk-form-label">Port:</label>
            <input class="uk-input" placeholder="21" v-model="port">
          </div>
        </div>
        <div class="uk-margin uk-grid uk-grid-match uk-grid-column-small">
          <div class="uk-width-1-2@s">
            <label class="uk-form-label">Username:</label>
            <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input class="uk-input" v-model="username">
            </div>
          </div>
          <div class="uk-width-1-2@s">
            <label class="uk-form-label">Password:</label>
            <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input type="password" class="uk-input" v-model="password">
            </div>
          </div>
        </div>
      </form>
      <p class="uk-margin uk-text-right">
        <button class="uk-modal-close uk-button uk-button-primary" type="button" @click="connect">Connect</button>
        <button class="uk-modal-close uk-button uk-button-default" type="button">Close</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectionModal',
  data() {
    return {
      type: 'SFTP',
      host: 'orfi.uwm.edu.pl',
      port: '22',
      username: 'konto12',
      password: 'm1OkLdV'
    }
  },
  methods: {
    connect() {
      this.$store.dispatch('connection/connect', { host: this.host, port: this.port, username: this.username, password: this.password });
    },
  }
}
</script>

<style>

</style>