<template>
    <div class="result-container">

        <nav class="navigation-bar">
            <a href="/">
                <img src="../../assets/logo.png" class="logo" alt="logo">
            </a>
            <button @click="buyNow">Share</button>
        </nav>

        <div class="product-card">
            <p class="sub-title">이거 부제목</p>
            <h2 class="product-title"><i>{{ recommendation }}</i></h2>

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
    data() {
        return {
            recommendation: null
        };
    },
    created() {
        this.recommendation = JSON.parse(this.$route.query.recommendation);
    },
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

.result-container {
    margin: 0;

    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 600;
}


.logo {
    height: 45px;
    width: auto;
}

.product-card {
    text-align: center;
    max-width: 82%;
    margin: auto;
    padding: 20px;
    background: #D9D9D9;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-family: Arial, sans-serif;
    color: black;
    position: relative;
    text-align: center;
}

.product-title {
    font-size: 2.4em;
    margin: 0 0 0 0;
    font-weight: bold;
    text-align: center;
}

.sub-title {
    font-size: 1.6em;
    margin: 0 0 0 0;
    margin-bottom: 10px;
}

.product-description {
    font-size: 0.9em;
    margin-bottom: 20px;
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




@media (min-width: 900px) {

    #app {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
    }

    .result-container {
        width: 40%;
        margin: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
}
</style>