<template>
    <div class="result-container">

        <nav class="navigation-bar">
            <a href="/">
                <img src="../../assets/logo.png" class="logo" alt="logo">
            </a>
            <a href="https://coffee-learn.mooo.com/items/coffee_learn/64b18c48ae0a140a8801de36" target="_blank">
                <button>Buy Now</button>
            </a>
        </nav>

        <div v-if="recommendation" class="product-card">
            <p class="sub-title">{{ recommendation.sub_title }}</p>
            <h2 class="product-title"><i>{{ recommendation.name }}: {{ recommendation.sub_name }}</i></h2>

            <img class="product-image" :src="recommendation.image_url" :alt="recommendation.name">
            <p class="product-description">
                {{ recommendation. description }}
            </p>
            <div class="button-group">
                <button class="Retry" @click="Retry">Retry</button>
                <button class="more" @click="learnMore">Learn More</button>
            </div>
        </div>

        <div v-else>
            결과 생성하는 중...
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            recommendation: null
        };
    },
    async created() {
        await this.getRecommData();
    },
    methods: {
        async getRecommData() {
            const getRecommendation = this.$route.query.recommendation;

            try {
                const res = await axios.get(`http://localhost:3001/recommendations/${getRecommendation}`);
                this.recommendation = res.data;
            } catch(err) {
                console.error('결과를 받아오는 도중 문제가 생김', err);
            }
        },
        buyNow() {
            this.$router.push('');
        },
        learnMore() {
            this.$router.push(`/item/${this.recommendation.name}`);
        },
        Retry() {
            this.$router.push({ name: 'quiz' });
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
    font-size: 1.4em;
    margin: 0 0 0 0;
    margin-bottom: 10px;
}

.product-description {
    font-size: 1.5em;
    margin-bottom: 30px;
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

.button-group .Retry {
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