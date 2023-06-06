<template>
    <div :style="$route.path == '/profile' ? 'background: #FFEFEF' : 'background: #FFFFFF;'" style="box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);" class="desctop">
        <div class="footer container">
            <div class="footer__top">
                <div class="footer__block1">
                    <router-link to="/"><img src="@/assets/logoSite.svg"/></router-link>
                    <p  class="footer__block1-p1">
                        Sezin, Inc, 234
                    </p>
                    <p class="footer__block1-p2">
                        {{ $t('addressCom') }}
                         <br/> sezin@gmail.com <br/>  +77025559992 (Main)
                    </p>
                </div>

                <div class="footer__block2">
                    <div class="footer__block2__box1">
                        <router-link to="#about"><p class="footer__block2__box1-title">{{ $t('aboutUs') }}</p></router-link>
                        <div style="cursor: pointer;" v-if="getAuth" to="/profile" @click="getUser.roles[0].value === 'USER' ? $router.push('/profile') : getUser.roles[0].value === 'ADMIN' ? $router.push('/admin') : $router.push('/')"><p>{{ $t('profile') }}</p></div>
                        <router-link to="/functions"><p>{{ $t('function') }}</p></router-link>
                    </div>
                    <div class="footer__block2__box1">
                        <p class="footer__block2__box1-title">{{ $t('helper') }}</p>
                        <router-link to="/#faq"><p>{{ $t('faq') }}</p></router-link>
                        <!-- <p>{{ $t('registerLitttle') }}</p>  -->
                        <!-- <p>{{ $t('othcet') }}</p> -->
                        <router-link to="/questions"><p>{{ $t('quesAns') }}</p></router-link>
                    </div>
                    <div class="footer__block3__box1">
                        <p class="footer__block2__box1-title">{{ $t('socialMedia') }}</p>
                        <div class="footer__block2__box1-social">
                            <a href="https://ru-ru.facebook.com/"><img src="@/assets/icons/facebook.svg"/></a>
                            <a href="https://twitter.com/?lang=ru"><img src="@/assets/icons/twitter.svg"/></a>
                            <a href="https://www.instagram.com/"><img src="@/assets/icons/insta.svg"/></a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer__bot">
                {{ $t('privacyCom') }}
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(["getUser", "getAuth"])
    }
}
</script>
<style lang="scss" scoped>
.footer {
    padding: 30px 0;
    &__top {
        display: flex;
        justify-content: space-between;
    }
    &__block1 {
        width: 25.6%;
        img {
            margin-bottom: 8px;
        }
        &-p1 {
            font-weight: 500;
            font-size: 16px;
        }
        &-p2 {
            margin-top: 16px;
            font-weight: 200;
            font-size: 16px;
            color: #212353;
        }
    }
    &__block2 {
        width: 56%;
        display: flex;
        justify-content: space-between;
        &__box1 {
            display: flex;
            flex-direction: column;
            gap: 16px;
            font-weight: 500;
            font-size: 16px;
            &-title {
                margin-bottom: 16px;
            }
            &-social {
                display: flex;
                gap: 16px;
            }
        }
    }
    &__bot {
        margin-top: 80px;
        color: #212353;
        width: 19%;
        font-weight: 400;
        font-size: 12px;
    }
}
</style>