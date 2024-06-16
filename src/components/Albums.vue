<!-- src/components/Albums.vue -->
<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list bordered>
          <q-item v-for="album in albums" :key="album.id" clickable tag="router-link" :to="'/albums/' + album.id">
            <q-item-section>
              <q-item-label>{{ album.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <slot :totalAlbums="albums.length">
          <div>Total Album: {{ albums.length }}</div>
        </slot>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Daftar Album'
    }
  },
  data() {
    return {
      albums: []
    }
  },
  methods: {
    async fetchAlbums() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        this.albums = data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    }
  },
  mounted() {
    this.fetchAlbums();
  }
}
</script>

<style>
</style>
