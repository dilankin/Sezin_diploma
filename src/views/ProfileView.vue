<template>
    <div class="profile container">
        <div class="profile__top">
            <div class="profile__top__left">
                <div class="profile__top__left__info">
                    <div class="profile__top__left__info__user">
                        <p  class="profile__top__left__info__user-p1">{{ $t('hello') }} {{ getUser.fullName }}!</p>
                        <p  class="profile__top__left__info__user-p2">{{ $t('profileDesc') }}</p>
                    </div>
                    <div class="profile__top__left__info__citata">
                        <p>{{ $t('profileCitata') }}</p>
                        <img src="@/assets/icons/kov.png"/>
                    </div>
                </div>
                <div class="profile__top__left__progress">
                    <div class="profile__top__left__progress__box">
                        <p>{{ progress.data?.endCount }} {{ $t('completeText') }}</p>
                        <img src="@/assets/icons/completed.svg"/>
                    </div>
                    <div class="profile__top__left__progress__box">
                        <p>{{ progress.data?.processingCount }} {{ $t('progressText') }}</p>
                        <img src="@/assets/icons/progress.svg"/>
                    </div>
                </div>
            </div>
            <div class="profile__top__right">
                <img src="@/assets/icons/avatar.png"/>
                <button @click="logout">{{ $t('leave') }}</button>
            </div>
        </div>
        <div class="profile__feelings">
            <my-feeling 
            @showArticle="showArticle"
            @showVideo="showVideo"
            @showExercises="showExercises"
          />
        </div>
        <div class="profile__mid">
            <div class="profile__mid__title">
                <p class="profile__mid__title-text">{{ $t('statistics') }}</p>
                <div class="profile__mid__title-year">
                    <img src="@/assets/icons/arrow.svg"/>
                    <p>2022</p>
                    <img src="@/assets/icons/arrow.svg" style="rotate: 180deg;"/>
                </div>
            </div>
            <div class="profile__mid__chart">
                <line-chart />
            </div>
        </div>
    </div>


    <ModalTest 
          @showArticle="showArticle"
          @showVideo="showVideo"
          @showExercises="showExercises" 
          :value="testBool" @close="testBool = false" />
    
    <ArticleComponent
        v-if="isShowArticle"
        :article="article"
        @close="hideArticle"
    />
    <VideoComponent v-if="isShowVideo" :video="video" v-on:close="hideVideo" />
    <ExerciseComponent
        v-if="isShowExercise"
        :exercises="exercises"
        @close="hideExercises"
    />
</template>
<script>
import LineChart from '@/components/LineChart.vue'
import MyFeeling from '@/components/alert/myFeeling.vue'
import ModalTest from '@/components/modals/ModalTest.vue';
import ArticleComponent from "@/components/alert/article.vue";
import VideoComponent from "@/components/alert/video.vue";
import ExerciseComponent from "@/components/alert/exercise.vue";
import { mapActions, mapGetters } from 'vuex'
export default {
    components: { LineChart, MyFeeling, ModalTest, ArticleComponent, VideoComponent, ExerciseComponent },
        data() {
            return {
                progress: '',
                articles: [],
                isShowArticle: false,
                isShowVideo: false,
                isShowExercise: false,
        }
    },
    async created() {
        await this.$axios
        .get("user/count", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
        .then((res) => {
                this.progress = res;
        })
        .catch((err) => {
        });

    },
    methods: {
        ...mapActions(["logoutUser"]),
        logout() {
            this.logoutUser()
            this.$router.push("/")
        },

         showArticle(article) {
            this.article = article;
            this.isShowArticle = true;
        },
        showVideo(video) {
        this.video = video;
        this.isShowVideo = true;
        },
        showExercises(exercises) {
            this.exercises = exercises;
            this.isShowExercise = true;
        },
        hideArticle() {
            this.isShowArticle = false;
        },
        hideVideo() {
        this.isShowVideo = false;
        },
        hideExercises() {
        this.isShowExercise = false;
        },
    },
    computed: {
        ...mapGetters(["getUser"]),
    }
}
</script>
<style lang="scss" scoped>
.profile {
    margin-bottom: 76px;

    @media screen and (max-width: 768px) {
        padding: 20px 0;
        margin-top: 80px;
        margin-bottom: 136px;
    }

    &__top {
        margin-top: 54px;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 16px;
        }
        &__left {
            width: 74.8%;
            background: rgba(255, 255, 255, 0.25);
            box-shadow: 13.0709px 13.0709px 104.567px rgba(63, 39, 102, 0.1);
            backdrop-filter: blur(13.0709px);
            border-radius: 31.3701px;
            padding: 30px 70px;
            box-sizing: border-box;
            @media screen and (max-width: 768px) {
                padding: 10px 20px;
                width: 100%;
            }
            &__progress {
                margin-top: 38px;
                display: flex;
                justify-content: space-around;
                &__box {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    @media screen and (max-width: 768px) {
                        font-size: 12px;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                }
            }
            &__info {
                background: #FFEAEA;
                padding: 35px 80px;
                border-radius: 14px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                @media screen and (max-width: 768px) {
                    padding: 10px 20px;
                }
                &__user {
                    &-p1 {
                        font-weight: 600;
                        font-size: 36px;
                        @media screen and (max-width: 768px) {
                        font-size: 24px;
                        }
                    }
                    &-p2 {
                        font-weight: 400;
                        font-size: 16px;
                    }
                }
                &__citata {
                    color: #707070;
                    font-weight: 400;
                    font-size: 14px;
                    width: 50%;
                    background: white;
                    border-radius: 16px;
                    display: flex;
                    padding: 15px;
                    align-items: center;
                }
            }
        }
        &__right {
            width: 28%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            left: -4%;
            z-index: 1;
            gap: 16px;
            @media screen and (max-width: 768px) {
                width: 100%;
                flex-direction: initial;
            }
            img {
                width: 85%;
                height: 85%;
                @media screen and (max-width: 768px) {
                    width: 40%;
                    height: 40%;
                }
            }
            button {
                cursor: pointer;
                background: #8f0000;
                color: white;
                height: 48px;
                font-weight: 600;
                width: 50%;
                margin: auto;
                border-radius: 18px;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                outline: none;
                transition: all 0.5s ease;
                border: 2px solid transparent;
                &:hover {
                    background: white;
                    color: #8f0000;
                    border: 2px solid #8f0000;
                }
            }
        }
    }
    &__mid {
        margin-top: 46px;
        width: 79%;
        margin-right: auto;
        margin-left: auto;
        @media screen and (max-width: 768px) {
            width: 90%;
        }
        &__title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            &-text {
                color: #7991E4;
                font-weight: 700;
                font-size: 22px;
            }
            &-year {
                display: flex;
                align-items: center;
                gap: 18px;
            }
        }
        &__chart {
            margin-top: 44px;
            width: 100%;
            height: 480px;
            padding: 76px 62px 42px 62px;
            box-sizing: border-box;
            background: #FFFFFF;
            box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
            border-radius: 24px;
            @media screen and (max-width: 768px) {
                height: 240px;
                padding: 16px 12px 8px 12px;
            }
        }
    }
}
</style>