<template>
  <div class="list-container">

    <nav class="navigation-bar">
      <a href="/">
        <img src="../assets/logo.png" class="logo" alt="logo">
      </a>
      <input class="search-input" type="text" v-model="search" placeholder="검색: 이름, 향, 원산지 등..." />
      <i class="fa-solid fa-magnifying-glass fa-2xl" style="color: #ffffff;"></i>
    </nav>

    <div class="coffees-grid">
      <router-link class="coffee" v-for="coffee in filterCoffees" :key="coffee.id"
        :to="{ name: 'item', params: { name: coffee.name } }">
        <img :src="coffee.image_url" :alt="coffee.name" class="coffee-image">
        <div class="coffee-name"> {{ coffee.name }}</div>
      </router-link>
    </div>


    <div class="logout-container">
      <button class="logout" @click="logout()" v-if="isLogin">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      coffees: [],
      filterCoffees: [],
      isLogin: false
    }
  },
  watch: {
    search() {
      this.filtering();
    }
  },
  async created() {
    await this.checkLogin();
    await this.getCoffees();
  },  
  methods: {
    async getCoffees() {
      try {
        const res = await axios.get('http://localhost:3001/coffee');
        this.coffees = res.data;
        this.filterCoffees = res.data;
      } catch(err) {
        console.error('커피 목록을 받아오는 도중 문제가 생김', err);
      }
    },
    filtering() {
      if(this.search.trim() === '') {
        this.filterCoffees = this.coffees;
      } else {
        this.filterCoffees = this.coffees.filter(coffee => {

          const text = coffee.name.toLowerCase().includes(this.search.toLocaleLowerCase()) || 
          coffee.region.toLowerCase().includes(this.search.toLocaleLowerCase()) || 
          coffee.description.toLowerCase().includes(this.search.toLocaleLowerCase());

          const flavor = coffee.flavor_profile.some(flavor => flavor.toLowerCase().includes(this.search.toLocaleLowerCase()));

          const grind = coffee.grind_option.some(grind => grind.toLowerCase().includes(this.search.toLocaleLowerCase()));

          return text || flavor || grind;
        });
      }
    },
    async checkLogin() {
      try {
        const res = await axios.get('http://localhost:3001/admin/status', { withCredentials: true });
        this.isLogin = res.data.isLogin;
      } catch (err) {
        console.error('로그인 상태 확인 중 문제 발생', err);
      }
    },
    async logout() {
      try {
        await axios.get('http://localhost:3001/admin/logout', { withCredentials: true });
        console.log("di");
        this.isLogin = false;
        this.$router.go('/home');
      } catch (err) {
        console.error('로그아웃 중 문제 발생', err);
      }
    }
  }

}
</script>

<style scoped>
.body {
  margin: 0;
}

.list-container {
  margin: 0;
  
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 600;
}

.navigation-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  padding: 20px 20px 0px 20px;
}

.logo {
  height: 45px;
  width: auto;
}


.search-input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-bottom: 1px solid white;
  background-color: black;
  color: white;
  font-size: 18px;
  width: 10%;
}

.search-input:focus {
  outline: none;
}

.coffees-grid {
  display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    text-align: center;
    padding: 20px;
}

.coffee-image {
  background-color: #D9D9D9;
  max-width: 80%;
  border-radius: 5px;
}

.coffee-image:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.coffee-name {
  color: white;
  padding-bottom: 15px;
  font-size: 1.3em;
  text-decoration: underline black;
}


.coffee-name:hover {
  text-decoration: underline white;
}

.logout-container {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
}

.logout {
  color: #333;
  background: black;
  border: none;
  font-size: 1.5em;
  font-weight: 600;
}

@media (min-width: 900px) {

  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .list-container {
    width: 40%;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

</style>