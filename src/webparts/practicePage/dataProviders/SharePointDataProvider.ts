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
    opts: ISPHttpClientOptions = { headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0', 'User-Agent' : 'NONISV|Microsoft|OCPTool/1.0' } }; 

    public getPartnerPlayDetails(ID:number) : Promise<Array<PartnerPlayDetail>>{
        this.opts = { 
            headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool/1.0', 'User-Agent' : 'NONISV|Microsoft|OCPTool/1.0' },
            body: JSON.stringify({
                parameters: {
                    RenderOptions: 2,
                    ViewXml: `<View>
                    <ViewFields>
                      <FieldRef Name="Title"/>
                      <FieldRef Name="ID"/>
                      <FieldRef Name="PlayDescription"/>
                      <FieldRef Name="PlayImage"/>
                      <FieldRef Name="PlayLink"/>
                      <FieldRef Name="SalesConversationsDescription"/>
                      <FieldRef Name="SalesConversationsIcon"/>
                      <FieldRef Name="SalesConversationsLink"/>
                      <FieldRef Name="MarketOpportunitiesDescription"/>
                      <FieldRef Name="MarketOpportunitiesIcon"/>
                      <FieldRef Name="MarketOpportunitiesLink"/>
                      <FieldRef Name="SolutionArea"/>
                      <FieldRef Name="Solution_x0020_Area_x003a_ID"/>
                      <FieldRef Name="Solution_x0020_Area_x003a_Title"/>
                    </ViewFields>
                    <Query>
                      <Where>
                        <Eq>
                          <FieldRef Name="SolutionArea" LookupId="TRUE"/>
                          <Value Type="Lookup">`+ ID +`</Value>
                        </Eq>
                      </Where>
                    </Query>
                    <RowLimit Paged="TRUE">100</RowLimit>
                  </View>`   
                }
            })
        };
        return this._webPartContext.spHttpClient.post(this._webPartContext.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Partner Plays')/RenderListDataAsStream`, SPHttpClient.configurations.v1, this.opts)
        .then((response: SPHttpClientResponse) => {
            return response.json()
        })
        .then((json: { Row: PartnerPlayDetail[] }) => {
            return json.Row;
        })
    }
}