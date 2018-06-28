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
  column1: string;
  column2: string;
  column3: string;
}

export default class PracticePageWebPart extends BaseClientSideWebPart<IPracticePageWebPartProps> {

  public render(): void {
    let sharePointDataProvider =  new SharePointDataProvider();
    sharePointDataProvider.webPartContext = this.context;

    const element: React.ReactElement<IPartnerPlayProps > = React.createElement(
      PartnerPlay,
      {
        dataProvider : sharePointDataProvider,
        column1Title: this.properties.column1,
        column2Title: this.properties.column2,
        column3Title: this.properties.column3
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
                PropertyPaneTextField('column1', {
                  label: strings.Column1Label
                }),
                PropertyPaneTextField('column2', {
                  label: strings.Column2Label
                }),
                PropertyPaneTextField('column3', {
                  label: strings.Column3Label
                })
              ]
            }
          ]
        }
      ]
    };
  }
}