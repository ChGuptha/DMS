import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HomeCarouselWebPartStrings';
import HomeCarousel from './components/HomeCarousel';
import { IHomeCarouselProps } from './components/IHomeCarouselProps';

export interface IHomeCarouselWebPartProps {
  description: string;
}

export default class HomeCarouselWebPart extends BaseClientSideWebPart<IHomeCarouselWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHomeCarouselProps > = React.createElement(
      HomeCarousel,
      {
        description: this.properties.description
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
