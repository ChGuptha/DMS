import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'HomeCarouselWebPartStrings';
import HomeCarousel from './components/HomeCarousel';
import { IHomeCarouselProps } from './components/IHomeCarouselProps';
import { IListService } from './services/IListService';
import { ListMock } from './services/ListMock';
import { ListService } from './services/ListService';

export interface IHomeCarouselWebPartProps {
  enableNavigation: boolean;
  enablePagination: boolean;
  enableAutoplay: boolean;
  delayAutoplay: number;
  disableAutoplayOnInteraction: boolean;
  slidesPerView: string;
  slidesPerGroup: string;
  spaceBetweenSlides: string;
  enableGrabCursor: boolean;
  enableLoop: boolean;
}

export default class HomeCarouselWebPart extends BaseClientSideWebPart<IHomeCarouselWebPartProps> {

  public render(): void {
    let listService = new ListService();
    listService.webPartContext = this.context;
    const element: React.ReactElement<IHomeCarouselProps > = React.createElement(
      HomeCarousel,
      {
        listService : listService,
        swiperOptions : this.properties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Swiper Options'
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.GeneralGroupName,
              groupFields: [
                PropertyPaneToggle('enableNavigation', {
                  label: strings.EnableNavigation
                }),
                PropertyPaneToggle('enablePagination', {
                  label: strings.EnablePagination,
                  checked: true
                }),
                PropertyPaneTextField('slidesPerView', {
                  label: strings.SlidesPerWiew,
                  value: '1'
                })
              ]
            },
            {
              groupName: strings.AutoplayGroupName,
              groupFields: [
                PropertyPaneToggle('enableAutoplay', {
                  label: strings.EnableAutoplay
                }),
                PropertyPaneTextField('delayAutoplay', {
                  label: strings.DelayAutoplay,
                  description: strings.Miliseconds,
                  value: '2500',
                  disabled: !this.properties.enableAutoplay
                }),
                PropertyPaneToggle('disableAutoplayOnInteraction', {
                  label: strings.DisableAutoplayOnInteraction,
                  disabled: !this.properties.enableAutoplay
                })
              ],
              isCollapsed: true
            },
            {
              groupName: strings.AdvancedGroupName,
              groupFields: [
                PropertyPaneTextField('slidesPerGroup', {
                  label: strings.SlidesPerGroup,
                  value: '3'
                }),
                PropertyPaneTextField('spaceBetweenSlides', {
                  label: strings.SpaceBetweenSlides,
                  description: strings.InPixels,
                  value: '5'
                }),
                PropertyPaneToggle('enableGrabCursor', {
                  label: strings.EnableGrabCursor
                }),
                PropertyPaneToggle('enableLoop', {
                  label: strings.EnableLoop
                })
              ],
              isCollapsed: true
            }
          ]
        }
      ]
    };
  }
}
