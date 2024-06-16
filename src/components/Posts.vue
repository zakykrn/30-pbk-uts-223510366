<template>
  <div class="container">
    <h4>{{ title }}</h4>
    <div class="filter-container">
      <select v-model="selectedUser" @change="fetchPosts" class="select-box">
        <option value="">-- Pilih Pengguna --</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <ul class="post-list">
      <li v-if="selectedUser" v-for="(post, index) in filteredPosts" :key="index" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
    <slot :totalPosts="posts.length">
      <p>Total Postingan: {{ posts.length }}</p>
    </slot>
  </div>
</template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: 'List Post'
      }
    },
    data() {
      return {
        posts: [],
        users: [],
        selectedUser: ''
      }
    },
    computed: {
      filteredPosts() {
        if (this.selectedUser) {
          return this.posts;
        } else {
          return [];
        }
      }
    },
    methods: {
      async fetchPosts() {
        if (this.selectedUser) {
          try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
            const data = await response.json();
            this.posts = data;
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        } else {
          this.posts = [];
        }
      },
      async fetchUsers() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const data = await response.json();
          this.users = data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    },
    mounted() {
      this.fetchUsers();
    }
  }
  </script>

<style scoped>
.post-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.post-item h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
}

.post-item p {
  margin: 0;
  color: #333;
}
</style>

  
  
  