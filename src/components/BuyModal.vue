<template>
    <div class="buyBack animated fadeIn" @click="$store.state.openBuyModal = false" >
        <form class="buy animated fadeInLogin" v-scroll @click.stop @submit="buyPremium">
            <p class="buy-p1">{{ $t('makeSubs') }}</p>
            <div class="buy__inputs">
                <div class="buy__inputs__box buy__inputs__box1">
                    <p>{{ $t('owner') }}</p>
                    <input type="text" required v-model="owner"/>
                </div>
                <div class="buy__inputs__box buy__inputs__box2">
                    <p>CVV</p>
                    <input type="text" maxlength="3" required v-model="cvv"/>
                </div>
                <div class="buy__inputs__box">
                    <p>{{ $t('cardNumber') }}</p>
                    <input type="text" maxlength="16" required v-model="cardNumber"/>
                </div>
                <div class="buy__inputs__box buy__inputs__box3">
                    <p>{{ $t('expData') }}</p>
                    <input type="date" required v-model="data"/>
                </div>
                <img src="@/assets/icons/visa.png"/>
            </div>
            <button type="submit">{{ $t('buyNow') }}</button>
        </form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            cvv: '',
            owner: '',
            cardNumber: '',
            data: ''
        }
    },
    methods: {
        async buyPremium() {
            const buy = {
                email: this.getUser.email,
                cvv: this.cvv,
                owner: this.owner,
                cardNumber: this.cardNumber,
                data: this.data
            }
            await this.$axios.put("user/buy", buy)
                .then(res => {
                    this.$toaster.success('Вы получили премиум подписку!');
                    this.$store.state.openBuyModal = false;
                })
            }
    },
    computed: {
        ...mapGetters(['getUser'])
    },
}

</script>
<style lang="scss" scoped>
.buyBack {
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
.buy {
    position: relative;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    border-radius: 15px;
    padding: 52px;
    background: white;
    box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
    &-p1 {
        color: #3f0136;
        font-weight: 700;
        font-size: 25px;
    }
    &__inputs {
        display: flex;
        flex-wrap: wrap;
        row-gap: 16px;
        justify-content: space-between;
        align-items: center;
        &__box1 {
            width: 62% !important;
        }
        &__box2 {
            width: 33% !important;
        }
        &__box3 {
            width: 50% !important;
        }
        &__box {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 6px;
            input {
                padding: 0 16px;
                box-sizing: border-box;
                width: 100%;
                outline: none;
                height: 40px;
                background: #FFFFFF;
                border: 1px solid #D1D1D1;
                border-radius: 5px;
            } 
            p {
                font-size: 14px;
            }
        }
        img {
            width: 40%;
            height: 100%;
        }
    }
    button {
        cursor: pointer;
        width: 100%;
        height: 36px;
        background: green;
        border: none;
        outline: none;
        color: white;
        font-weight: 700;
        font-size: 16px;
        border-radius: 8px;
    }
}



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
</style>