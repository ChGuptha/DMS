import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse,
    SPHttpClientConfiguration,
    ISPHttpClientOptions
  } from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base'
import { PartnerPlayDetail } from '../models/PartnerPlayDetail';

export class SharePointDataProvider{
    private _webPartContext: IWebPartContext;

    public set webPartContext(value: IWebPartContext) {
        this._webPartContext = value;
    }

    public get webPartContext(): IWebPartContext {
        return this._webPartContext;
    }

    opts: ISPHttpClientOptions = { 
        headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0', 'User-Agent' : 'NONISV|Microsoft|OCPTool/1.0' }
    };

    public getPartnerPlayDetails(ID:number) : Promise<PartnerPlayDetail>{
        this.opts = { 
            headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0', 'User-Agent' : 'NONISV|Microsoft|OCPTool/1.0' },
            body: JSON.stringify({
                parameters: {
                    RenderOptions: 2,
                    ViewXml: `<View>
                    <ViewFields>
                      <FieldRef Name="Title"/>
                      <FieldRef Name="ID"/>
                      <FieldRef Name="Tile1Title"/>
                      <FieldRef Name="Tile1Image"/>
                      <FieldRef Name="Tile1Link"/>
                      <FieldRef Name="Tile2Title"/>
                      <FieldRef Name="Tile2Image"/>
                      <FieldRef Name="Tile2Link"/>
                      <FieldRef Name="Tile3Title"/>
                      <FieldRef Name="Tile3Image"/>
                      <FieldRef Name="Tile3Link"/>
                      <FieldRef Name="Tile4Title"/>
                      <FieldRef Name="Tile4Image"/>
                      <FieldRef Name="Tile4Link"/>
                      <FieldRef Name="Tile5Title"/>
                      <FieldRef Name="Tile5Image"/>
                      <FieldRef Name="Tile5Link"/>                  
                    </ViewFields>
                    <Query>
                      <Where>
                        <Eq>
                          <FieldRef Name="ID"/>
                          <Value Type="Number">`+ ID +`</Value>
                        </Eq>
                      </Where>
                    </Query>
                    <RowLimit Paged="TRUE">100</RowLimit>
                  </View>`   
                }
            })
        };
        return this._webPartContext.spHttpClient.post(this._webPartContext.pageContext.web.absoluteUrl + `/_api/lists/getByTitle('Partner%20Plays')/RenderListDataAsStream`, SPHttpClient.configurations.v1, this.opts)
        .then((response: SPHttpClientResponse) => {
            return response.json()
        })
        .then((json: { Row: PartnerPlayDetail }) => {
            return json.Row;
        })
    }
}