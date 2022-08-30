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
            console.log(e);
            const _this = this
            const doDraw = async () => {
                return new Promise(async resolve => {
                    const img = new Image()
                    img.src = e.url
                    img.onload = async function () {
                        if (img.complete) {
                            const data = img.width / img.height
                            _this.$refs[`swiperImg${index}`].style.height = `${100 / data}vw`
                            _this.$refs[`swiperImg${index}`].style.backgroundImage = `url(${e.url})`
                            _this.$refs[`swiperDiv${index}`].style.transform = `translate(
                              ${e.position.split(',')[0] * 100}vw,
                              ${e.position.split(',')[1] * (100 / data)}vw
                              )`
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
        return (
            <div class="home">
                <div ref="swiper" class="swiper-container swiper-container-me">
                    <div class="swiper-wrapper" style={{ width: '657px' }}>
                        {images.map((e, index) =>
                            <div class="swiper-slide" >
                                <div class="swiper-zoom-container">
                                    <div ref={`swiperImg${index}`}
                                        class="swiper-zoom-target swiper-zoom-target-me">
                                        <div
                                            ref={`swiperDiv${index}`}
                                            style={{ position: 'absolute', top: '0px', left: 0 }}>
                                            <span class="spanOut" >
                                                <span
                                                    class={e.direction === 'L' ? 'spanIn' : 'spanIns'}
                                                >
                                                    {e.defectName}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div >
        )
    }
}
