<template>
  <div id="app" class="container">
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
      // Quiz start logic
    },
    takeALook() {
      // Browse coffee selection logic
    }
  }
}
</script>

<style scoped>
#app {
  background-color: black;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #f0f0f0;
  background-color: #121212;
  text-align: center;
}

.hero h1 {
  font-size: 6rem;
  margin-bottom: 2rem;
  color: #C1D3FE;
  font-family: 'Climate Crists', sans-serif;

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

.button-group button:hover {
  background-color: #fffFFF;
}
</style>