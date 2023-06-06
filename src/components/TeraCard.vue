<template>
    <div class="tera1">
        <div class="tera1-img" @click="goToTer(idxCustom)">
            <img :src="$cdn + tera.profile?.photo"  v-if="tera.profile?.photo"/>
            <img src="@/assets/icons/profileNone.png"  v-else/>
        </div>
        <div class="tera1__info">
            <p class="tera1__info-p1">{{ tera.fullName }}</p>
            <p class="tera1__info-p2">{{ tera.profile?.smallDesc }}</p>
            <p class="tera1__info-p3">{{ tera.profile?.desc }}</p>
        </div>
        <div class="tera1__tel" @click="$store.state.openChat = true">
            <button>{{ $t('zbyaz') }}</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['tera', 'idxCustom'],
    methods: {
        goToTer(value) {
            this.$router.push('/therapist/' + value);
            this.$store.state.terapistIndex = value;
        }
    }
}
</script>
<style lang="scss" scoped>
.tera1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
        row-gap: 8px;
        column-gap: 10%;
        justify-content: center;
    }
    &-img {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        @media screen and (max-width: 768px) {
            width: 100px;
            height: 100px;
        }
        img {
            border-radius: 50%;
            width: 100%;
            object-fit: cover;
            height: 100%;
            @media screen and (max-width: 768px) {
                object-fit: cover;
            }
        }
    }
    &__info {
        width: 60%;
         @media screen and (max-width: 768px) {
            width: 100%;
            text-align: center;
         }
        &-p1 {
            font-weight: 600;
            font-size: min(max(18px, calc(1.125rem + ((1vw - 4.2px) * 0.3922))), 22px);
            color: #743799;
        }
        &-p2 {
            font-weight: 400;
            font-size: min(max(12px, calc(0.75rem + ((1vw - 4.2px) * 0.1961))), 14px);
            color: #62C8DA;
        }
        &-p3 {
            margin-top: 12px;
            font-weight: 400;
            font-size: min(max(14px, calc(0.875rem + ((1vw - 4.2px) * 0.1961))), 16px);
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }
    &__tel {
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
</style>