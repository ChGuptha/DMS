import * as React from 'react';
import styles from './PartnerPlay.module.scss';
import { IPartnerPlayProps } from './IPartnerPlayProps';
import { IPartnerPlayState } from './IPrrtnerPlayState';
import { escape } from '@microsoft/sp-lodash-subset';
import { PartnerPlayDetail } from '../models/PartnerPlayDetail'
import { PartnerPlayDetailCard } from './PartnerPlayDetailCard/PartnerPlayDetailCard'

export default class PartnerPlay extends React.Component<IPartnerPlayProps, IPartnerPlayState> {
  constructor(props: IPartnerPlayProps){
    super(props);
    this.state = { partnerPlayDetail : new PartnerPlayDetail() }
  }

  public componentDidMount():void{
    console.log('Component Did Mount Starts')
    console.log(window.location.href);
    let params = (new URL(window.location.href)).searchParams;
    console.log(params);
    let playID:number = parseInt(params.get("PlayID"));

    this.props.dataProvider.getPartnerPlayDetails(playID).then((result: PartnerPlayDetail) => {
      this.setState({ partnerPlayDetail: result[0] });
    });
  }

  public render(): React.ReactElement<IPartnerPlayProps> {
    return (
      <div className={ styles.partnerPlay }>
        <div className={ styles.container }>
          <h3>Play: {this.state.partnerPlayDetail.Title }</h3>
          <div className={ styles.row }>            
            <div className={ styles.column }>
            {
              this.state.partnerPlayDetail.ID > 0 &&
              <PartnerPlayDetailCard height={480} cardDetail= {{ Title: this.state.partnerPlayDetail.Tile1Title, Image: this.state.partnerPlayDetail.Tile1Image, Link: this.state.partnerPlayDetail.Tile1Link }}/>              
            }              
            </div>
            <div className={ styles.column }>
              <div className={ styles.row }>
                <div className={ styles.column }>
                  {
                    this.state.partnerPlayDetail.ID > 0 &&
                    <PartnerPlayDetailCard height={240} cardDetail= {{ Title: this.state.partnerPlayDetail.Tile2Title, Image: this.state.partnerPlayDetail.Tile2Image, Link: this.state.partnerPlayDetail.Tile2Link }}/>                            
                  }
                </div>
                <div className={ styles.column }>
                  {
                    this.state.partnerPlayDetail.ID > 0 &&
                    <PartnerPlayDetailCard height={240} cardDetail= {{ Title: this.state.partnerPlayDetail.Tile3Title, Image: this.state.partnerPlayDetail.Tile3Image, Link: this.state.partnerPlayDetail.Tile3Link }}/>                            
                  }
                </div>
                <div className={ styles.column }>
                  {
                    this.state.partnerPlayDetail.ID > 0 &&
                    <PartnerPlayDetailCard height={240} cardDetail= {{ Title: this.state.partnerPlayDetail.Tile4Title, Image: this.state.partnerPlayDetail.Tile4Image, Link: this.state.partnerPlayDetail.Tile4Link }}/>                            
                  }
                </div>
                <div className={ styles.column }>
                  {
                    this.state.partnerPlayDetail.ID > 0 &&
                    <PartnerPlayDetailCard height={240} cardDetail= {{ Title: this.state.partnerPlayDetail.Tile5Title, Image: this.state.partnerPlayDetail.Tile5Image, Link: this.state.partnerPlayDetail.Tile5Link }}/>                            
                  }
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
