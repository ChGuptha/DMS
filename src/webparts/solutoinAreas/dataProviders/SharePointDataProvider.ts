import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse,
    SPHttpClientConfiguration,
    ISPHttpClientOptions
  } from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base'
import { SolutionArea } from '../models/SolutionArea'
import { PlayType } from '../models/PlayType';
import { PartnerPlay } from '../models/PartnerPlay';

export class SharePointDataProvider{
    private _webPartContext: IWebPartContext;

    public set webPartContext(value: IWebPartContext) {
        this._webPartContext = value;
    }

    public get webPartContext(): IWebPartContext {
    return this._webPartContext;
    }
    opts: ISPHttpClientOptions = { headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0' } };

    public getSolutionAreas() : Promise<Array<SolutionArea>>{
        this.opts = { 
            headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0' },
            body: JSON.stringify({
                parameters: {
                    RenderOptions: 2,
                    ViewXml: `<View>
                    <ViewFields>
                      <FieldRef Name="Title"/>
                      <FieldRef Name="ID"/>
                    </ViewFields>
                    <Query>
                      <Where>
                        <Gt>
                          <FieldRef Name="ID"/>
                          <Value Type="Number">0</Value>
                        </Gt>
                      </Where>
                    </Query>
                    <RowLimit Paged="TRUE">100</RowLimit>
                  </View>`   
                }
            })
        };
        return this._webPartContext.spHttpClient.post(this._webPartContext.pageContext.web.absoluteUrl+`/_api/lists/getByTitle('Solution Areas')/RenderListDataAsStream`, SPHttpClient.configurations.v1, this.opts)
            .then((response: SPHttpClientResponse) => {
                return response.json()
            })
            .then((json: { Row: SolutionArea[] }) => {
                return json.Row;
              });
    }

    public getPlayTypes() : Promise<Array<PlayType>>{
        this.opts = { 
            headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0' },
            body: JSON.stringify({
                parameters: {
                    RenderOptions: 2,
                    ViewXml: `<View>
                    <ViewFields>
                      <FieldRef Name="Title"/>
                      <FieldRef Name="ID"/>
                    </ViewFields>
                    <Query>
                      <Where>
                        <Gt>
                          <FieldRef Name="ID"/>
                          <Value Type="Number">0</Value>
                        </Gt>
                      </Where>
                    </Query>
                    <RowLimit Paged="TRUE">100</RowLimit>
                  </View>`   
                }
            })
        };
        return this._webPartContext.spHttpClient.post(this._webPartContext.pageContext.web.absoluteUrl + `/_api/lists/getByTitle('Partner Play Types')/RenderListDataAsStream`, SPHttpClient.configurations.v1, this.opts)
            .then((response: SPHttpClientResponse) => {
                return response.json()
            })
            .then((json: { Row: PlayType[]}) => {
                return json.Row;
            });
    }

    public getPartnerPlays() : Promise<Array<PartnerPlay>>{
        this.opts = { 
            headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0' },
            body: JSON.stringify({
                parameters: {
                    RenderOptions: 2,
                    ViewXml: `<View>
                    <ViewFields>
                      <FieldRef Name="Title"/>
                      <FieldRef Name="ID"/>
                      <FieldRef Name="PlayThumbnail"/>
                      <FieldRef Name="Solution_x0020_Area_x003a_ID"/>
                      <FieldRef Name="Solution_x0020_Area_x003a_Title"/>
                      <FieldRef Name="Play_x0020_Type_x003a_ID"/>
                      <FieldRef Name="Play_x0020_Type_x003a_Title"/>
                    </ViewFields>
                    <Query>
                      <Where>
                        <Gt>
                          <FieldRef Name="ID"/>
                          <Value Type="Number">0</Value>
                        </Gt>
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
        .then((json: { Row: PartnerPlay[] }) => {
            return json.Row;
        })
    }
}