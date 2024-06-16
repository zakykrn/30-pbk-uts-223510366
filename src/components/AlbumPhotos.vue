<!-- src/components/AlbumPhotos.vue -->
<template>
    <q-page padding>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list bordered>
            <div class="photo-grid">
                <q-item v-for="(photo, index) in photos" :key="index" class="photo-item">
                    <q-item-section>
                        <img :src="photo.thumbnailUrl" alt="Thumbnail" @click="showPhoto(photo.url)">
                    </q-item-section>
                </q-item>
            </div>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <slot :totalPhotos="photos.length">
            <div>Total Foto: {{ photos.length }}</div>
          </slot>
        </q-card-section>
        <q-dialog v-model="dialogVisible" persistent>
          <q-card>
            <q-card-section>
              <img :src="selectedPhotoUrl" alt="Foto" style="max-width: 100%;" @click="dialogVisible = false">
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card>
    </q-page>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Foto Album'
      }
    },
    data() {
      return {
        photos: [],
        selectedPhotoUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      async fetchPhotos(albumId) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch photos');
          }
          const data = await response.json();
          this.photos = data;
        } catch (error) {
          console.error('Error fetching photos:', error);
        }
      },
      showPhoto(url) {
        this.selectedPhotoUrl = url;
        this.dialogVisible = true;
      }
    },
    watch: {
      $route(to, from) {
        const albumId = parseInt(to.params.id);
        if (!isNaN(albumId)) {
          this.fetchPhotos(albumId);
        }
      }
    },
    created() {
      const albumId = parseInt(this.$route.params.id);
      if (!isNaN(albumId)) {
        this.fetchPhotos(albumId);
      }
    }
  }
  </script>
  
  <style>
   .photo-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr); /* 5 kolom per baris */
    grid-auto-rows: 100px; /* Tinggi setiap baris */
    gap: 10px; /* Jarak antar elemen */
    max-height: 1100px; /* Batas tinggi maksimal (100px * 10 baris + 10px * 9 gap) */
    overflow-y: auto; /* Tampilkan scrollbar vertikal jika terlalu banyak item */
    padding: 10px; /* Padding untuk estetika */
  }

  .photo-item {
    width: 100%; /* Lebar item foto 100% */
    height: 100%; /* Tinggi item foto 100% */
    overflow: hidden; /* Agar gambar tidak keluar dari kotak */
  }

  .photo-item img {
    width: 100%; /* Gambar memenuhi lebar kotak */
    height: 100%; /* Gambar memenuhi tinggi kotak */
    object-fit: cover; /* Menjaga aspek rasio gambar */
    cursor: pointer; /* Tampilkan pointer ketika gambar dihover */
  }
  </style>
  