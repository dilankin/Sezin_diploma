<template>
    <LoginModal v-if="$store.state.openLoginModal == true"/>
    <RegisterModal v-if="$store.state.openRegisterModal == true"/>

    <div class="desctop">
        <div class="headerBack">
            <div class="header container">
                <div class="header__left">
                    <router-link to="/"><img src="@/assets/logoSite.svg"/></router-link>
                </div>
                <div class="header__mid">
                    <router-link to="/#home" :style="$route.path == '/' ? 'border-bottom: 3px solid #fd749b;' : 'border-bottom: 3px solid transparent;'"><p>{{ $t('main') }}</p></router-link>
                    <router-link to="/therapist" :style="$route.path == '/therapist' ? 'border-bottom: 3px solid #fd749b;' : 'border-bottom: 3px solid transparent;'"><p>{{ $t('therapist') }}</p></router-link>
                    <router-link to="/chat" :style="$route.path == '/chat' ? 'border-bottom: 3px solid #fd749b;' : 'border-bottom: 3px solid transparent;'"><p>{{ $t('chatHelper') }}</p></router-link>
                    <router-link to="/articles" :style="$route.path == '/articles' ? 'border-bottom: 3px solid #fd749b;' : 'border-bottom: 3px solid transparent;'"><p>{{ $t('staties') }}</p></router-link>
                    <router-link to="/#contacts"><p>{{ $t('contactWith') }}</p></router-link>
                </div>
                <div class="header__right">
                    <select v-model="getLang" @change="getLang1($event.target.value)">
                        <option v-for="item in languages" :key="item" :value="item.value">{{ item.title }}</option>
                    </select>
                    <button v-if="!getAuth" @click="$store.state.openLoginModal = true">{{ $t('login') }}</button>
                    <button v-else @click="getType === 'USER' ? $router.push('/profile') : getType === 'ADMIN' ? $router.push('/admin') : $router.push('/account')">{{ getUser.fullName }}</button>
                </div>
            </div>
        </div>
    </div>


    <div class="mobile" style="position: relative;">
        <div class="headerBackMobile">
            <div class="headerMobile container">
                <img src="@/assets/logoSite.svg" @click="$router.push('/')"/>  
                <div :class="{ 'burger-active': isBurgerActive }" class="header__burger" @click="openMenu">
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="headerMobileMenu" :class="{ 'headerMobileMenuActive': isBurgerActive }" v-click-outside="closeHead">
            <img src="@/assets/icons/close.png" class="headerMobileMenu__close" @click="isBurgerActive = false"/>
            <div class="headerMobileMenu__content container">
                <div class="headerMobileMenu__content__menu">

                    <router-link to="#about" @click="isBurgerActive = false"><p>{{ $t('aboutUs') }}</p></router-link>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <router-link to="/functions" @click="isBurgerActive = false"><p>{{ $t('function') }}</p></router-link>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <router-link to="/questions" @click="isBurgerActive = false"><p>{{ $t('quesAns') }}</p></router-link>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <router-link to="/therapist" @click="isBurgerActive = false"><p>{{ $t('therapist') }}</p></router-link>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <router-link to="/articles" @click="isBurgerActive = false"><p>{{ $t('staties') }}</p></router-link>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <p>{{ $t('conte')}}</p>
                    
                    <div class="footer__block1">
                        <p  class="footer__block1-p1">
                            Sezin, Inc, 234
                        </p>
                        <p class="footer__block1-p2">
                            {{ $t('addressCom') }}
                            <br/> sezin@gmail.com <br/>  +77025559992 (Main)
                        </p>
                    </div>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <div class="footer__block3__box1">
                        <p class="footer__block2__box1-title" style="margin-bottom: 8px;">{{ $t('socialMedia') }}</p>
                        <div class="footer__block2__box1-social" style="display: flex; gap: 8px;">
                            <a href="https://ru-ru.facebook.com/"><img src="@/assets/icons/facebook.svg"/></a>
                            <a href="https://twitter.com/?lang=ru"><img src="@/assets/icons/twitter.svg"/></a>
                            <a href="https://www.instagram.com/"><img src="@/assets/icons/insta.svg"/></a>
                        </div>
                    </div>
                    <select v-model="getLang" @change="getLang1($event.target.value)">
                        <option v-for="item in languages" :key="item" :value="item.value">{{ item.title }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>


    <div class="mobile">
        <div class="footerBackMobile">
            <div class="container">
                <div class="footerMobile">
                    <div class="footerMobile__box" @click="$router.push('/')" :class="{activeNav: $route.path === '/'}">
                        <img src="@/assets/icons/home.svg"/>
                        <p>Главная</p>
                    </div>
                    <div class="footerMobile__box" @click="$router.push('/chat')" :class="{activeNav: $route.path === '/chat'}">
                        <img src="@/assets/icons/chat.svg"/>
                        <p>AiSezin</p>
                    </div>
                    <div class="footerMobile__box" @click="$router.push('/therapist')" :class="{activeNav: $route.path === '/therapist'}">
                        <img src="@/assets/icons/terapist.svg"/>
                        <p>Терапевты</p>
                    </div>
                    <div class="footerMobile__box" @click="$router.push('/articles')" :class="{activeNav: $route.path === '/articles'}">
                        <img src="@/assets/icons/articles.svg"/>
                        <p>Артикль</p>
                    </div>
                    <div class="footerMobile__box" v-if="!getAuth" @click="$store.state.openLoginModal = true">
                        <img src="@/assets/icons/profile.svg"/>
                        <p>{{ $t('login') }}</p>
                    </div>
                    
                    <div class="footerMobile__box" v-else @click="getType === 'USER' ? $router.push('/profile') : getType === 'ADMIN' ? $router.push('/admin') : $router.push('/account')" :class="{activeNav: $route.path === '/profile' || $route.path === '/admin'}">
                        <img src="@/assets/icons/profile.svg"/>
                        <p>{{ getUser.fullName }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import LoginModal from '../LoginModal.vue';
import RegisterModal from '../RegisterModal.vue';

export default {
    components: { LoginModal, RegisterModal },
    data() {
        return {
            isBurgerActive: false,
            languages: [
            { id: 1, value: "ru", title: "Русский"},
            { id: 1, value: "kz", title: "Казахский"},
            { id: 1, value: "en", title: "English"},
            ],
        }
    },
    computed: {
        ...mapGetters(["getAuth", "getUser", "getLang", "getType"])
    },
    methods: {
        ...mapMutations(["UPDATE_LANG"]),
         ...mapActions(["requestUser"]),
        getLang1(option) {
        //   this.$i18n.locale = option;
          this.UPDATE_LANG(option);
        //   this.$axios.defaults.params = {
        //       lang: this.$store.state.lang,
        //   };
          this.$forceUpdate();
          location.reload();
        },

        closeHead() {
            if (this.isBurgerActive) {
                this.isBurgerActive = false
            }
        },

        openMenu() {
            this.isBurgerActive = true;
        },

    },
    created() {
        this.requestUser()
    },
}
</script>
<style lang="scss" scoped>

.activeNav {
    filter: brightness(0) saturate(100%) invert(16%) sepia(85%) saturate(5570%) hue-rotate(276deg) brightness(100%) contrast(96%);
}
.footerBackMobile {
    padding: 16px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background: rgb(255, 255, 255);
    box-shadow: 0px -2px 18px 0px rgba(34, 60, 80, 0.2);
}

.footerMobile {
    display: flex;
    justify-content: space-around;
    &__box {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: black;
        font-size: 12px;
        img {
            height: 20px;
        }
    }
}

.headerBack {
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 13.0709px 13.0709px 104.567px rgba(63, 39, 102, 0.1);
    backdrop-filter: blur(13.0709px);
    border-radius: 31.3701px;
}
.header {
    display: flex;
    padding: 16px 0;
    justify-content: space-between;
    align-items: center;
    &__left {

    }
    &__mid {
        display: flex;
        gap: 55px;
        font-weight: 700;
        font-size: 15px;
        a {
            border-bottom: 3px solid transparent ; 
            transition: all 0.5s ease;
            &:hover {
                border-bottom: 3px solid #fd749b !important;
            }
        }
    }
    &__right {
        display: flex;
        gap: 26px;
        select {
            padding: 6.5px 10px;
            background: transparent;
            font-size: 14px;
            border-radius: 8px;
            border: 2px solid #fd749b;
            outline: none;
        }
        button {
            line-height: 30px;
            background: linear-gradient(178.18deg, #fd749b -13.56%, #281ac8 158.3%);
            color: white;
            font-size: 14px;
            padding: 3px 40px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: 600;
            outline: none;
            border: none;
        }
    }
}




.headerMobileMenu {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);;
    position: fixed;
    top: -380px;
    transition: all 1s ease;
    z-index: 5;
    &__close {
        position: absolute;
        top: 5%;
        right: 3%;
        transition: all 0.5s ease;
        &:hover {
            rotate: 90deg;
        }
    }
    &__content {
        width: 90%;
        padding: 32px 0 24px 0;
        display: flex;
        flex-direction: column;
        gap: 7px;
        p {
            font-size: 15px;
            color: black;
            font-weight: 400;
        }
        &__menu {
            display: flex;
            flex-direction: column;
            gap: 7px;
            &-line {
                width: 100%;
                height: 1px;
                background: #00000026;
            }
            select {
                padding: 6.5px 10px;
                background: transparent;
                font-size: 14px;
                border-radius: 8px;
                border: 2px solid #fd749b;
                outline: none;
            }
        }
    }
}
.headerMobileMenuActive {
    top: 80px;
}
.headerBackMobile {
    padding: 16px 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background: white;
    box-shadow: 0px 8px 11px -3px rgba(34, 60, 80, 0.2);
}
.headerMobile {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__left {
        width: 30px;
        height: 28px;
    }
    a {
        width: 52.93%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    select {
        cursor: pointer;
        outline: none;
        font-size: min(max(13px, calc(0.8125rem + ((1vw - 4.2px) * 0.4902))), 18px);
        background: transparent;
        appearance: none;;
        border: none;
        height: max-content;
        color: black;
        option {
            background: #445260;
            border: none;
            font-size: 12px;
            width: fit-content;
            color: white;
        }
        option:checked {
            display: none;
        }
    }

}


.header__burger {
    display: block;
    width: 30px;
    height: 18px;
    margin-top: -5px;
    position: relative;
    cursor: pointer;
    z-index: 9;

    & span {
      transition: all .3s ease 0s;
      top: calc(50% - 1px);
      left: 0;
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: black;

      &:nth-child(1) {
        top: 0px;
      }

      &:nth-child(2) {
        top: 6px;
      }

      &:nth-child(3) {
        top: 12px;
      }
      &:nth-child(4) {
        top: 18px;
      }
    }
  }
  .burger-active {
    span {
      transform: scale(1);

      &:nth-child(1) {
        top: -2px;
      }
      &:nth-child(2) {
        top: 5px;
      }
      &:nth-child(3) {
        top: 13px;
      }
      &:nth-child(4) {
        top: 20px;
      }
    }
  }
</style>