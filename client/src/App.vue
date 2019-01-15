<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title color="green darken-3" >Riyan</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        


      </v-list>
      
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      dark
      color="green darken-3"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat icon>
        <div class="text-xs-center">
          <v-badge right color="red" overlap>
            <span slot="badge">7</span>
            <v-icon>notifications</v-icon>
          </v-badge>
        </div>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      title: 'SIL',
      items: [
        {
          title: 'Dashboard',
          url: 'dashboard'
        }, {
          title: 'Master Data',
          url: 'master-data',
          childs: [
            {
              title: 'Pelanggan',
              url: 'pelanggan'
            }, {
              title: 'Layanan',
              url: 'layanan'
            }
          ]
        }, {
          title: 'Inventory',
          url: 'inventory'
        }
      ]
    }
  },
  computed: {

  },
  name: 'App'
}
</script>
