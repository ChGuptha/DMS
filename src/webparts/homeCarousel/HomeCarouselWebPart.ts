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
  imageUrl : string
}

export default class HomeCarouselWebPart extends BaseClientSideWebPart<IHomeCarouselWebPartProps> {

  public render(): void {
    let listService = new ListService();
    listService.webPartContext = this.context;
    const element: React.ReactElement<IHomeCarouselProps > = React.createElement(
      HomeCarousel,
      {
        listService : listService,
        swiperOptions : this.properties,
        imageUrl: this.properties.imageUrl
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
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('imageUrl', {
                  label: strings.ImageUrlFieldName
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
