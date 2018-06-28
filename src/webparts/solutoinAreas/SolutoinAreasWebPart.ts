import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SolutoinAreasWebPartStrings';
import SolutoinAreas from './components/SolutoinAreas';
import { ISolutoinAreasProps } from './components/ISolutoinAreasProps';
import { SharePointDataProvider } from './dataProviders/SharePointDataProvider'
export interface ISolutoinAreasWebPartProps {
  title: string;
  titleBOM: string;
}

export default class SolutoinAreasWebPart extends BaseClientSideWebPart<ISolutoinAreasWebPartProps> {  

  public render(): void {
    let sharePointDataProvider =  new SharePointDataProvider();
    sharePointDataProvider.webPartContext = this.context;

    const element: React.ReactElement<ISolutoinAreasProps > = React.createElement(
      SolutoinAreas,
      {
        dataProvider : sharePointDataProvider,
        title: this.properties.title,
        titleBOM: this.properties.titleBOM
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('titleBOM', {
                  label: strings.BOMTitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
