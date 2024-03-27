<template>
  <div class="product-details">
    <nav class="navigation-bar">
      <i class="fa-solid fa-arrow-left-long fa-2xl" style="color: #ffffff;"></i>
      <img src="../assets/logo.png" class="img" alt="logo">
      <button class="buy" @click="buyNow">Buy Now</button>
    </nav>

    <div class="product-content">
      <div class="product-image-box">
        <img src="../assets/image.png" alt="Golden Sunrise Coffee" class="product-image">
      </div>
      <h1 class="product-title">Golden Sunrise</h1>
      <p class="product-price">$10.99</p>
      <div class="product-description">
        <p>A rich, full-bodied coffee with notes of dark chocolate and black cherry. Grown on the slopes of a
          mist-covered mountain in Central America.</p>
        <p><strong>region:</strong> Africa</p>
        <p><strong>weight:</strong> 500g</p>
        <p><strong>roast level:</strong> 2</p>
        <p><strong>flavor profile:</strong> Citrus</p>
        <p><strong>grind option:</strong> [Whole Bean, Cafetiere, Filter, Espresso]</p>
      </div>
    </div>

    <div class="map">
      <br>
      <br>
      <p>원두를 사용하는 곳</p>
      <div>여기 지도</div>
    </div>
  </div>
</template>

<script>
export default {
  goBack() {
    this.$router.go(-1); // 이전 페이지로 돌아가기
  },
  buyNow() {
    // 구매 로직
  },
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

.img {
  border: "0";
  height: 45px;
  width: auto;
  margin-left: 30px;
}

.buy {
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
  font-size: 1.5em;
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