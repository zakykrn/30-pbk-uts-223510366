// src/stores/posts.js
import { defineStore } from 'pinia';

export const usePostsStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: [],
    users: [],
    selectedUser: ''
  }),
  getters: {
    filteredPosts(state) {
      if (state.selectedUser) {
        return state.posts.filter(post => post.userId === parseInt(state.selectedUser));
      } else {
        return [];
      }
    },
    userOptions(state) {
      return state.users.map(user => ({
        label: user.name,
        value: user.id
      }));
    }
  },
  actions: {
    async fetchPosts() {
      if (this.selectedUser) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
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
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  }
});
