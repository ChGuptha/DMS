import { IListService } from '../services/IListService'
import { IHomeCarouselWebPartProps } from '../HomeCarouselWebPart'

export interface IHomeCarouselProps {
  listService : IListService;
  swiperOptions : IHomeCarouselWebPartProps;
}
