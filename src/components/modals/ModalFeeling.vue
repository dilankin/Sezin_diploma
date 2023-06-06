<template>
    <ModalComponent :isOpen="value" @close="$emit('close')">
        <div class="feeling" v-if="feeling">
            <p class="feeling-info">{{ $t('ediFeeling') }}</p>
            <p>{{ $t('name') }}: <span>{{ feeling.name }}</span></p>
            <p>{{ $t('score') }}: <span>{{ feeling.score }}</span></p>
            
            <div class="feeling__exercises">
                <h5 class="titleFeel">{{ $t('staties') }}</h5>
                <div class="feeling__exercises-inputs">
                    <p>{{ $t('title') }}</p>
                    <input type="text" v-model="ar_title" />
                    <p>{{ $t('desc') }}</p>
                    <input type="text" v-model="ar_description" />
                    <button @click="saveArticle">{{ $t('addAricle') }}</button>
                </div>
                <!-- <div class="feeling__exercises-items">
                    <div class="feeling__exercises-items-item" v-for="item in feeling.articles" :key="item">
                        {{ item }}
                    </div>
                </div> -->
            </div>

            <div class="feeling__exercises">
                <h5 class="titleFeel">{{ $t('video') }}</h5>
                <div class="feeling__exercises-inputs">
                    <p>{{ $t('title') }}</p>
                    <input type="text" v-model="vi_title" />
                    <p>{{ $t('desc') }}</p>
                    <input type="text" v-model="vi_description" />
                    <p>{{ $t('linkVideo') }}</p>
                    <input type="text" v-model="vi_videoUrl" />
                    <button @click="saveVideo">{{ $t('addVideo') }}</button>
                </div>
                <!-- <div class="feeling__exercises-items">
                    <div class="feeling__exercises-items-item" v-for="item in feeling.videos" :key="item">
                        {{ item }}
                    </div>
                </div> -->
            </div>
            <div class="feeling__exercises">
                <h5 class="titleFeel">Exercises</h5>
                <div class="feeling__exercises-inputs">
                    <p>{{ $t('desc') }}</p>
                    <input type="text" v-model="ex_description" />
                    <p>{{ $t('name') }}</p>
                    <input type="text" v-model="ex_name" />
                    <p>{{ $t('second') }}</p>
                    <input type="text" v-model="ex_seconds" />
                    <p>{{ $t('addIMage') }}</p>
                    <input type="file" ref="ex_file" />
                    <button @click="saveExercise">{{ $t('addExer') }}</button>
                </div>
                <!-- <div class="feeling__exercises-items">
                    <div class="feeling__exercises-items-item" v-for="item in feeling.exercises" :key="item">
                        {{ item }}
                    </div>
                </div> -->
            </div>
            <div class="feeling__exercises">
                <!-- <div class="feeling__title-text">
                    <p>Feeling ID: {{ feeling.id }}</p>
                    <p>Feeling name: {{ feeling.name }}</p>
                    <p>Feeling score: {{ feeling.score }}</p>
                </div> -->
                <div class="feeling__title-buttons">
                    <button @click="deleteFeeling" class="feeling__title-buttons-delete">{{ $t('delete') }}</button>
                    <button @click="$emit('close')" class="feeling__title-buttons-cancel">{{ $t('cancel') }}</button>
                </div>
            </div>
            
        </div>
    </ModalComponent>
</template>
<script>
import ModalComponent from './ModalComponent.vue';

export default {
    components: { ModalComponent },
    data: () => ({
        modalVisible: false,
        feeling: false,
        currentIndex: 0,
        ex_seconds: '',
        ex_name: '',
        ex_description: '',
        vi_title: '',
        vi_description: '',
        vi_videoUrl: '',
        ar_title: '',
        ar_description: '',
    }),
    props: ["value", "current"],
    computed: {
        checkTest() {
            return this.testData.every(item => item.variant !== null);
        }
    },
    async created() {
        this.fetchFeeling()
    },
    methods: {
        async fetchFeeling() {
            await this.$axios.get("feeling")
            .then(res => {
                this.feeling = res.data.data.find(item => item.id === parseInt(this.current))
            })
            .catch(err => {
                console.log(err);
            })
        },
        async deleteFeeling() {
            await this.$axios.delete(`feeling/${this.current}`)
            .then(res => {
                this.$toaster.success('Success');
                this.$emit('fetch')               
                this.$emit('close')
            })
            .catch(err => {
                console.log(err);
            })
        },
        async saveExercise() {
            const formData = new FormData();
            formData.append('description', this.ex_description);
            formData.append('name', this.ex_name);
            formData.append('seconds', this.ex_seconds);
            formData.append('feelingId', this.current);
            formData.append('image', this.$refs.ex_file.files[0]);
            await this.$axios.post(`exercise`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then(res => {
                this.$toaster.success('Success')
                this.ex_seconds = ''
                this.ex_name = ''
                this.ex_description = ''
                this.fetchFeeling()
            })
                .catch(err => {
                console.log(err);
            })
        },
        async saveVideo() {
            await this.$axios.post(`video`, {
                title: this.vi_title,
                description: this.vi_description,
                videoUrl: this.vi_videoUrl,
                feelingId: this.current
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then(res => {
                this.$toaster.success('Success')
                this.vi_title = ''
                this.vi_videoUrl = ''
                this.vi_description = ''
                this.fetchFeeling()
            })
                .catch(err => {
                console.log(err);
            })
        },
        async saveArticle() {
            await this.$axios.post(`article`, {
                title: this.ar_title,
                description: this.ar_description,
                feelingId: this.current
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then(res => {
                this.$toaster.success('Success')
                this.ar_videoUrl = ''
                this.ar_title = ''
                this.ar_description = ''
                this.fetchFeeling()
            })
                .catch(err => {
                console.log(err);
                this.$toaster.error('Error')
            })
        }
    },
    watch: {
        value() {
            this.feeling = false
            this.value === true ? this.fetchFeeling() : ''
        }
    }
}
</script>
<style lang="scss" scoped>
.titleFeel {
    color: black;
    font-weight: 700;
    font-size: 22px;
}
  .feeling {
    z-index: 999;
    padding: 40px;
    background: white;
    width: 800px;
    min-height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
        width: 100%;
        box-sizing: border-box;
    }
    &__exercises {
        width: 100%;
        margin: auto;
        &-inputs {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
            input {
                height: 42px;
                padding: 0 16px;
                outline: none;
                background: #FFFFFF;
                border: 1px solid #E5E8ED;
                border-radius: 4px;
                width: 100%;
                box-sizing: border-box;
            }
            button {
                height: 42px;
                width: 50%;
                margin: auto;
                outline: none;
                color: white;
                font-weight: 700;
                font-size: 14px;
                border: none;
                background: purple;
                border-radius: 4px;
                box-sizing: border-box;
            }
        }
    }
    &-info {
        color: pink;
        text-align: center;
        font-weight: 700;
        font-size: 28px;
    }
    &__title {
        &-text {
            margin: 16px 0;
            display: flex;
            gap: 16px;
        }
        &-buttons {
            margin-top: 16px;
            text-align: center;
            display: flex;
            gap: 16px;
            justify-content: center;
            &-delete {
                cursor: pointer;
                background: rgb(172, 2, 2);
                border-radius: 4px;
                height: 44px;
                font-size: 16px;
                font-weight: 700;
                color: white;
                outline: none;
                border: none;
                padding: 0 24px;
            }
            &-cancel {
                cursor: pointer;
                background: #17696A;
                border-radius: 4px;
                height: 44px;
                font-size: 16px;
                font-weight: 700;
                color: white;
                outline: none;
                border: none;
                padding: 0 24px;
            }
        }
    }
  }
</style>