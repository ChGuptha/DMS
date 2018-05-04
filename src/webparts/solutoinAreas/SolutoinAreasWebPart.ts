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

export interface ISolutoinAreasWebPartProps {
  description: string;
}

export default class SolutoinAreasWebPart extends BaseClientSideWebPart<ISolutoinAreasWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISolutoinAreasProps > = React.createElement(
      SolutoinAreas,
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
