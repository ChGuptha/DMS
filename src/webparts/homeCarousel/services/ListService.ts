import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse,
    ISPHttpClientOptions
  } from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base'
import { ListItem } from '../services/ListItem';
import { IListService } from '../services/IListService';

  export class ListService implements IListService{
    private _webPartContext: IWebPartContext;

    public set webPartContext(value: IWebPartContext) {
        this._webPartContext = value;
    }

    public get webPartContext(): IWebPartContext {
    return this._webPartContext;
    }
    
    opts: ISPHttpClientOptions = { 
        headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0' },
        body: JSON.stringify({
            parameters: {
                RenderOptions: 2,
                ViewXml: `<View>
                <ViewFields>
                  <FieldRef Name="Title"/>
                  <FieldRef Name="Body"/>
                </ViewFields>
                <Query>
                  <Where>
                    <Eq>
                      <FieldRef Name="Active"/>
                      <Value Type="Integer">1</Value>
                    </Eq>
                  </Where>
                </Query>
                <RowLimit Paged="TRUE">100</RowLimit>
              </View>`   
            }
        })
    }; 
    public getAll():Promise<Array<ListItem>>{
        return this._webPartContext.spHttpClient.post(this._webPartContext.pageContext.web.absoluteUrl+`/_api/lists/getByTitle('Announcements')/RenderListDataAsStream`, SPHttpClient.configurations.v1, this.opts)
            .then((response: SPHttpClientResponse) => {
                return response.json()
            })
            .then((json: { Row: ListItem[] }) => {
                return json.Row;
              });
    }
  }