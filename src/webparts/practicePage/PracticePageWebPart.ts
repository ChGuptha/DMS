import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PracticePageWebPartStrings';
import PartnerPlay from './components/PartnerPlay';
import { IPartnerPlayProps } from './components/IPartnerPlayProps';
import { SharePointDataProvider } from './dataProviders/SharePointDataProvider'

export interface IPracticePageWebPartProps {
  description: string;
}

export default class PracticePageWebPart extends BaseClientSideWebPart<IPracticePageWebPartProps> {

  public render(): void {
    let sharePointDataProvider =  new SharePointDataProvider();
    sharePointDataProvider.webPartContext = this.context;

    const element: React.ReactElement<IPartnerPlayProps > = React.createElement(
      PartnerPlay,
      {
        dataProvider : sharePointDataProvider,
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