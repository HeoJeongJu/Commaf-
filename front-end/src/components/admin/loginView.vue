<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <div class="form-group">
        <input type="text" id="id" v-model="id" placeholder="ID" required>
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="password" placeholder="PASSWORD" required>
      </div>
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const data = {
          id: this.id,
          password: this.password
        }

        await axios.post('http://localhost:3001/admin/login', data, { withCredentials: true });
        this.$router.push('/items');
      } catch(err) {
        console.error(err);
      }
    }
  }
}
</script>

<style>
.login-container {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  padding: 15px;
}

.form-group {
  margin-bottom: 2em;
}

input[type="text"], input[type="password"] {
  width: 100%;
  padding: 0.5em;
  border-radius: 4px;

  border-bottom: 1px solid white;
  font-size: 20px;
}

button[type="submit"] {
  padding: 0.5em 1em;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}


</style>