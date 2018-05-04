declare interface IHomeCarouselWebPartStrings {
  SwiperOptions: string;
  GeneralGroupName: string;
  EnableNavigation: string;
  EnablePagination: string;
  SlidesPerWiew: string;
  AutoplayGroupName: string;
  EnableAutoplay: string;
  DelayAutoplay: string;
  Miliseconds: string;
  DisableAutoplayOnInteraction: string;
  AdvancedGroupName: string;
  SlidesPerGroup: string;
  SpaceBetweenSlides: string;
  InPixels: string;
  EnableGrabCursor: string;
  EnableLoop: string;
}

declare module 'HomeCarouselWebPartStrings' {
  const strings: IHomeCarouselWebPartStrings;
  export = strings;
}
