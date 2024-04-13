<template>
    <div class="quiz-container">

        <nav class="navigation-bar">
            <a href="/">
                <img src="../../assets/logo.png" class="logo" alt="logo">
            </a>
        </nav>

        <div v-if="isLoading">
            데이터 로딩 중...
        </div>
        <div v-else>
            <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            </div>
            <p class="question">{{ currentQuestion.question }}</p>
            <div class="card-container">
                <div v-for="(option, index) in currentQuestion.options" :key="index" class="card"
                    :class="{ left: index % 2 === 0, right: index % 2 !== 0 }" @click="selectOption(option)">
                    <div v-html="option.img" class="icon"></div>
                    <div class="card-title">{{ option.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            currentQuestionIndex: 0,
            questions: [],
            isLoading: true,
            selectedOption: []
        }
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },  
        progress() {
            return (this.currentQuestionIndex / (this.questions.length - 1)) * 100;
        }
    },
    async created() {
        await this.getQuestions();
        this.isLoading = false;
    },
    methods: {
        selectOption(option) {
            if (option.tags) {
                this.selectedOption.push(option.tags);
            }
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
            } else {
                this.fetchRecommendations();
            }
        },
        async getQuestions() {
            try {
                const res = await axios.get('http://localhost:3001/question');
                this.questions = res.data;
            } catch(err) {
                console.error('질문 목록을 받아오는 도중 문제가 생김', err);
            }
        },
        async fetchRecommendations() {
            try {
                const res = await axios.post('http://localhost:3001/recommendations/result', this.selectedOption );

                console.log(res.data);
                if(res.data) {
                    this.$router.push({ name: 'result', query: { recommendation: res.data } });
                } else {
                    alert("조건에 맞는 원두가 없습니다. 추가하거나 다시 한 번 테스트를 진행해 주세요.");
                    this.$router.go({ name: 'quiz' });
                }
                
                
            } catch (err) {
                console.error('추천을 가져오는 중 오류 발생:', err);
            }
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
    width: 100%;
}

.navigation-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
    padding: 20px 20px 30px 20px;
}

.quiz-container {
    width: 100%;
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
    margin-top: 50px;
    text-align: center;
    color: white;
    font-size: 2.5em;
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
    transition: transform 0.3s ease;
}


.left {
    background-color: #9994D4;
    font-size: 1.4em;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    width: 50%;
}

.right {
    background-color: #7FC793;
    font-size: 1.4em;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    width: 50%;
}

.icon {
    height: 45px;
    width: auto;
    margin-bottom: 55px;
}


@media (min-width: 900px) {
    #app {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
    }

    .quiz-container {
        width: 40%;
        margin: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
}
</style>