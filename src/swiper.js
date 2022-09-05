import Swiper, {
    Navigation,
    Pagination,
    Scrollbar,
    Zoom
} from "swiper";
Swiper.use([Scrollbar, Pagination, Navigation, Zoom]);

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.less";
import 'swiper/components/zoom/zoom.less'

import './swiper.css';

export default {
    props: {
        images: [],
        option: Object,
        itemsStyle: {
            type: Object,
            default: () => {
                return {
                    color: '#f56a00',
                    backgroundColor: '#fde3cf'
                }
            }
        }
    },
    name: 'vue23swiper',
    mounted() {
        new Swiper(this.$refs.swiper, {
            loop: false,
            zoom: {
                maxRatio: 5
            },
            spaceBetween: 30,
        })

        this.$props.images.map((e, index) => this.imgrnder(e, index))
    },
    data() {
        return {
            _flag: 1
        }
    },
    methods: {
        onSlideChange(el) { },
        onSwiper(swiper, scale, imageEl, slideEl) {
            this.$data._flag.observer.observe(+scale)
        },
        imgrnder(e, index) {
            const _this = this
            const doDraw = async () => {
                return new Promise(async resolve => {
                    const img = new Image()
                    img.src = e.url
                    img.onload = async function () {
                        if (img.complete) {
                            const data = img.width / img.height
                            const dataW = window.innerWidth / window.innerHeight

                            if (dataW <= data) {
                                _this.$refs[`swiperImg${index}`].style.height = `${100 / data}vw`
                                e.sign && e.sign.map((el, indexs) => {
                                    _this.$refs[`swiperDiv${index}${indexs}`].style.transform = `translate(
                                        ${el.position.split(',')[0] * 100}vw,
                                        ${el.position.split(',')[1] * (100 / data)}vw
                                        )`
                                })
                            } else {
                                _this.$refs[`swiperImg${index}`].style.width = `${data * 100}vh`
                                _this.$refs[`swiperImg${index}`].style.height = `${100}vh`
                                e.sign && e.sign.map((el, indexs) => {
                                    _this.$refs[`swiperDiv${index}${indexs}`].style.transform = `translate(
                                        ${el.position.split(',')[0] * 100 * data}vh,
                                        ${el.position.split(',')[1] * 100}vh
                                        )`
                                })
                            }
                            _this.$refs[`swiperImg${index}`].style.backgroundImage = `url(${e.url})`
                            resolve()
                        }
                    }
                })
            }
            doDraw()
        },
    },

    render() {
        const { images } = this.$props
        // {
        //     url: "https://t7.baidu.com/it/u=2306798132,2940525420&fm=193&f=GIF",
        //     sign: [
        //       { defectName: "测试33", direction: "R", position: "0.7,0.5" },
        //       { defectName: "测试44", direction: "L", position: "0.5,0.8" },
        //     ],
        //   }
        return (
            <div class="home">
                <div ref="swiper" class="swiper-container swiper-container-me">
                    <div class="swiper-wrapper" style={{ width: '100vw', height: '100vh' }}>
                        {images.map((e, index) =>
                            <div class="swiper-slide" >
                                <div class="swiper-zoom-container">
                                    <div ref={`swiperImg${index}`}
                                        class="swiper-zoom-target swiper-zoom-target-me">
                                        {
                                            e.sign && e.sign.map((el, indexs) =>
                                                <div
                                                    ref={`swiperDiv${index}${indexs}`}
                                                    style={{ position: 'absolute', top: '0px', left: 0 }}>
                                                    <span class="spanOut" >
                                                        <span
                                                            class={el.direction === 'L' ? 'spanIn' : 'spanIns'}
                                                        >
                                                            {el.defectName}
                                                        </span>
                                                    </span>
                                                </div>)
                                        }
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div >
        )
    }
}
