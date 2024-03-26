<template>
  <div class="product-details">
    <nav class="navigation-bar">
      <i class="fa-duotone fa-arrow-left fa-xl" style="--fa-primary-color: #ffffff; 
      --fa-secondary-color: #ffffff;" @click="goBack"></i>
      <img src="../assets/logo.png" class="img" alt="logo">
      <button @click="buyNow">Buy Now</button>
    </nav>
    <div class="product-content">
      <img src="../assets/image.png" alt="Golden Sunrise Coffee" class="product-image">
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

<style>
body {
  margin: 0;
}

#app {
  margin: 0;

  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-optical-sizing: auto;
  font-style: normal;
}

.product-details {
  background-color: black;
  color: #333;
  max-width: 400px;
  margin: 0;
  padding: 20px;
}

.navigation-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.product-content {
  text-align: center;
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  background: #D9D9D9;
}

.product-title {
  color: white;
  font-size: 1.5em;
  margin-bottom: 0.5em;
  text-align: left;
}

.product-price {
  font-size: 1.3em;
  color: #EE9974;
  margin-bottom: 1em;
  text-align: left;
}

.product-description {
  text-align: left;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-description p {
  margin-bottom: 0.5em;
}

.product-description p strong {
  color: #555;
}

.map {
  color: white;
}
</style>