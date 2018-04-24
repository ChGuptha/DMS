import { ListItem } from "./ListItem";
import { IListService } from "./IListService";

export class ListMock implements IListService {

    public getAll(): Promise<Array<ListItem>> {
      return new Promise<Array<ListItem>>((resolve:any) => {

        const fakeData: Array<ListItem> = [

            {
                title: 'HOW',
                description: 'Address specific market oppurtunity in timely fashion with partners, providing a clear and targeted apporach'
            },
            {
                title: 'WHY',
                description: 'Whereas synchronized brand values promote strategy formulations'
            },
            {
                title: 'WHEN',
                description: 'The thinkers/planners benchmark a disciplined growth momentum'
            },
            {
                title: 'WHAT',
                description: 'We are working hard to reintermediate a competitive advantage, while the gatekeeper straightforwardly identifies barriers to success'
            }
        ];

        resolve(fakeData);
      });
    }
}
  