<template>
    <div class="edit-container">
        <nav class="navigation-bar">
            <i class="fa-solid fa-grip-lines fa-2xl" style="color: #ffffff;"></i>
            <a href="/">
                <img src="../../assets/logo.png" class="logo" alt="logo">
            </a>

            <button class="cancel" @click="cancel()">Cancel</button>
        </nav>
        <div>
            <input type="file" id="upload-image" hidden @change="getFileName($event.target.files)"
                :class="{ 'large-image': imageSelected }" />
            <label for="upload-image" class="upload-image-label">
                <img v-if="imagePreview" :src="imagePreview" id="preview" />
                <img v-else src="../../assets/icon_upload.png" id="preview" />
            </label>
        </div>

        <form @submit.prevent="submitForm">
            <div class="form-group form-group--inline">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="coffee.name">
            </div>
            <div class="form-group form-group--inline">
                <label for="name">Price($)</label>
                <input type="number" id="price" step="0.01" v-model="coffee.price">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" v-model="coffee.description"></textarea>
            </div>
            <div class="form-group">
                <label for="region">region</label>
                <select id="region" v-model="coffee.region">
                    <option value="Africa">Africa</option>
                    <option value="South America">South America</option>
                    <option value="Central America">Central America</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Middle East">Middle East</option>
                </select>
            </div>
            <div class="form-group form-group--inline">
                <label for="weight">Weight(g)</label>
                <input type="number" id="weight" v-model="coffee.weight">
            </div>
            <div class="form-group form-group--inline">
                <label for="roast">Roast Level</label>
                <input type="number" id="roast" v-model="coffee.roast_level" min="1" max="5">
            </div>
            <div class="form-group">
                <label for="flavor">Flavor</label>
                <div class="add-flavor" v-for="(flavor, index) in coffee.flavor_profile" :key="index">
                    <select :id="'flavor_profile' + index" v-model="coffee.flavor_profile[index]">
                        <option value="Citrus">Citrus</option>
                        <option value="Dark Chocolate">Dark Chocolate</option>
                        <option value="Black Cherry">Black Cherry</option>
                        <option value="Nutty">Nutty</option>
                        <option value="Smooth">Smooth</option>
                        <option value="Cocoa">Cocoa</option>
                        <option value="Hazelnut">Hazelnut</option>
                        <option value="Spicy">Spicy</option>
                        <option value="Earthy">Earthy</option>
                        <option value="Cinnamon">Cinnamon</option>
                        <option value="Clove">Clove</option>
                        <option value="Almond">Almond</option>
                        <option value="Toffee">Toffee</option>
                        <option value="Coconut">Coconut</option>
                        <option value="Espresso">Espresso</option>
                        <option value="Vanilla">Vanilla</option>
                        <option value="Caramel">Caramel</option>
                        <option value="Molasses">Molasses</option>
                        <option value="Chocolate">Chocolate</option>
                        <option value="Cardamom">Cardamom</option>
                        <option value="Smoke">Smoke</option>
                        <option value="Blackcurrant">Blackcurrant</option>
                        <option value="Floral">Floral</option>
                        <option value="Honey">Honey</option>
                        <option value="Milk Chocolate">Milk Chocolate</option>
                        <option value="Tropical Fruit">Tropical Fruit</option>
                        <option value="Citrusy">Citrusy</option>
                        <option value="Blueberry">Blueberry</option>
                    </select>
                </div>
                <button type="button" @click="handleAddFlavor()">+</button>
            </div>

            <div class="form-group">
                <label for="grind">Grind</label>
                <div class="add-grind" v-for="(grind, index) in coffee.grind_option" :key="index">
                    <select :id="'grind_option' + index" v-model="coffee.grind_option[index]">
                        <option value="Whole Bean">Whole Bean</option>
                        <option value="Cafetiere">Cafetiere</option>
                        <option value="Filter">Filter</option>
                        <option value="Espresso">Espresso</option>
                        <option value="French press">French press</option>
                        <option value="Pour Over">Pour Over</option>
                    </select>
                </div>
                <button type="button" @click="handleAddGrinderOption()">+</button>
            </div>

            <br>
            <br>
            <hr>
            <h1 class="result">커피 추천 결과</h1>
            <div class="form-group form-group--inline">
                <label for="sub_name">Sub Name</label>
                <input type="text" id="sub_name" v-model="recommendation.sub_name">
            </div>
            <div class="form-group form-group--inline">
                <label for="sub_title">Sub Title</label>
                <input type="text" id="sub_title" v-model="recommendation.sub_title">
            </div>
            <div class="form-group">
                <label for="comm_description">Description</label>
                <textarea id="comm_description" v-model="recommendation.description"></textarea>
            </div>

            <button v-if="isEditMode" type="submit" class="save">수정</button>
            <button v-else type="submit" class="save">저장</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            originCoffee: null,
            originRecomm: null,
            imageFile: null,
            newFlavor: 'Citrus',
            newGrind: 'Whole Bean',
            imageSelected: false,
            imagePreview: '',
            imageChanged: false,
            isLogin: false
        }
    },
    async created() {
        await this.checkLogin();

        if(this.isLogin) {
                if (this.coffee && this.coffee.image_url) {
                this.imagePreview = this.coffee.image_url;
                this.imageSelected = true;

                this.originCoffee = JSON.parse(JSON.stringify(this.coffee));
                this.originRecomm = JSON.parse(JSON.stringify(this.recommendation));
            }
        } else {
            alert("접근 권한이 없습니다.");
            this.$router.go(-1);
        }
    },
    methods: {
        ...mapActions(['addFlavor', 'addGrinderOption', 'setEditMode']),
        handleAddFlavor() {
            this.addFlavor(this.newFlavor);
        },
        handleAddGrinderOption() {
            this.addGrinderOption(this.newGrind);
        },
        async getFileName(files) {
            if(files.length > 0) {
                const file = files[0];
                this.imageChanged = true;
                this.imageFile = file;
                this.previewImage(file);
            }
        },
        previewImage(file) {
            const reader = new FileReader();
            reader.onload = e => {
                this.imagePreview = e.target.result;
                this.imageSelected = true;
            };
            reader.readAsDataURL(file);
        },
        async getRecommendation() {
            this.fetchRecommendation();
        },
        async submitForm() {
            const formData = new FormData();

            if (this.imageChanged) {
                formData.append('image', this.imageFile);
            }
                
            // coffee에 대한 처리
            Object.keys(this.coffee).forEach(key => {
                // coffee와 recommendation 분리하기 위해
                const formKey = `coffee_${key}`;

                // 수정모드이고 변경된 것이 존재할때
                if (this.isEditMode && this.originCoffee && JSON.stringify(this.coffee[key]) !== JSON.stringify(this.originCoffee[key])) {
                    if (Array.isArray(this.coffee[key])) {
                        this.coffee[key].forEach(value => formData.append(formKey, value));
                    } else {
                        formData.append(formKey, this.coffee[key]);
                    } 
                
                // 추가 일때
                } else if (!this.isEditMode) {
                    if (Array.isArray(this.coffee[key])) {
                        this.coffee[key].forEach(value => formData.append(key, value));
                    } else {
                        formData.append(key, this.coffee[key]);
                    }
                }
            });

            // recommendation 데이터에 대한 처리
            Object.keys(this.recommendation).forEach(key => {
                const formKey = `recommendation_${key}`; 

                if (this.isEditMode && this.originRecomm && JSON.stringify(this.recommendation[key]) !== JSON.stringify(this.originRecomm[key])) {
                    formData.append(formKey, this.recommendation[key]);
                } else if(!this.isEditMode) {
                    formData.append(key, this.recommendation[key]);
                }
            });


            try{
                if (this.isEditMode) {
                    const response = await axios.patch(`http://localhost:3001/admin/item/${this.originCoffee.name}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: true
                    });
                    console.log("Updated successfully:", response.data);
                } else {
                    const response = await axios.post('http://localhost:3001/admin/addItem', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: true
                    });
                    console.log("Added successfully:", response.data);
                }

                this.setEditMode();
                this.$router.push({ name: 'items' });
            } catch (err) {
                alert(err.response.data);
                console.log(err.response.data);
            }
        },
        cancel() {
            this.setEditMode();
            this.$router.go(-1);
        },
        async checkLogin() {
            try {
                const res = await axios.get('http://localhost:3001/admin/status', { withCredentials: true });
                this.isLogin = res.data.isLogin;
            } catch (err) {
                console.error('로그인 상태 확인 중 문제 발생', err);
            }
        }
    },
    computed: {
        ...mapState(['coffee', 'recommendation', 'isEditMode']),
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

.edit-container {
    display: flex;
    flex-direction: column;
    background-color: black;
    color: white;

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

.fa-2xl {
    font-size: 2.6em;
    cursor: pointer;
}

.fa-solid .fa-grip-lines .fa-2xl {
    cursor: pointer;
}


.logo {
    border: "0";
    height: 45px;
    width: auto;
    margin-left: 30px;
}

.cancel {
    color: white;
    background: black;
    cursor: pointer;
    border: none;
    font-size: 0.9em;
    font-weight: 600;
    padding-bottom: 30px;
}

.upload-image-label {
    display: flex;
    justify-content: center;
    align-items: center;
}

.edit-container label img {
    max-width: 30%;
    height: auto;
    cursor: pointer;
    padding: 30px 0;
}

.form-group {
    margin-bottom: 20px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
}

.form-group label {
    padding-right: 10px;
    padding-bottom: 5px;
}

.form-group--inline {
    flex-direction: row;
    align-items: center;
}
.form-group--inline label {
  margin-bottom: 0;
  margin-right: 10px;
}

.form-group input[type="text"],
.form-group input[type="number"] {
    width: 60%;
    padding: 10px;
    background-color: black;
    color: white;
    border: none;
    border-bottom: 1px solid white;
    box-sizing: border-box;

}

.form-group input[type="text"],
.form-group input[type="number"]:focus {
    outline: none;
}

.form-group select {
    width: 80%;
    padding: 10px;
    background-color: #2c2c2e;
    border: none;
    color: white;
}

.form-group textarea {
    width: 85%;
    height: 100px;
    padding: 10px;
    background-color: #2c2c2e;
    border: none;
    color: white;
    font-size: 1em;
 }

.form-group button {
    width:10%;
}

.add-flavor, .add-grind {
    margin-bottom: 15px;
}

button {
    background-color: #2c2c2e;
    color: white;
    border: none;
    padding: 10px;
}

button:hover {
    background-color: black;
}


button[type="submit"] {
    padding: 0.8em 1em;
    background-color: #0064FF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    width: 100%;
    margin-top: 50px;
}

.large-image img {
    max-width: 100%;
    height: auto;
}

.result {
    padding-left: 20px;
}

@media (min-width: 900px) {

    #app {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
    }

    .edit-container {
        width: 40%;
        margin: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
}
</style>