<template>
    <ModalComponent :isOpen="value" @close="$emit('close')">
        
        <div class="feeling">
            <p class="feeling-title">{{ $t('addWebinar') }}</p>

            <label for="file1" class="feeling-file">
                <img src="@/assets/icons/upload.svg"/>
                <p>{{ $t('selectFileType') }}</p>
                <input type="file" ref="fileveb" style="display: none;" id="file1"/>
            </label>

            <div class="feeling-input">
                <p>{{ $t('name') }}</p>
                <input type="text" v-model="title" />
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
        title: '',
    }),
    props: ["value"],
    methods: {
        async postFeeling() {
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('image', this.$refs.fileveb.files[0]);
            await this.$axios.post("vebinar", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
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
    &-file {
        border: 1px dashed #D7DADD;
        border-radius: 4px;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
        p {
            border: 1px solid #fd749b;
            border-radius: 4px;
            padding: 0 24px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
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