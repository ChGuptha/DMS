import * as React from 'react';
import styles from './SolutoinAreas.module.scss';
import { ISolutoinAreasProps } from './ISolutoinAreasProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISolutionAreasState } from './ISolutionAreasState'
import { SolutionArea } from '../models/SolutionArea'
import { PartnerPlay } from '../models/PartnerPlay';
import { PlayType } from '../models/PlayType';
import { PartnerPlayCard } from './PartnerPlayCard/PartnerPlayCard'

export default class SolutoinAreas extends React.Component<ISolutoinAreasProps, ISolutionAreasState> {
  constructor(props:ISolutoinAreasProps){
    super(props);
    this.state = { solutionAreas: [], playTypes: [], partnerPlays: [], selectedPlayType: 0 };
  }

  public componentDidMount():void{
    this.props.dataProvider.getSolutionAreas().then((result:Array<SolutionArea>) => {
      this.setState({ solutionAreas:result, playTypes: this.state.playTypes, partnerPlays: this.state.partnerPlays });
    });

    this.props.dataProvider.getPlayTypes().then((result: Array<PlayType>) =>{
      this.setState({ solutionAreas: this.state.solutionAreas, playTypes: result, partnerPlays: this.state.partnerPlays });
    });

    this.props.dataProvider.getPartnerPlays().then((result: PartnerPlay[]) => {
      this.setState({ solutionAreas: this.state.solutionAreas, playTypes: this.state.playTypes, partnerPlays: result });
    })
  }

  public changePlayType(playType: number){
    this.setState({
      solutionAreas : this.state.solutionAreas,
      playTypes: this.state.playTypes,
      partnerPlays: this.state.partnerPlays,
      selectedPlayType: playType
    });
  }

  public render(): React.ReactElement<ISolutoinAreasProps> {
    return (
      <div className={ styles.solutoinAreas }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <h3>Solution Areas</h3>
              {this.state.solutionAreas.length && 
                this.state.solutionAreas.map((SolutionArea, i) =>{
                  return <div className={` ${styles.solutionArea}`} >
                            <span>{SolutionArea.Title}</span>
                          </div>;
              })}
            </div>
          </div>
          <div className={ styles.row }>
            <div className={ styles.column + ' ' + styles.playTypes}>
              <h3>Partner Plays</h3>
              <div>
                <a className={ this.state.selectedPlayType == 0 ? styles.active : '' } href="#" onClick={ () => this.changePlayType(0) } >All</a>
                {this.state.playTypes.length &&
                  this.state.playTypes.map((PlayType, i) =>{
                    return <a href="#" className={ this.state.selectedPlayType == PlayType.ID ? styles.active : '' }  onClick={ () => this.changePlayType(PlayType.ID) }>{ PlayType.Title }</a>
                  })}               
              </div>
            </div>
          </div>
          <div className={ styles.row + ` ` + styles.partnerPlaysRow }>
            <div className={ styles.column }>
                  {this.state.solutionAreas.length &&
                    this.state.solutionAreas.map((SolutionArea, i) => {
                      return <div className = {` ${styles.partnerPlays} `} >
                            {this.state.partnerPlays.length &&
                              this.state.partnerPlays.filter(p => p.SolutionArea.ID == SolutionArea.ID && (this.state.selectedPlayType == 0 || p.PlayType.ID == this.state.selectedPlayType)).map((PartnerPlay, j) =>{
                                return <PartnerPlayCard partnerPlay={PartnerPlay} style={ (i%2) + 1 == 1 ? `rgba(92,0,92,0.8)`: `rgba(50,20,90, 0.8)`} />
                              })}            
                            </div>
                    })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}