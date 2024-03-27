<template>
    <div class="quiz-container">

        <nav class="navigation-bar">
            <a href="/">
                <img src="../../assets/logo.png" class="logo" alt="logo">
            </a>
        </nav>

        <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="question">{{ currentQuestion.question }}</p>
        <div class="card-container">
            <div v-for="(option, index) in currentQuestion.options" :key="index" class="card"
                :class="{left: index % 2 ===0, right: index % 2 !== 0 }" @click="selectOption(option)">
                <div v-html="option.img" class="icon"></div>
                <div class="card-title">{{ option.text }}</div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            currentQuestionIndex: 0,

            // 나중에 DB에서 받아오든가... 
            questions: [
                {
                    id: 1,
                    question: "선호하는 커피 원산지는 어디인가요?",
                    options: [
                        { text: "America(Sentral, South)", img: "<i class=\"fa-solid fa-earth-americas fa-2xl\" style=\"color: #000000;\"></i>", next: 2 },
                        { text: "Africa, Asia Pacific, Middle East", img: "<i class=\"fa-solid fa-earth-asia fa-2xl\" style=\"color: #000000;\"></i>" ,next: 7 }
                    ]
                },
                {
                    id: 2,
                    question: "로스팅 정도를 무엇으로 하시겠습니까?",
                    options: [
                        { text: "ligit-medium roast", img: "<i class=\"fa-solid fa-fire fa-2xl\" style=\"color: #000000;\"></i>" ,next: 3 },
                        { text: "dark roast", img: "<i class=\"fa-solid fa-fire-burner fa-2xl\" style=\"color: #000000;\"></i>", next: 6 }
                    ]
                },
                {
                    id: 3,
                    question: "어떤 분쇄 옵션을 원하시나요?",
                    options: [
                        { text: "Whole Bean or Cafetiere", img: "<i class=\"fa-solid fa-bottle-droplet fa-2xl\" style=\"color: #000000;\"></i>", next: 4 },
                        { text: "Filter or Espresso", img: "<i class=\"fa-solid fa-filter fa-2xl\" style=\"color: #000000;\"></i>" ,next: 14 }
                    ]
                },
                {
                    id: 4,
                    question: "과일 향이 있는 것을 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-lemon fa-2xl\" style=\"color: #ecf000;\"></i>", recommendation: ["Breezy Veans", "Lazy Days"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", next: 5 }
                    ],   
                },
                {
                    id: 5,
                    question: "견과류나 꽃 향기를 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-fan fa-2xl\" style=\"color: #ff94e8;\"></i>", recommendation: ["Andean Almond"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", recommendation: ["Walnut Wonder"] }
                    ]
                },
                {
                    id: 6,
                    question: "견과류나 초콜릿 향을 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-cookie-bite fa-2xl\" style=\"color: #5f2607;\"></i>", recommendation: ["Midnight Mocha", "Harvest Moon"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", recommendation: ["Signature Blend"]}
                    ]
                },
                {
                    id: 7,
                    question: "아프리카 원산지를 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-earth-africa fa-2xl\" style=\"color: #000000;\"></i>", next: 8 },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", next: 9 }
                    ]
                },
                {
                    id: 8,
                    question: "과일향이 있는 것을 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-apple-whole fa-2xl\" style=\"color: #e42121;\"></i>", recommendation: ["Ethiopian Yirgacheffe", "Golden Sunrise"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", recommendation: [ "Savanna Noir", "Wildfire" ] }
                    ]
                },
                {
                    id: 9,
                    question: "아시아 원산지를 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-earth-americas fa-2xl\" style=\"color: #000000;\"></i>", next: 10 },
                        { text: "No", img: "<i class=\"fa-solid fa-ankh fa-2xl\" style=\"color: #000000;\"></i>", recommendation: ["Arabian Nights"] }
                    ]
                },
                {
                    id: 10,
                    question: "스파이시한 향을 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa- solid fa-pepper-hot fa-2xl\" style=\"color: #b61616;\"></i>", recommendation: ["Indo-Viet Roast"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", next: 11 }
                    ]
                }, 
                {
                    id: 11,
                    question: "코코넛향이 나는 것을 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-o fa-2xl\" style=\"color: #000000;\"></i>", recommendation: ["Coconut Kiss"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", next: 12 }
                    ]
                },
                {
                    id: 12,
                    question: "다크 로스트를 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-fire-burner fa-2xl\" style=\"color: #000000;\"></i>", recommendation: ["Sumatra Blend"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", next: 13 }
                    ]
                },
                {
                    id: 13,
                    question: "견과류 향이 나는 것을 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-o fa-2xl\" style=\"color: #000000;\"></i>", recommendation: ["Bali Bliss"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", recommendation: ["Himalayan Heights"] }
                    ]
                },
                {
                    id: 14,
                    question: "과일향이 있는 걸 원하시나요?",
                    options: [
                        { text: "Yes", img: "<i class=\"fa-solid fa-apple-whole fa-2xl\" style=\"color: #e42121;\"></i>", recommendation: ["Chilean Charm"] },
                        { text: "No", img: "<i class=\"fa-solid fa-xmark fa-2xl\" style=\"color: #000000;\"></i>", recommendation: ["Rainforest Rhapsody"] }
                    ]
                }
            ]
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
    methods: {
        selectOption(option) {
            if ('recommendation' in option) {
                this.$router.push({ name: 'result', query: { recommendation: JSON.stringify(option.recommendation[0]) } });
            } else if ('next' in option) {
                this.currentQuestionIndex = this.questions.findIndex(question => question.id === option.next);
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