// Header组件
const Header = {
    template: `<div class="header"> <h2>{{HeaderTitle}}</h2> </div>`,
    data() {
        return {
            HeaderTitle: `HExris's Network Center`
        }
    }
}

// Footer组件
const Footer = {
    template: `<div id="author">{{footerTitle}}</div>`,
    data() {
        return {
            footerTitle: `Powered by HExris`
        }
    }
}

// 

// 天气组件
const Weather = {
    template: `<div v-if="loaded" :class="[weatherClass]"></div>`,
    data() {
        return {
            weatherObj: {
                xue: 'snowy', // 雪
                lei: 'stormy', // 暴风雨
                shachen: 'stormy', // 沙尘
                wu: 'cloudy', // 雾
                bingbao: 'snowy', // 冰雹
                yun: 'cloudy', // 云
                yu: 'rainy', // 雨 
                yin: 'cloudy', // 阴天
                qing: 'sunny', // 晴天
                rainbow: 'rainbow' // 晴天
            },
            currentWeather: '',
            queryURL: '/api?version=v6&appid=33872376&appsecret=z7F1i0Hw&city=深圳',
            loaded: false
        }
    },
    computed: {
        weatherClass() {
            if (this.currentWeather) {
                return this.weatherObj[this.currentWeather]
            } else {
                return 'rainbow'
            }
        }
    },
    methods: {
        initComponent() {
            Axios.get(this.queryURL).then(res => {
                this.loaded = true
                if (res.status === 200) {
                    this.currentWeather = res.data.wea_img
                } else {
                    this.currentWeather = 'rainbow'
                }
            })
        }
    },
    mounted() {
        this.initComponent()
    }
}

// 复制按钮
const ClipboardButton = {
    template: `<button class='btn' :data-clipboard-text='password' style='animationName : zoomInUp; animationDuration = 1s;'>复制密码</button>`,
    data() {
        return {
            password: 'HExris0818'
        }
    }
}

// 画板
const scene = {
    template: `
    <div class="wrapper">
        <div id="scene">
            <span v-for="(item,index) in renderText" :key="index">
                <div v-if="item === ';'" style="margin-left: 440px"></div>
                <copy-button v-else-if=" item === '$'"></copy-button>
                <span  v-else-if="item === ' '">&nbsp;</span>
                <span v-else v-text="item"></span>
            </span>
            <span id="flash" class="flash" :class="[flashClass]"></span>
        </div>
    </div>`,
    data() {
        return {
            renderText: [],
            renderIndex: 0,
            flashClass: '',
            originText: `Welcome to my home ! ;ヾ(≧▽≦*)o;;;Wi-Fi账号：HExris's Home(5G);Wi-Fi密码：$  `
        }
    },
    components: {
        'copy-button': ClipboardButton
    },
    mounted() {
        this.setBodyCSS("backgroundColor", "rgb(55, 72, 91)")
        this.setBodyCSS("color", "#DDDDDD")
        this.setBodyCSS("padding", "80px 25px 25px")
        this.setBodyCSS("fontFamily", "microsoft yahei")
        this.setBodyCSS("fontSize", "16px")

        const cursorTimer = setTimeout(() => {
            this.flashClass = "flashWhite"
            clearTimeout(cursorTimer)
        }, 500)

        // 渲染文字
        this.sayTimer = setInterval(() => {
            const inputWords = this.originText.charAt(this.renderIndex)
            if (!inputWords) {
                clearInterval(this.sayTimer)
            }
            this.renderText.push(inputWords)
            if (inputWords === '$') {
                this.$nextTick(() => {
                    // 初始化复制事件
                    new Clipboard('.btn');
                })
            }
            this.renderIndex++
        }, 30)

    },
    methods: {
        setBodyCSS(attributes, style) {
            var element = document.body
            element.style[attributes] = style
        },
        showTips() {
            alert(1)
            function create(element) {
                return document.createElement(element)
            }
            let tips = create('div')
            tips.innerText = '复制成功'
            tips.setAttribute('class', 'tips')
            document.body.appendChild(tips)
        }
    }
}

// 注册根节点组件
const APP = {
    data() {
        return {
            rawHtml: '<span style="color: red">This should be red.</span>',
            loaded: false
        }
    },
    created() {
        window.Axios = axios.create({
            baseURL: 'https://www.tianqiapi.com'
        });
    },
    components: {
        'Weather': Weather,
        'custom-header': Header,
        'scene': scene,
        'custom-footer': Footer
    }
}
console.log(APP)

Vue.createApp(APP).mount('#app')