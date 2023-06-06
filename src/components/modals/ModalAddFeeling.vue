<template>
    <ModalComponent :isOpen="value" @close="$emit('close')">
        <div class="feeling">
            <p class="feeling-title">{{ $t('addFilling') }}</p>
            <div class="feeling-input">
                <p>{{ $t('name') }}</p>
                <input type="text" v-model="name" />
            </div>
            <div class="feeling-input">
                <p>{{ $t('score') }}</p>
                <input type="text" v-model="score" />
            </div>
            <button class="feeling-button" @click="postFeeling">{{ $t('add') }}</button>
        </div>
    </ModalComponent>
</template>
<script>
import ModalComponent from './ModalComponent.vue';

export default {
    components: { ModalComponent },
    data: () => ({
        name: '',
        score: ''
    }),
    props: ["value"],
    methods: {
        async postFeeling() {
            await this.$axios.post("feeling", {
                name: this.name,
                score: this.score
            })
            .then(res => {
                this.$toaster.success('Success');
                this.$emit('fetch')               
                this.$emit('close')                
            })
            .catch(err => {
                console.log(err);
            })
        },
    },
}
</script>
<style lang="scss" scoped>
  .feeling {
    padding: 30px;
    min-width: 300px;
    min-height: 100px;
    background: #FFFFFF;
    box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    &-title {
        color: #fd749b;
        font-weight: 700;
       font-size: 22px;
    }
    &-input {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        input {
            width: 100%;
            background: #fff;
            border: 1px solid #d1d1d1;
            border-radius: 5px;
            font-size: 16px;
            box-sizing: border-box;
            padding: 0 20px;
            height: 48px;
            outline: red!important;
        }
    }
    &-button {
        cursor: pointer;
        width: 40%;
        color: #fff;
        height: 48px;
        background: linear-gradient(178.18deg,#fd749b -13.56%,#281ac8 158.3%);
        border-radius: 48px;
        outline: none;
        border: none;
        font-weight: 500;
        font-size: 16px;
    }
  }
</style>