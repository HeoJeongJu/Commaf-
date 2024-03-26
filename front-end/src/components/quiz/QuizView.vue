<template>
  <div class="container">
    <div class="logo">
      <img src="../../assets/logo.png" class="img" alt="logo">
    </div><br>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <br>
    <p class="question">여기 질문 들어갈 자리임</p>
    <br>
    <div class="card-container">
      <div class="card left">
        <img alt="image">
        <div class="card-title">America</div>
      </div>
      <div class="card right">
        <img alt="image">
        <div class="card-title">Africa, Asia, Middle East</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      progress: 90
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  background-color: black;
}

.logo {
  padding: 20px;
  border: "0";
}

.logo img {
  border: "0";
  height: 50px;
}

.progress-bar-container {
  text-align: center;
  width: 80%;
  background-color: #e0e0e0;
  border-radius: 5px;
  display: flex;
  margin: 0 auto;
}

.progress-bar {
  height: 18px;
  background-color: #1853EB;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
}

.question {
  text-align: center;
  color: white;
}

.card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  vertical-align: middle;
  align-items: center;
  height: 50vh;
  text-align: center;
}


.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 40%;
  transition: transform 0.3s ease;
  height: 80%;
}

.card:hover {
  transform: scale(1.05);
}


.left {
  background-color: #9994D4;
  font-size: 1.4em;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.right {
  background-color: #7FC793;
  font-size: 1.4em;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
</style>