import * as React from 'react';
import styles from './HomeCarousel.module.scss';
import { IHomeCarouselProps } from './IHomeCarouselProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IHomeCarouselState } from './IHomeCarouselState'
import { ListItem } from '../services/ListItem'
import Card from './Card/Card'

const Swiper = require('swiper/dist/js/swiper.min')

export default class HomeCarousel extends React.Component<IHomeCarouselProps, IHomeCarouselState> {
  private uniqueId: number;

  constructor(props:IHomeCarouselProps){
    super(props);
    this.state = {listItems: []};

    this.uniqueId = Math.floor(Math.random() * 10000) + 1;
  }

  public componentDidMount() : void {
    this.props.listService.getAll().then((result:Array<ListItem>) => {

      this.setState({listItems : result});

      this.setSwiper();
    });
  }

  public render(): React.ReactElement<IHomeCarouselProps> {
    return (
      <div className={styles.homeCarousel}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={`swiper-container container-${this.uniqueId} ` + styles["carousel-container"]}>
                <div className='swiper-wrapper'>
                  {this.state.listItems.length &&
                    this.state.listItems.map((listItem, i) => {
                      return <div className={`swiper-slide ${styles.slide}`} key={i}>
                        <Card listItem={listItem} key={i} />
                      </div>;
                    })}
                </div>
                {this.props.swiperOptions.enableNavigation &&
                  <div className={`swiper-button-next next-${this.uniqueId}`}></div>
                }
                {this.props.swiperOptions.enableNavigation &&
                  <div className={`swiper-button-prev prev-${this.uniqueId}`}></div>
                }

                {this.props.swiperOptions.enablePagination !== false &&
                  <div className={`swiper-pagination pagination-${this.uniqueId}`}></div>
                }
              </div>
            </div>
            <div className={styles.column} style={{textAlign : 'center'}}>
              <img src={String(require('./Carousel_img.png'))} alt="No Image" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private setSwiper(): void {
    const opts = this.props.swiperOptions;

    const options: any = {
      slidesPerView: parseInt(opts.slidesPerView) || 1,
      slidesPerGroup: parseInt(opts.slidesPerGroup) || 1,
      spaceBetween: parseInt(opts.spaceBetweenSlides) || 5,
      loop: opts.enableLoop || false,
      grabCursor: opts.enableGrabCursor || false
    };

    if (opts.enablePagination !== false) {

      options.pagination = {
        el: `.pagination-${this.uniqueId}`,
        clickable: true,
      };
    }

    if (opts.enableNavigation) {

      options.navigation = {
        nextEl: `.next-${this.uniqueId}`,
        prevEl: `.prev-${this.uniqueId}`,
      };
    }

    if (opts.enableAutoplay) {

      options.autoplay = {
        delay: opts.delayAutoplay,
        disableOnInteraction: opts.disableAutoplayOnInteraction,
      };
    }

    return new Swiper(`.container-${this.uniqueId}`, options);
  }
}
