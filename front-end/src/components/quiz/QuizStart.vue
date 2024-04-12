<template>
    <div class="greeting-container">
        <h3 class="fade-in" style="--delay:0s;">안녕하세요!</h3>
        <p class="fade-in" style="--delay:1.5s;">Commafé에 오신 것을 환영해요</p>
        <p class="fade-in" style="--delay:2.5s;">당신의 커피 취향을 알기 위해 </p>
        <p class="fade-in" style="--delay:3.5s;">몇가지 질문을 드릴께요</p>
    </div>
</template>

<script>
export default {
    mounted() {
        setTimeout(() => {
            this.$router.push('/quiz');
        }, 7000);
    }
}
</script>

<style scoped>
.greeting-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    text-align: center;
    background: black;
    color: white;
    padding: 15px;
}

h3 {
    margin-bottom: 15px;
    font-size: 3em;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
}

p {
    margin-bottom: 10px;
    font-size: 1.5em;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
}

.fade-in {
    opacity: 0;
    animation: fadeInAnimation 1s ease forwards;
    animation-delay: var(--delay);
}

@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

</style>