<template>
  <div class="home">
      <div class="home__block1Back" id="home">
        <div class="home__block1 container">
            <div class="home__block1__left">
              <p class="home__block1__left-p1" data-aos="fade-right" data-aos-delay="650" data-aos-duration="800">{{ $t('blokc1Title') }}</p>
              <p class="home__block1__left-p2" data-aos="fade-right" data-aos-delay="700" data-aos-duration="800">{{ $t('blokc1Desc') }}</p>
              <div class="home__block1__left-buttons">
                <button class="button" data-aos="fade-right" data-aos-delay="700" data-aos-duration="1200" v-if="getAuth"  @click="testBool = true">{{ $t('ready') }}</button>
                <button class="button" data-aos="fade-right" data-aos-delay="750" data-aos-duration="1200" v-if="!getAuth" @click="$store.state.openRegisterModal = true">{{ $t('register') }}</button>
              </div>
            </div>
            <div class="home__block1__right" data-aos="zoom-in" data-aos-delay="650" data-aos-duration="1200">
              <img src="@/assets/images/mainBannerImage.png"/>
            </div>
        </div>
      </div>

      <div class="home__block2 container" id="about">
          <div class="home__block2__left" data-aos="zoom-in" data-aos-delay="650" data-aos-duration="1200">
            <img src="@/assets/images/block2.png"/>
          </div>
          <div class="home__block2__right">
              <p class="home__block2__right-title" data-aos="fade-left" data-aos-delay="650" data-aos-duration="800">{{ $t('block2Title') }}</p>
              <div class="home__block2__right-li" data-aos="fade-left" data-aos-delay="700" data-aos-duration="800">
                <p style="margin-bottom: 8px;"  >{{ $t('block2Desc') }}</p>
                <li>{{ $t('block2Desc1') }}</li>
                <li>{{ $t('block2Desc2') }}</li>
                <li>{{ $t('block2Desc3') }} </li>
              </div>
          </div>
      </div>

      <!-- <div class="home__block3 container" id="quiz">         -->
        <FeelingComponent
          @showArticle="showArticle"
          @showVideo="showVideo"
          @showExercises="showExercises"
        />
        <!-- <p class="home__block3-title" data-aos="fade-up" data-aos-delay="650" data-aos-duration="800">{{ $t('block3Title') }}</p>
        <div class="home__block3__contents">
            <div class="home__block3__contents__left">
                <div class="home__block3__contents__left__filter" data-aos="fade-up" data-aos-delay="700" data-aos-duration="800">
                  <p v-for="item in 7" :key="item">Lonely</p>
                </div>
                <div class="home__block3__contents__left-save" data-aos="fade-up" data-aos-delay="750"  data-aos-duration="800">
                  <img src="@/assets/icons/save.svg"/>
                  <p>{{ $t('save') }}</p>
                </div>
            </div>
            <div class="home__block3__contents__right">
              
            </div>
        </div> -->
      <!-- </div> -->


      <div class="container" id="faq">
        <div class="home__block4">
          <div class="home__block4-title" data-aos="fade-down" data-aos-delay="650" data-aos-duration="800">
            <p>{{ $t('block4Title') }}</p>
            <div @click="leaveMessage">{{ $t('block4Button') }}</div>
          </div>
          <div style="position: relative;">
            <swiper
                  style="padding: 40px 0;"
                  class="home__block7__swiper__contents"
                  :spaceBetween="30"
                  :lazy="true" :loop="false"
                  :pagination="true"
                  :navigation="{
                    prevEl: '.swiperLeftArrow',
                    nextEl: '.swiperRightArrow',
                  }"
                  :breakpoints="{
                    1000: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                  }"
                  :autoplay="{
                    delay: 2000,
                    duration: 1000,
                    disableOnInteraction: false,
                  }"
                  :speed="1000"
                  >
                  <swiper-slide  v-for="(item) in fun" :key="item" style="height: auto;">
                      <CardFun :fun="item" data-aos="flip-left" data-aos-delay="650" data-aos-duration="800"/>
                  </swiper-slide>
              </swiper>
              <div class="arrowsPos">
                <img src="@/assets/icons/swiperArrow.svg" class="swiperLeftArrow" style="rotate: 180deg;"/>
                <img src="@/assets/icons/swiperArrow.svg" class="swiperRightArrow"/>
              </div>
          </div>
        </div>
      </div>


      <div class="home__block5 container">
          <p class="home__block5-text1" data-aos="fade-down" data-aos-delay="600" data-aos-duration="800">{{$t('block5Title')}}</p>
          <p class="home__block5-line" data-aos="fade-down" data-aos-delay="650" data-aos-duration="800"></p>
          <p class="home__block5-text2" data-aos="fade-down" data-aos-delay="700" data-aos-duration="800">
            {{ $t('block5Desc') }}
          </p>
          <div v-if="articles.length">
            <swiper
                  class="home__block7__swiper__contents"
                  :spaceBetween="30"
                  :lazy="true" :loop="false"
                  :breakpoints="{
                    1000: {
                        slidesPerView: 3,
                        spaceBetween: 45
                    }
                  }"
                  :autoplay="{
                    delay: 2500,
                    duration: 1000,
                    disableOnInteraction: false,
                  }"
                  :speed="1000"
                  >
                  <swiper-slide  v-for="(item, idx) in articles" :key="item" style="height: auto;">
                      <VebinarCard :feeling="filling[idx]" :data="item"  data-aos="zoom-in"  data-aos-delay="600" data-aos-duration="800"/>
                  </swiper-slide>
              </swiper>
          </div>
      </div>

      <div class="home__app container">
        <p class="home__app-text1" data-aos="fade-down" data-aos-delay="600" data-aos-duration="800">{{ $t('block6Title') }}</p>
        <p class="home__app-line" data-aos="fade-down" data-aos-delay="650" data-aos-duration="800"></p>
        <p class="home__app-text2" data-aos="fade-down" data-aos-delay="700" data-aos-duration="800">{{ $t('block6Desc') }}</p>
        <div class="home__app-app" data-aos="fade-down" data-aos-delay="750" data-aos-duration="800">
          <a href="https://www.apple.com/ru/app-store/"><img src="@/assets/icons/appstore.svg"/></a>
          <a href="https://play.google.com/store/games?hl=ru&gl=US"><img src="@/assets/icons/googleplay.svg"/></a>
        </div>
      </div>

      <div class="home__block6Back">
          <div class="home__block6 container">
            <div class="home__block6-phons">
              <img src="@/assets/icons/phone1.png" data-aos="fade-up-right" data-aos-delay="600" data-aos-duration="800"/>
              <img src="@/assets/icons/phone2.png" data-aos="fade-up-left" data-aos-delay="600" data-aos-duration="800"/>
            </div>
            <img class="home__block6-message" src="@/assets/icons/messageApp.png" data-aos="zoom-in-left" data-aos-delay="600" data-aos-duration="800"/>
          </div>
          <img class="home__block6Sharik" src="@/assets/icons/sharik.png"/>
      </div>
  </div>
  <Leave_message
    v-if="isShowMessage"
    @sendedMessage="messageUpdate"
    @closeMessage="isShowMessage = false"
  />
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

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; 

import SwiperCore, { A11y, Autoplay } from "swiper";
import { Navigation, Pagination } from 'swiper';
import "swiper/swiper.min.css";
SwiperCore.use([Navigation, Pagination, A11y, Autoplay])

import fun from '@/data/fun.json'
import filling from '@/data/filling.json'
import CardFun from "@/components/CardFun.vue";
import VebinarCard from "@/components/VebinarCard.vue";
import Leave_message from '@/components/modals/leave_message.vue';
import ModalTest from '@/components/modals/ModalTest.vue';
import ArticleComponent from "@/components/alert/article.vue";
import VideoComponent from "@/components/alert/video.vue";
import ExerciseComponent from "@/components/alert/exercise.vue";
import FeelingComponent from "@/components/alert/feeling.vue";
import { mapGetters, mapMutations } from 'vuex';
export default {
  components: { Swiper, SwiperSlide, CardFun, VebinarCard, Leave_message, ModalTest, ArticleComponent, VideoComponent, ExerciseComponent, FeelingComponent },
  data() {
    return {
      fun: fun.fun,
      filling: filling.filling,
      isShowMessage: false,      
      testBool: false,
      articles: [],
      isShowArticle: false,
      isShowVideo: false,
      isShowExercise: true,
      article: null,
      video: null,
      exercises: null,
      selectedTab: 0,
      isShowMessage: false,
      showRegister: 0,
    }
  },
  computed: {
    ...mapGetters(["getAuth"])
  },

  async created() {

    this.SET_LOADING(true)
    await this.$axios.get('vebinar').then(res => {
      console.log('ada');
      this.homepage = res.data.data
      this.SET_LOADING(false)
    }).catch(err => {
      console.log(err);
      this.SET_LOADING(false)
    })
  },

  methods: {
    ...mapMutations(['SET_LOADING']),
    leaveMessage() {
      this.isShowMessage = true
    },
    messageUpdate() {
     this.$axios.get('feedback')
        .then(res => {
          this.fun = res.data
        })
        .catch(err => {
          console.log(err);
        })
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
  mounted() {
    AOS.init();
    this.messageUpdate()
        this.$axios.get("vebinar")
            .then(res => {
                this.articles = res.data
            })
            .catch(err => {
                console.log(err);
            })
  }
}
</script>
<style lang="scss" scoped>
.swiperRightArrow {
  cursor: pointer;
  position: absolute;
  top: 40%;
  z-index: 2;
  right: -2%;
  @media screen and (max-width: 768px) {
    right: -7%;
  }
}
.swiperLeftArrow {
  cursor: pointer;
  position: absolute;
  top: 40%;
  z-index: 2;
  left: -2%;
  @media screen and (max-width: 768px) {
    left: -7%;
  }

}
.home {
  @media screen and (max-width: 768px) {
    margin-top: 80px;
    margin-bottom: 136px;
  }
  &__block1Back {
    background: url('@/assets/images/mainBanner.png');
    background-repeat: no-repeat;
    background-size: 120% 120%;
    background-position: center;
    height: 750px;
    @media screen and (max-width: 768px) {
      height: 550px;
    }
  }
  &__block1 {
    display: flex;
    justify-content: space-between;
    &__left {
      color: white;      
      width: 48%;
      @media screen and (max-width: 768px) {
        width: 75%;
        z-index: 1;
      }
      &-p1 {
        margin-top: 80px;
        font-weight: 400;
        font-size: min(max(19px, calc(1.1875rem + ((1vw - 4.2px) * 1.6667))), 36px);
        @media screen and (max-width: 768px) {
          margin-top: 40px;
        }
      }
      &-p2 {
        margin: 32px 0 64px 0;
        font-weight: 400;
        font-size: min(max(13px, calc(0.8125rem + ((1vw - 4.2px) * 0.4902))), 18px);
      }
      &-buttons {
        display: flex;
        gap: 32px;
        button {
          cursor: pointer;
          height: 54px;
          padding: 0 33px;
          border-radius: 90px;
          border: none;
          outline: none;
          font-weight: 700;
          font-size: 14px;
          &:hover {
            color: rgb(169, 59, 169) !important;
            background: rgb(224, 175, 224) !important;
          }
        }
      }
    }
    &__right {
      width: 48%;
      @media screen and (max-width: 768px) {
        width: 25%;
        img {
          width: 250%;
          height: 100%;
          -o-object-fit: contain;
          object-fit: contain;
          position: relative;
          top: 50%;
          right: 97%;
        }
      }

    }
  }
  &__block2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
      flex-direction: column-reverse;
      gap: 30px;
    }
    &__left {
      width: 48%;
      @media screen and (max-width: 768px) {
        width: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    &__right {
      width: 48%;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      &-title {
        margin-bottom: 36px;
        font-weight: 400;
        font-size: 28px;
        color: #b6239e;
      }
      &-li {
        font-weight: 400;
        font-size: 16px;
        color: #333333;
        li {
          margin-left: 36px;
        }
      }
    }
  }
  &__block3 {
    margin-right: auto;
    margin-left: auto;
    margin-top: 65px;
    margin-bottom: 65px;
    padding: 40px 60px;
    box-sizing: border-box;
    background: #FAF2FF;
    box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    &-title {
      font-weight: 500;
      font-size: min(max(19px, calc(1.1875rem + ((1vw - 4.2px) * 1.6667))), 36px);
      color: #CD5FA5;
    }
    &__contents {
      // padding: 40px 0;
      &__left {
        width: 37.68%;
        display: flex;
        justify-content: space-between;
        &__filter {
          width: 100%;
          p {  
            height: 85px;
            cursor: pointer;
            width: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            font-weight: 600;
            font-size: 24px;
            transition: all 0.5s ease;
            background: transparent;
            &:hover {
              background: linear-gradient( 90deg, rgba(143, 115, 221, 0) 0%, rgba(149, 115, 221, 0.7) 24.48%, #9b73dd 48.77%, rgba(155, 115, 221, 0.7) 76.61%, rgba(181, 115, 221, 0) 100% );
            }
          }
        }
        &-save {
          display: flex;
          align-items: center;
          color: #933EAC;
          font-weight: 400;
          font-size: 25px;
          gap: 13px;
        }
      }
      &__right {

      }
    }
  }
  &__block4 {
    width: 92%;
    margin: auto;
    &-title {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 70px;
      @media screen and (max-width: 768px) {
        flex-direction: column;
      margin-bottom: 20px;
        gap: 8px;
      }
      p {        
        color: #B247A7;
        font-weight: 300;
        font-size: min(max(19px, calc(1.1875rem + ((1vw - 4.2px) * 1.6667))), 36px);
      }
      div {
        line-height: 30px;
        background: linear-gradient(178.18deg,#fd749b -13.56%,#281ac8 158.3%);
        color: #fff;
        font-size: 16px;
        font-family: Poppins-Regular,system-ui;
        padding: 6px 40px;
        cursor: pointer;
        border-radius: 14px;
        transition: all 0.5s ease;
        &:hover {
          cursor: pointer;
          transform: scale(1.03);
        }
      }
    }
  }
  &__block5 {
    margin-right: auto;
    margin-left: auto;
    margin-top: 60px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-text1 {
      font-weight: 600;
      color: #1C1C33;
      font-size: min(max(19px, calc(1.1875rem + ((1vw - 4.2px) * 1.6667))), 36px);
      margin: auto;
    }
    &-line {
      margin: 18px 0 50px 0;
      width: 15%;
      margin-right: auto;
      margin-left: auto;
      height: 3px;
      background: #9347B2;
    }
    &-text2 {
      margin-bottom: 70px;
      text-align: center;
      color: #4E4E65;
      font-weight: 400;
      width: 60%;
      margin-right: auto;
      margin-left: auto;
      font-size: 16px;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    } 
  }
  &__app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-text1 {
      color: #FD749B;
      font-weight: 700;
      font-size: 28px;
      @media screen and (max-width: 768px) {
        text-align: center;
      }
    }
    &-line {
      margin-top: 17px;
      margin-bottom: 50px;
      height: 4px;
      width: 5%;
      background: #FD749B;
      border-radius: 15px;
      @media screen and (max-width: 768px) {
        width: 25%;
      }
    }
    &-text2 {
      font-weight: 400;
      font-size: 16px;
      color: #333333;
      width: 35%;
      text-align: center;
      line-height: 40px;
      
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    &-app {
      margin-top: 8px;
      display: flex;
      align-self: center;
      gap: 56px;
      img {
        width: 150%;
        height: 100%;
      }
    }
  }
  &__block6Back {
    position: relative;
    height: 1100px;
    background: url('@/assets/images/bannerApp.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-size: 120% 120%;
    background-position-x: center;
    background-position-y: 50%;
    @media screen and (max-width: 768px) {
      height: 750px;
    }
  }
  &__block6 {
    z-index: 2;
    position: relative;;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 130px;
    @media screen and (max-width: 768px) {
      gap: 40px;
    }
    &-message {
      position: relative;
      left: 20%;
    }
    &-phons {
      display: flex;
      gap: 16px;
      margin-top: 100px;
      align-items: center;
      
      @media screen and (max-width: 768px) {
        width: 100%;
        gap: 0;
        justify-content: space-between;
        img {
          width: 45%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
  &__block6Sharik {
    bottom: 10%;
    right: 0;
    left: 20%;
    z-index: 1;
    position: absolute;
  }
}


.button {
  min-width: 150px;
  min-height: 51px;
  font-family: Poppins-Bold, system-ui;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 700;
  color: #d63fb6;
  background: #d2fffa;
  // background: linear-gradient(90deg, rgb(204, 255, 248) 0%, rgbargb(218, 255, 251)%);
  border: none;
  border-radius: 1000px;
  box-shadow: 3px 3px 6px rgb(204, 255, 248);
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
  padding: 10px 20px;
}

button::before {
  content: "";
  border-radius: 1000px;
  width: 100%;
  padding: 0 6px;
  min-height: calc(51px + 12px);
  border: 4px solid rgb(232, 135, 232);
  box-shadow: 0 0 51px rgba(186, 255, 241, 0.64);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.3s ease-in-out 0s;
}

.button:hover,
.button:focus {
  color: #313133;
  transform: translateY(-6px);
}

button:hover::before,
button:focus::before {
  opacity: 1;
}

button::after {
  content: "";
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 6px solid #adffef;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.5s infinite;
}

button:hover::after,
button:focus::after {
  animation: none;
  display: none;
}

@keyframes ring {
  0% {
    width: 30px;
    height: 30px;
    opacity: 0.1;
  }
  100% {
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}
</style>