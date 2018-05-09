import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse,
    SPHttpClientConfiguration
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

    public getPartnerPlayDetails(ID:number) : Promise<PartnerPlayDetail>{
        return this._webPartContext.spHttpClient.get(this._webPartContext.pageContext.web.absoluteUrl + `/_api/lists/getByTitle('Partner%20Plays')/Items?$filter=ID eq ` + ID + `&$select=Title,ID,Tile1Title,Tile1Image,Tile1Link,Tile2Title,Tile2Image,Tile2Link,Tile3Title,Tile3Image,Tile3Link,Tile4Title,Tile4Image,Tile4Link,Tile5Title,Tile5Image,Tile5Link`, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            return response.json()
        })
        .then((json: { value: PartnerPlayDetail }) => {
            return json.value;
        })
    }
}