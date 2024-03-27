<template>
  <div class="list-container">

    <nav class="navigation-bar">
      <a href="/">
        <img src="../assets/logo.png" class="logo" alt="logo">
      </a>
      <input class="search-input" type="text" placeholder="검색: 이름, 향, 원산지 등..." />
      <i class="fa-solid fa-magnifying-glass fa-2xl" style="color: #ffffff;"></i>
    </nav>

    <div class="products-grid">

    </div>


  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.body {
  margin: 0;
}

.list-container {
  margin: 0;
  
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-optical-sizing: auto;
  font-style: normal;
  font-weight: 600;
}

.navigation-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  padding: 20px 20px 0px 20px;
}

.logo {
  height: 45px;
  width: auto;
}


.search-input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-bottom: 1px solid white;
  background-color: black;
  color: white;
  font-size: 25px;
  width: 10%;
}

.search-input:focus {
  outline: none;
}



@media (min-width: 900px) {

  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .list-container {
    width: 40%;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

</style>