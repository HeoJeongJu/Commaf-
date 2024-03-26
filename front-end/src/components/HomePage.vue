<template>
  <div id="app" class="container">
    <video autoplay loop muted class="background-video">
      <source src="../assets/video/coffee_-_82042 (540p).mp4" type=" video/mp4">
    </video>
    <main class="container">
      <div class="grid">
        <section>
          <div class="hero">
            <h1>Choose Your<br>Perfect<br>Coffee</h1><br><br>
            <div class="button-group">
              <button class="start" @click="startQuiz">Start Quiz</button>
              <button class="look" @click="takeALook">Take a Look</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    startQuiz() {
      this.$router.push('/start');
    },
    takeALook() {
      this.$router.push('/list');
    },
  }
}
</script>

<style scoped>

.background-video {
  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #f0f0f0;
  text-align: center;
}

.hero h1 {
  font-size: 6rem;
  margin-bottom: 2rem;
  color: #C1D3FE;
  font-family: 'Climate Crisis', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "YEAR" 1979;
}

.button-group .start {
  margin: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background: #E2EAFC;
  border: solid #E2EAFC;
  border-radius: 7px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.button-group .look {
  margin: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background: #B6CCFE;
  border: solid #B6CCFE;
  border-radius: 7px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.button-group .start:hover {
  background-color: white;
}

.button-group .look:hover {
  background-color: white;
}



/* 모바일 */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .button-group .start, .button-group .look {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    margin: 0.25rem;
    border-radius: 5px;
  }

  .hero {
    padding: 10px;
  }

  .background-video {
    transform-origin: center;
  }
}

</style>