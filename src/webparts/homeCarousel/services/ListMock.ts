import { ListItem } from "./ListItem";
import { IListService } from "./IListService";

export class ListMock implements IListService {

    public getAll(): Promise<Array<ListItem>> {
      return new Promise<Array<ListItem>>((resolve:any) => {

        const fakeData: Array<ListItem> = [

            {
                Title: 'HOW',
                Body: 'Address specific market oppurtunity in timely fashion with partners, providing a clear and targeted apporach'
            },
            {
                Title: 'WHY',
                Body: 'Whereas synchronized brand values promote strategy formulations'
            },
            {
                Title: 'WHEN',
                Body: 'The thinkers/planners benchmark a disciplined growth momentum'
            },
            {
                Title: 'WHAT',
                Body: 'We are working hard to reintermediate a competitive advantage, while the gatekeeper straightforwardly identifies barriers to success'
            }
        ];

        resolve(fakeData);
      });
    }
}
  