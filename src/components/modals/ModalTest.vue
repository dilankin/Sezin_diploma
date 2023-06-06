<template>
    <ModalComponent :isOpen="value" @close="$emit('close')">
        <div class="test" v-if="testData.length && etap === 'test'">
            <p  class="test-title">{{ $t('takeASurvey') }}</p>
            <div class="test__nums">
                <div class="test__nums-cifre" :class="currentIndex === id ? 'curid' : testData[id].variant !== null ? 'actid' : ''" @click.stop="currentIndex = id" v-for="(item, id) in testData" :key="item">
                    <p>{{ id + 1 }}</p>
                </div>
            </div>
            <div class="test__variants">
                <div class="test__variants-title">
                    <img src="@/assets/icons/iconTest.svg"/>
                    <p>{{testData[currentIndex].title}}</p>
                </div>
                <div class="test__variants-checks">
                    <div :class="{active: testData[currentIndex].variant === idx }" @click="testData[currentIndex].variant = idx" v-for="(item, idx) in testData[currentIndex].answers" :key="item"><p>{{ idx }}</p></div>
                </div>
                <div class="test__variants-line"></div>
                <div class="test__variants-buttons">
                    <div style="display: flex; gap: 9px;">
                        <button class="test__variants-buttons-prev" :disabled="currentIndex === 0" @click="currentIndex--">{{ $t('prev') }}</button>
                        <button class="test__variants-buttons-next" :disabled="currentIndex === testData.length - 1" @click="currentIndex++">{{ $t('next') }}</button>
                        <button class="test__variants-buttons-next" v-if="checkTest" @click="sendRequest">{{ $t('finish') }}</button>
                    </div>
                    <img src="@/assets/logoSite.svg"/>
                </div>
                <div class="spravka">
                    <p>0 - {{ $t('opros0') }}</p>
                    <span></span>
                    <p>1 - {{ $t('opros1') }}</p>
                    <span></span>
                    <p>2 - {{ $t('opros2') }}</p>
                    <span></span>
                    <p>3 - {{ $t('opros3') }}</p>
                    <span></span>
                    <p>4 - {{ $t('opros4') }}</p>
                </div>
            </div>
        </div>
        <div class="test wrapload" v-if="etap === 'loading'">
             <section class="loader1">
                <div class="slider1" style="--i:0">
                </div>
                <div class="slider1" style="--i:1">
                </div>
                <div class="slider1" style="--i:2">
                </div>
                <div class="slider1" style="--i:3">
                </div>
                <div class="slider1" style="--i:4">
                </div>
            </section>
        </div>
        <div class="test" v-if="etap === 'result'">
            <p class="test-title">{{ $t('surveyResult') }}</p>            
            <div class="test__variants" v-if="recommendedFeeling">

                <div class="test__variants__recomend">
                    <div v-if="recommendedFeeling.score >= 0 && recommendedFeeling.score <= 9">
                        <p v-html="$t('testRes1')">
                        </p>
                    </div>
                    <div v-else-if="recommendedFeeling.score >= 10 && recommendedFeeling.score <= 21">
                        <p v-html="$t('testRes2')">
                        </p>
                    </div>
                    <div v-else-if="recommendedFeeling.score >= 22 && recommendedFeeling.score <= 30">
                        <p v-html="$t('testRes3')">
                        </p>
                    </div>
                    <div v-else-if="recommendedFeeling.score >= 31 && recommendedFeeling.score <= 40">
                        <p v-html="$t('testRes4')">
                        </p>
                    </div>
                    <div v-else-if="recommendedFeeling.score >= 41 && recommendedFeeling.score <= 60">
                        <p v-html="$t('testRes5')">
                        </p>
                    </div>
                </div>

                <div class="test__variants-line"></div>


                <div class="test__variants-result">
                    <h4>{{ $t('recomentCourse') }}: {{ recommendedFeeling.name }}</h4>
                </div>
                
                <div class="second-data block" v-if="recommendedFeeling" style="display: flex; gap: 16px; align-items: center;">
                    <div style="display: flex; gap: 16px;">
                        <div class="image-first" @click="showArticle(recommendedFeeling?.articles[0])">
                            <img class="inner-image" src="@/assets/images/article.svg" />
                        </div>
                        <div class="image-second" @click="showVideo(recommendedFeeling?.videos[0])">
                            <img class="inner-image" src="@/assets/images/video.svg" />
                        </div>
                    </div>
                    <img
                    src="@/assets/images/story.svg"
                    class="image-first story-image"
                    @click="showExercises(recommendedFeeling?.exercises)"
                    />
                </div>

                <div class="test__variants-line"></div>

                <div class="test__variants-buttons" v-if="checkTest">
                    <div style="display: flex; gap: 9px;">
                        <button class="test__variants-buttons-sucs" @click="addFeeling(recommendedFeeling)">{{ $t('take') }}</button>
                        <button class="test__variants-buttons-dang" @click="$emit('close')">{{ $t('refuse') }}</button>
                    </div>
                    <img src="@/assets/logoSite.svg"/>
                </div>
            </div>
            <div v-else>Не найден</div>
        </div>
    </ModalComponent>
</template>
<script>
import ModalComponent from './ModalComponent.vue';

export default {
    components: { ModalComponent },
    data: () => ({
        modalVisible: false,
        testData: [],
        currentIndex: 0,
        feelings: [],
        recommendedFeeling: false,
        etap: 'test',
        selectedItemIndex: 0,
        checkTest: true
    }),
    props: ["value"],
    computed: {
        checkTest() {
            return this.testData.every(item => item.variant !== null);
        }
    },
    mounted() {
        this.$axios.get("test")
            .then(res => {
                this.testData = res.data                
                this.testData.forEach(element => {
                    element.variant = null
                });
            })
            .catch(err => {
                console.log(err);
            })

            this.$axios.get("feeling")
            .then(res => {
                this.feelings = res.data.data
                })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        sendRequest() {
            let result = 0
            this.selectedItemIndex = Math.floor(Math.random() * this.feelings.length)
            for (let i = 0; i < this.testData.length; i++) {
                const obj = this.testData[i];
                const value = parseInt(obj.variant, 10); // Преобразование в целое число
                result += value;
            }
            this.etap = 'loading'
            this.$axios.get(`feeling?score=${result}`)
                .then(res => {
                this.recommendedFeeling = res.data.data[0]
                })
                .catch(err => {
                console.log(err);
            })
            setTimeout(() => {
               this.etap = 'result' 
            }, 4000);
        },
        addFeeling(value) {
            let myFeelings = JSON.parse(localStorage.getItem('myFeelings')) || [];
            if (!myFeelings) {
                myFeelings = [];
            }
            myFeelings.push(value);
            localStorage.setItem('myFeelings', JSON.stringify(myFeelings));
            this.$toaster.success('Success');
            this.checkTest = false
            this.$emit('close')
        },
        showArticle: function (article) {
        this.$emit("showArticle", article)
        },
        showVideo: function (video) {
        this.$emit("showVideo", video)
        },
        showExercises: async function (exercises) {
        this.$emit("showExercises", exercises)
      
        await this.$axios.put(`user/exercise/start/${exercises[0]?.id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
        .then(res => {
            this.$toaster.success('Задача при выполнении');
        })
        },
    }
}
</script>
<style lang="scss" scoped>
.spravka {
    margin-top: 8px;
    display: flex;
    font-size: 14px;
    color: rgb(176, 2, 162);
    gap: 16px;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 2px;
    }
    span {
        width: 1px;
        background: black;
    }
}
.second-data {
    @media screen and (max-width: 768px) {
        overflow-x: scroll;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
}
    .test {
        display: flex;
        padding: 0px 70px 37px 70px;
        flex-direction: column;
        background: white;
        box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
        color: #252525;
        font-family: Mulish-Bold, system-ui;
        gap: 20px;
        min-height: 381px;
        min-width: 500px;
        max-width: 1000px;
        @media screen and (max-width: 768px) {
            padding: 0 10px 10px 10px;
            width: 100%;
            min-width: 100%;
            box-sizing: border-box;
        }
        &-title {
            padding: 12px 0;
            display: flex;
            justify-content: center;
            font-weight: 500;
            font-size: 30px;
            color: white;
            background: purple;
            width: 140%;
            position: relative;
            left: -20%;
        }
        &__nums {
            display: flex;
            align-items: center;
            gap: 10px;
            @media screen and (max-width: 768px) {
                overflow-x: auto;
                &::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                }
            }
            &-cifre {
                width: 48px;
                height: 48px;
                background: rgba(45, 53, 60, 0.1);
                border-radius: 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                p {
                    justify-content: center;
                    align-items: center;
                    font-weight: 600;
                    font-size: 16px;
                    @media screen and (max-width: 768px) {
                        width: 48px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                &:hover {
                    cursor: pointer;
                    transform: scale(1.03);
                    background: greenyellow;
                }
            }
        }
        &__variants {
            margin-top: 10px;
            font-weight: 600;
            font-size: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            &-title {
                color: rgb(179, 119, 179);
                font-weight: 700;
                display: flex;
                gap: 5px;
                align-items: center;
                img {
                    width: 18px;
                    height: 18px;
                }
            }
            &-checks {
                display: flex;
                align-items: center;
                gap: 5px;
                div {
                    border-radius: 10px;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(45, 53, 60, 0.1);
                    p {
                        width: 60%;
                        height: 60%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        border: 2px solid #1F2429;
                    }
                    &:hover {
                        cursor: pointer;
                        transform: scale(1.03);
                        background: rgb(59, 4, 59);
                        p {
                            color: white;
                            border: 2px solid white;
                        }                        
                    }
                }
                .active {
                    background: rgb(59, 4, 59);
                    p {
                        color: white;
                        border: 2px solid white;
                    }
                }
            }
            &-line {
                margin-top: 12px;
                width: 100%;
                height: 1px;
                background: purple;
                width: 120%;
                position: relative;
                left: -10%;
            }
            &-buttons {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                &-sucs {
                    background: green !important;
                    border: none !important;
                    &:hover {
                        color: white !important;
                    }
                }
                &-dang {
                    background: red !important;
                    border: none !important;
                    &:hover {
                        color: white !important;
                    }
                }
                &-prev {

                }
                &-next {

                }
                button {
                    border-radius: 36px;
                    background: black;
                    color: white;
                    font-weight: 700;
                    border: 1px solid #252525;
                    padding: 10px 15px;
                    transition: all 0.5s ease;
                    &:hover {
                        cursor: pointer;
                        transform: scale(1.03);
                        background: white;
                        color: black;
                    }
                }
                button[disabled] {
                    pointer-events: none;
                    background-color: #ccc;
                    color: #999;
                    cursor: not-allowed;
                }
            }
        }
    }
    .curid {
        background: greenyellow;
    }
    .actid {
        background: #ec5c8e;

    }
</style>