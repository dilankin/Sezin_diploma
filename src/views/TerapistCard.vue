<template>
    <div class="cardT container">
        <div class="cardT__top">
            <div class="cardT__top__left">
                <img :src="$cdn + newTerapish[$store.state.terapistIndex]?.profile?.photo"/>
                <div>
                    <p class="cardT__top__left-p1">{{ newTerapish[$store.state.terapistIndex]?.fullName }}</p>
                    <p class="cardT__top__left-p2">{{ newTerapish[$store.state.terapistIndex]?.profile?.smallDesc }}</p>
                    <p class="cardT__top__left-p3">{{ newTerapish[$store.state.terapistIndex]?.email }}</p>
                </div>
            </div>
            <div class="cardT__top__right">
                <p>id: {{ newTerapish[$store.state.terapistIndex]?.id }}</p>
                <button @click="$store.state.openChat = true">{{ $t('zbyaz') }}</button>
            </div>
        </div>
        <div class="cardT__mid">
            <p>{{ newTerapish[$store.state.terapistIndex]?.profile?.desc }}</p>
        </div>
        <div class="cardT__bot">
            <p>{{ $t('vebinarsTitle') }}</p>
            <div class="cardT__bot__content">
                <div v-for="item in newTerapish[$store.state.terapistIndex]?.vebinars" :key="item" class="cardT__bot__content-box">
                    <img :src="$cdn + item.image"/>
                    <p>{{ item.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newTerapish: ""
        }
    },
    mounted() {
        this.$axios.get('user?role=MANAGER&lang=ru')
        .then(res => {
            this.newTerapish = res.data.data
        })
        .catch(err => {
            
        });
    },
    
}
</script>
<style lang="scss" scoped>
.cardT {
     @media screen and (max-width: 768px) {
        margin-top: 90px;
        margin-bottom: 157px;
     }
    &__top {
        margin: 16px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFFFFF;
        padding: 32px;
        box-sizing: border-box;
        box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
        border-radius: 20px;
         @media screen and (max-width: 768px) {
            flex-direction: column;
            padding: 16px;
         }
        &__left {
            display: flex;
            align-items: center;
            gap: 30px;
            img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                object-fit: cover;
            }
            &-p1 {
                font-weight: 600;
                font-size: min(max(18px, 1.125rem + (1vw - 4.2px) * 0.3922), 22px);
                color: #743799;
            }
            &-p2 {
                margin: 8px 0;
                font-weight: 400;
                font-size: min(max(12px, 0.75rem + (1vw - 4.2px) * 0.1961), 14px);
                color: #62C8DA;
            }
            &-p3 {

            }
            div {
                 @media screen and (max-width: 768px) {
                    width: 46%;
                 }
            }
        }
        &__right {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            button {
                cursor: pointer;
                background: #9347B2;
                border-radius: 10px;
                color: white;
                padding: 0 16px;
                border: none;
                outline: none;
                height: 48px;
                transition: all 0.5s ease;
                border: 2px solid transparent;
                &:hover {
                    border: 2px solid #9347B2;
                    background: white;
                    color: #9347B2;
                }
            }
        }
    }
    
    &__mid {
        margin: 16px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFFFFF;
        padding: 32px;
        box-sizing: border-box;
        box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
        border-radius: 20px;
    }
    &__bot {
        margin: 16px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        gap: 16px;
        background: #FFFFFF;
        padding: 32px;
        box-sizing: border-box;
        box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
        border-radius: 20px;
        &__content {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
                row-gap: 56px !important;
            &-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 7px;
                width: 30%;
                height: 100%;
                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>