import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse,
    SPHttpClientConfiguration
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

    public getSolutionAreas() : Promise<Array<SolutionArea>>{
        return this._webPartContext.spHttpClient.get(this._webPartContext.pageContext.web.absoluteUrl+`/_api/lists/getByTitle('Solution Areas')/Items?$select=Title,ID`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json()
            })
            .then((json: { value: SolutionArea[] }) => {
                return json.value;
              });
    }

    public getPlayTypes() : Promise<Array<PlayType>>{
        return this._webPartContext.spHttpClient.get(this._webPartContext.pageContext.web.absoluteUrl + `/_api/lists/getByTitle('Partner Play Types')/Items?$select=Title,ID`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json()
            })
            .then((json: { value: PlayType[]}) => {
                return json.value;
            });
    }

    public getPartnerPlays() : Promise<Array<PartnerPlay>>{
        return this._webPartContext.spHttpClient.get(this._webPartContext.pageContext.web.absoluteUrl + `/_api/lists/getByTitle('Partner%20Plays')/Items?$select=Title,PlayType/ID,PlayType/Title,PlayThumbnail,SolutionArea/ID,SolutionArea/Title&$expand=PlayType,SolutionArea`, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            return response.json()
        })
        .then((json: { value: PartnerPlay[] }) => {
            return json.value;
        })
    }
}