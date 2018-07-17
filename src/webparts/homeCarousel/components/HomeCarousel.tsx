import * as React from 'react';
import styles from './HomeCarousel.module.scss';
import { IHomeCarouselProps } from './IHomeCarouselProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IHomeCarouselState } from './IHomeCarouselState'
import { ListItem } from '../services/ListItem'
import Card from './Card/Card'
import ReactDOM = require('react-dom');

require('../components/swiper-custom.min.css')

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
                  <div className={`swiper-navigation`}>
                    <div className={`swiper-button-next next-${this.uniqueId}`}></div>
                    <div className={`swiper-button-prev prev-${this.uniqueId}`}></div>
                  </div>
                  <div className={`swiper-pagination pagination-${this.uniqueId}`}></div>
              </div>
            </div>
            <div className={styles.column} style={{textAlign : 'center'}}>
              <img src={this.props.imageUrl} alt="No Image" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private setSwiper(): void {
    const opts = this.props.swiperOptions;

    const options: any = {
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay : 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: `.pagination-${this.uniqueId}`,
        clickable: true
      },
      navigation: {
        nextEl: `.next-${this.uniqueId}`,
        prevEl: `.prev-${this.uniqueId}`
      }
    };

    return new Swiper(`.container-${this.uniqueId}`, options);
  }
}
