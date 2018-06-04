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
    
    opts: ISPHttpClientOptions = { headers: { 'X-ClientTag': 'NONISV|Microsoft|OCPTool|1.0' } }; 
    public getAll():Promise<Array<ListItem>>{
        return this._webPartContext.spHttpClient.get(this._webPartContext.pageContext.web.absoluteUrl+`/_api/lists/getByTitle('Announcements')/Items?$select=Title,Body&$filter=Active eq 1`, SPHttpClient.configurations.v1, this.opts)
            .then((response: SPHttpClientResponse) => {
                return response.json()
            })
            .then((json: { value: ListItem[] }) => {
                return json.value;
              });
    }
  }