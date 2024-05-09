<script setup lang="ts">
import { ref } from 'vue';

const apiLink = 'https://github.com/AlexWaisley/OtpSecureStorageApi/releases/latest/download/';
const isChooseMacOs = ref(false);
const ChooseMacOs = () => {
    isChooseMacOs.value = !isChooseMacOs.value;
}
</script>
<template>
    <div class="download-page-container">
        <div class="download-page">
            <div class="download-page__title">
                <p>One Time Password Secure Storage</p>
                <div class="supported-platforms">
                    <div class="platform-icon">
                        <img src="/windows.svg" alt="windows">
                    </div>
                    <div class="platform-icon">
                        <img src="/macOs.svg" alt="macOs">
                    </div>
                    <div class="platform-icon">
                        <img src="/linux.svg" alt="linux">
                    </div>
                </div>
            </div>
            <div class="download-page__content">
                <a :href="apiLink + 'OTPSS_win-x64.zip'" :class="isChooseMacOs ? 'disactive' : 'active'"
                    class="download-card">Windows</a>
                <a :href="apiLink + 'OTPSS_linux-x64.zip'" :class="isChooseMacOs ? 'disactive' : 'active'"
                    class="download-card">Linux</a>

                <button @click="ChooseMacOs" :class="isChooseMacOs ? 'disactive' : 'active'"
                    class="download-card">MacOs</button>
                <div :class="isChooseMacOs ? 'active' : 'disactive'" class="set">
                    <button @click="ChooseMacOs" class="download-card get-back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                            class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                        </svg>
                    </button>
                    <a :href="apiLink + 'OTPSS_osx-x64.zip'" class="download-card macos">Mac OS(Intel)</a>
                    <a :href="apiLink + 'OTPSS_osx-arm64.zip'" class="download-card macos">Mac OS(Apple Silicon)</a>
                </div>
            </div>
            <div class="download-page__bottom">
                <p>Oops! It looks like you haven't installed the necessary application for the site to function
                    properly.</p>
                <p>If you wan to see source code
                    <a target="_blank" href="https://github.com/AlexWaisley/OtpSecureStorageApi">click here</a>
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.download-page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;

    .download-page {
        min-width: 300px;
        width: 50%;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;

        .download-page__title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #f5f5f5;
            padding-bottom: 10px;

            p {
                font-size: 1.5rem;
                font-weight: 600;
            }

            .supported-platforms {
                display: flex;
                gap: 10px;

                .platform-icon {
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }

        .download-page__content {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            padding: 20px;
            flex-wrap: wrap;
            overflow: hidden;

            .set {
                display: flex;
                flex-direction: row;
                gap: 10px;
                width: 100%;

                .macos {
                    width: 100%;
                    text-align: center;
                }
            }

            .download-card {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30%;
                min-width: 100px;
                height: 100px;
                background-color: #ffcfcf;
                border-radius: 10px;
                text-decoration: none;
                color: black;
                font-size: 1.2rem;
                font-weight: 600;
                transition: all 0.3s;
                box-shadow: 0 0 5px rgba(0, 0, 0, .3);

                &:hover {
                    background-color: #ff9f9f;
                    cursor: pointer;
                }
            }
        }

        .download-page__bottom {
            padding: 20px;
            border-top: 1px solid #f5f5f5;
            text-align: center;

            a {
                color: #ff9f9f;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

.active {
    transform: translateX(0);
}

.disactive {
    position: absolute;
    overflow: hidden;
    transform: translateX(-200%);
}
</style>