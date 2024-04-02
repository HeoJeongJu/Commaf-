<template>
  <div class="product-details">
    <nav class="navigation-bar">
      <i class="fa-solid fa-arrow-left-long fa-2xl" @click="goBack" style="color: #ffffff;"></i>
      <a href="/">
        <img src="../assets/logo.png" class="logo" alt="logo">
      </a>

      <button class="edit" v-if="isLogin">Edit</button>
      <button class="buy" v-else>Buy Now</button>
    </nav>

    <div class="product-content">
      <div class="product-image-box">
        <img :src="coffee.image_url" alt="Coffee" class="product-image">
      </div>
      <h1 class="product-title">{{ coffee.name }}</h1>
      <p class="product-price">${{ coffee.price }}</p>
      <div class="product-description">
        <p>{{ coffee.description }}</p>
        <p><strong>region: </strong> {{ coffee.region }}</p>
        <p><strong>weight: </strong> {{ coffee.weight }}g</p>
        <p><strong>roast level: </strong> {{ coffee.roast_level }}</p>
        <p>
          <strong>flavor profile: </strong>
          <span v-for="flavor in coffee.flavor_profile" :key="flavor">
            {{ flavor }}&nbsp;
          </span>
        </p>
        <p>
          <strong>grind option: </strong>
          <span v-for="grind in coffee.grind_option" :key="grind">
            {{ grind }}&nbsp;
          </span>
        </p>
      </div>
    </div>

    <div class="map">
      <br>
      <br>
      <p>원두를 사용하는 곳</p>

      <naver-map class="naver-map" :map-options="mapOptions">
        <naver-marker v-for="cafe in cafes" :key="cafe._id" :latitude="Number(cafe.x)" :longitude="Number(cafe.y)" />
      </naver-map>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { NaverMap, NaverMarker } from 'vue3-naver-maps'

export default {
  components: {
    NaverMap, NaverMarker
  },
  data() {
    return {
      coffee: {},
      mapOptions: {
        latitude: 37.51347,
        longitude: 127.041722,
        zoom: 13,
      },
      cafes: [],
      isLogin: false
    }
  },
  async created() {
    await this.checkLogin();
    await this.getCoffee();
    await this.getMarker();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }, 
    async getCoffee() {
      try {
        const coffeeName = this.$route.params.name;
        const res = await axios.get(`http://localhost:3001/coffee/${coffeeName}`);
        this.coffee = res.data;
      } catch (err) {
        console.error('커피 내용을 받아오는 도중 문제가 생김', err);
      }
    },
    async getMarker() {
      try {
        const res = await axios.get(`http://localhost:3001/cafe/${
          this.coffee.name}`);
        this.cafes = res.data;
      } catch(err) {
        console.error("마커를 받아오는 도중 문제가 생김", err);
      }
    },
    async checkLogin() {
      try {
        const res = await axios.get('http://localhost:3001/admin/status', { withCredentials: true });
        this.isLogin = res.data.isLogin; 
      } catch (err) {
        console.error('로그인 상태 확인 중 문제 발생', err);
      }
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

#app {
  margin: 0 auto;
  max-width: 100%;
}

.navigation-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  padding: 20px 20px 0px 20px;
}

.fa-2xl {
  font-size: 2.6em;
}

.fa-solid .fa-arrow-left-long .fa-2xl {
  cursor: pointer;
}

.img {
  border: "0";
  height: 45px;
  width: auto;
  margin-left: 30px;
}



.buy, .edit{
  color: white;
  background: black;
  border: none;
  font-size: 0.9em;
  font-weight: 600;
}

.product-details {
  background-color: black;
  color: #333;

  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 600;
}

.product-content {
  width: 100%;
  padding: 0;
}

.product-image-box {
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
  background: #D9D9D9;
  text-align: center;
}

.product-image {
  width: 100%;
  height: auto;
  margin: 0 auto;
  box-sizing: border-box;
}

.product-title {
  text-align: left;
  color: white;
  font-size: 2.4em;
  margin-bottom: 0.5em;
  padding-left: 20px ;
}

.product-price {
  font-size: 1.5em;
  color: #EE9974;
  margin-bottom: 1em;
  text-align: left;
  padding-left: 20px;
}

.product-description {
  text-align: left;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  font-size: 1.2em;
  padding-right: 20px;
}

.product-description p {
  margin-bottom: 0.5em;
}

.product-description p strong {
  color: #555;
}

.map {
  color: white;
  padding-left: 20px;
  font-weight: 600;
}

.naver-map {
  width: 90%;
  height: 500px;
  padding-bottom: 50px;
}



@media (min-width: 900px) {

  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .product-details {
    width: 40%;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}
</style>