<template>
    <div class="edit-container">
        <nav class="navigation-bar">
            <i class="fa-solid fa-grip-lines fa-2xl" style="color: #ffffff;"></i>
            <a href="/">
                <img src="../../assets/logo.png" class="logo" alt="logo">
            </a>

            <button class="cancel">Cancel</button>
        </nav>
        <div>
            <input type="file" id="upload-image" hidden @change="getFileName($event.target.files)"
                :class="{ 'large-image': imageSelected }" />
            <label for="upload-image" class="upload-image-label">
                <img src="../../assets/icon_upload.png" id="preview" />
            </label>
        </div>

        <form @submit.prevent="submitForm">
            <div class="form-group form-group--inline">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="coffee.name">
            </div>
            <div class="form-group form-group--inline">
                <label for="name">Price($)</label>
                <input type="number" id="price" step="0.01"  v-model="coffee.price">
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
                <button type="button" @click="addFlavor()">+</button>
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
                <button type="button" @click="addGrinderOption()">+</button>
            </div>

            <br>
            <br>
            <hr>
            <h1>커피 추천 결과</h1>
            <div class="form-group form-group--inline">
                <label for="sub_name">Sub Name</label>
                <input type="text" id="sub_name" v-model="coffee.sub_name">
            </div>
            <div class="form-group form-group--inline">
                <label for="sub_title">Sub Title</label>
                <input type="text" id="sub_title" v-model="coffee.sub_title">
            </div>
            <div class="form-group">
                <label for="comm_description">Description</label>
                <textarea id="comm_description" v-model="coffee.comm_description"></textarea>
            </div>

            <button type="submit" class="save">저장</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            coffee: {
                name: '',
                price: 0,
                description: '',
                region: '',
                weight: 0,
                roast_level: 1,
                flavor_profile: [],
                grind_option: [],
                sub_name: '',
                sub_title: '',
                comm_description: ''
            },
            imageFile: null,
            newFlavor: 'Citrus',
            newGrind: 'Whole Bean',
            imageSelected: false
        }
    },
    methods: {
        addFlavor() {
            this.coffee.flavor_profile.push(this.newFlavor);
        },
        addGrinderOption() {
            this.coffee.grind_option.push(this.newGrind);
        },
        async getFileName(files) {
            if(files.length > 0) {
                this.imageFile = files[0];
                this.imageSelected = true;
                this.previewImage();
            }
            
        },
        previewImage() {
            const reader = new FileReader();
            reader.onload = e => {
                const previewImage = document.getElementById('preview');
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(this.imageFile);
        },
        async submitForm() {
            try {
                const formData = new FormData();

                Object.keys(this.coffee).forEach(key => {
                    if (Array.isArray(this.coffee[key])) {
                        this.coffee[key].forEach(value => {
                            formData.append(`${key}[]`, value);
                        });
                    } else {
                        formData.append(key, this.coffee[key]);
                    }
                });

                if(this.imageFile) {
                    formData.append('image', this.imageFile);
                }

                await axios.post('http://localhost:3001/admin/addItem', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });

                this.$router.push({ name: 'items' });
            } catch (err) {
                alert("추가 중 오류가 발생했습니다. 다시 한 번 확인해 주세요.");
                console.error('추가 중 오류가 발생했습니다.', err);
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