import * as React from 'react';
import styles from './PartnerPlay.module.scss';
import { IPartnerPlayProps } from './IPartnerPlayProps';
import { IPartnerPlayState } from './IPartnerPlayState';
import { escape } from '@microsoft/sp-lodash-subset';
import { PartnerPlayDetail } from '../models/PartnerPlayDetail'
import { PartnerPlayDetailCard } from './PartnerPlayDetailCard/PartnerPlayDetailCard'

export default class PartnerPlay extends React.Component<IPartnerPlayProps, IPartnerPlayState> {
  constructor(props: IPartnerPlayProps){
    super(props);
    this.state = { partnerPlayDetails : [] }
  }

  public componentDidMount():void{
    console.log('Component Did Mount Starts')
    console.log(window.location.href);
    let params = (new URL(window.location.href)).searchParams;
    console.log(params);
    let sID:number = parseInt(params.get("sID"));

    this.props.dataProvider.getPartnerPlayDetails(sID).then((result: PartnerPlayDetail[]) => {
      this.setState({ partnerPlayDetails: result});
    });
  }

  public render(): React.ReactElement<IPartnerPlayProps> {
    return (
      <div className={ styles.partnerPlay }>
        <div className={ styles.container }>         
          <div className={ styles.row }>            
            <div className={ styles.column }>
            <h1>{this.state.partnerPlayDetails.length && <p>{this.state.partnerPlayDetails[0].Solution_x0020_Area_x003a_Title}</p>}</h1>
              <div className={ styles.partnerplayrow }>
                <div className={ styles.partnerplaycolumn1header }>
                  PLAYS
                </div>
                <div className={ styles.partnerplaycolumn2header }>
                  SALES CONVERSATIONS
                </div>
                <div className={ styles.partnerplaycolumn2header }>
                  MARKET OPPORTUNITIES
                </div>
              </div>
              {this.state.partnerPlayDetails.length && 
                this.state.partnerPlayDetails.map((PartnerPlayDetail, i) =>{
                  return <div className={ styles.partnerplayrow }>
              <div className={ styles.partnerplaycolumn1 }>
              {
                <PartnerPlayDetailCard height={240} cardDetail= {{ Title: PartnerPlayDetail.PlayDescription, Image: PartnerPlayDetail.PlayImage, Link: PartnerPlayDetail.PlayLink }}/>              
              }              
              </div>
              <div className={ styles.partnerplaycolumn2 }>
                <div className={ styles.partnerplayrow2 }>
                  <div className={ styles.partnericoncolumn }>
                  <img src={PartnerPlayDetail.SalesConversationsIcon}/>
                  </div>
                </div>
                <div className={ styles.partnerplayrow2}>
                  <div className={ styles.partnerdescriptionolumn }>
                    {PartnerPlayDetail.SalesConversationsDescription}
                  </div>
                </div>             
              </div>
              <div className={ styles.partnerplaycolumn2 }>
                <div className={ styles.partnerplayrow2 }>
                  <div className={ styles.partnericoncolumn }>
                  <img src={PartnerPlayDetail.MarketOpportunitiesIcon}/>
                  </div>
                </div>
                <div className={ styles.partnerplayrow2}>
                  <div className={ styles.partnerdescriptionolumn }>
                    {PartnerPlayDetail.MarketOpportunitiesDescription}
                  </div>
                </div>  
              </div>
            </div>
                })}
          </div>
        </div>
      </div>
      </div>
    )
  }
}
