<template>
    <div class="premiumBack animated fadeIn" @click="$store.state.openPremiumModal = false">
        <div class="premium animated fadeInLogin" v-scroll @click.stop>
            <p class="premium-title" style="text-transform: uppercase;">{{ $t('typeSubs') }}</p>
            <div class="premium__block">
                <div class="premium__left">
                    <div class="premium__left__block">
                        <p class="premium__left__block-p1" style="text-transform: uppercase;">{{ $t('free') }}</p>
                        <p class="premium__left__block-p2">{{ $t('standartFunction') }}</p>
                    </div>
                    <p class="premium__left-p1">{{ $t('statistics') }}</p>
                    <p class="premium__left-line"></p>
                    <p class="premium__left-p1">{{ $t('standartFunction') }}</p>
                    <button class="premium__left-button">{{ $t('availbable') }}</button>
                </div>
                <div class="premium__left">
                    <div class="premium__left__block">
                        <p class="premium__left__block-p1">9 990₸</p>
                        <p class="premium__left__block-p2">{{ $t('monthSubs') }}</p>
                    </div>
                    <p class="premium__left-p1">{{ $t('prenAcc') }}</p>
                    <p class="premium__left-line"></p>
                    <p class="premium__left-p1">{{ $t('butModal1') }}</p>
                    <p class="premium__left-line"></p>
                    <p class="premium__left-p1">{{ $t('butModal2') }}</p>
                    <p class="premium__left-line"></p>
                    <p class="premium__left-p1">{{ $t('butModal3') }}</p>
                    <p class="premium__left-line"></p>
                    <p class="premium__left-p1">{{ $t('butModal4') }}</p>
                    <button v-if="getUser.isSubscriber == false" class="premium__left-button" @click="$store.state.openBuyModal = true, $store.state.openPremiumModal = false" style="text-transform: uppercase;">{{ $t('buy') }}</button>
                    <buttn v-else-if="getUser.isSubscriber == true" class="premium__left-button">{{ $t('availbable') }}</buttn>
                    <button v-else class="premium__left-button" @click="$store.state.openBuyModal = true, $store.state.openPremiumModal = false" style="text-transform: uppercase;">{{ $t('buy') }}</button>
                </div>
            </div>
            <div class="close">
                <img src="@/assets/icons/close.png" @click="$store.state.openPremiumModal = false"/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getUser'])
    },
}
</script>
<style lang="scss" scoped>
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.fadeIn {
  animation-name: fadeIn;
}
.fadeInLogin {
  animation-name: fadeInLogin;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInLogin {
  from {
    opacity: 0;
    top: -10%;
  }
  to {
    opacity: 1;
    top: 0%;
  }
}

.close {
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -2%;
    top: -2%;
    width: 32px;
    height: 32px;
    background: #FCFCFD;
    box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.1);
    border-radius: 32px;
    transform: matrix(1, 0, 0, -1, 0, 0);

}
.premiumBack {
    color: black;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.premium {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    border-radius: 15px;
    padding: 52px;
    background: #FAF2FF;
    box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
    @media screen and (max-width: 768px) {
        width: 95% !important;
        box-sizing: border-box;
        padding: 22px;
    }
    &-title {
        color: #be04a2;
        font-weight: 700;
        font-size: 25px;
    }
    &__block {
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 768px) {
            justify-content: center;
            gap: 5px;
        }
    }
    &__left {
        overflow: hidden;
        border-radius: 15px;
        background: #FFFFFF;
        box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
        display: flex;
        width: 41%;
        flex-direction: column;
        padding: 0 26px;
        align-items: center;
        gap: 16px;
        @media screen and (max-width: 768px) {
            width: 100% !important;
            gap: 5px;
            height: fit-content;
            padding: 0 8px;
            box-sizing: border-box;
        }
        &__block {
            width: 131%;
            padding: 16px 0;
            box-sizing: border-box;
            text-align: center;
            background: linear-gradient(178.18deg,#fd749b -13.56%,#281ac8 158.3%);
            &-p1 {
                color: white;
                font-size: 60px;
                font-weight: 500;
                @media screen and (max-width: 768px) {
                    font-size: 22px;
                }
            }
            &-p2 {
                color: white;
                font-size: 15px;
                font-weight: 500;
            }
        }
        &-p1 {
            font-size: 15px;
            text-align: center;
            color:#8a8a8a;
        }
        &-line {
            width: 100%;
            height: 1px;
            background: rgb(211, 206, 206);
        }
        &-button {
            cursor: pointer;
            border-radius: 8px;
            color: white;
            background: #af09a2;
            padding: 0 32px;
            outline: none;
            border: none;
            height: 36px;
            margin-bottom: 36px;
            font-size: min(max(13px, calc(0.8125rem + ((1vw - 4.2px) * 0.4902))), 18px);
            font-weight: 600;
        }
    }
    &__right {

    }
}
</style>