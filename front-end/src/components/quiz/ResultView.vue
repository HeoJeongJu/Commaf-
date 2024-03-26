<template>
    <div class="result-container">
        <div class="logo">
            <img src="../../assets/logo.png" class="img" alt="logo">
        </div><br>

        <div class="product-card">
            <p class="sub-title">이거 부제목</p>
            <h2 class="product-title"><i>Signature Blend</i></h2>

            <img class="product-image" src="../../assets/image.png" alt="Signature Blend Coffee">
            <p class="product-description">
                여기 설명임
            </p>
            <div class="button-group">
                <button class="buy" @click="buyNow">Buy Now</button>
                <button class="more" @click="learnMore">Learn More</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        buyNow() {
            this.$router.push('');
        },
        learnMore() {
            this.$router.push('/item:1');
        },
    }
}
</script>

<style>
.result-container {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-optical-sizing: auto;
    font-style: normal;
}


.logo {
    padding: 20px;
    border: "0";
}

.product-card {
    max-width: 78%;
    margin: auto;
    padding: 20px;
    background: #D9D9D9;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-family: Arial, sans-serif;
    color: black;
    position: relative;
}

.product-title {
    font-size: 2.4em;
    margin: 0 0 0 0;
    font-weight: bold;
}

.sub-title {
    font-size: 1.6em;
    margin: 0 0 0 0;
    font-weight: 450;
}

.product-description {
    font-size: 0.9em;
    margin-bottom: 20px;
    font-weight: 500;
}

.product-image {
    width: 80%;
    height: auto;
}

.button-group {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.button-group .buy {
    padding: 10px 20px;
    border: none;
    border-radius: 40px;
    background: #6DB1E2;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button-group .more {
    padding: 10px 20px;
    border: none;
    border-radius: 30px;
    background: #EE9974;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button-group button:hover {
    background: black;
}



/* 모바일 */

@media (max-width: 844px) {
    .product-card {
        max-width: 78%;
        height: 80%;
    }
}
</style>