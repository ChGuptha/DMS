import * as React from 'react';
import styles from './PartnerPlayDetailCard.module.scss'
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react';
import { escape } from '@microsoft/sp-lodash-subset';
import { IPartnerPlayDetailCardProps } from './IPartnerPlayDetailCardProps'

export class PartnerPlayDetailCard extends React.Component<IPartnerPlayDetailCardProps,{}>{
    constructor(props: IPartnerPlayDetailCardProps){
        super(props);
    }

    public navigateUrl(event){
        window.open(this.props.cardDetail.Link.Url, '_blank');
    }

    public render(): React.ReactElement<IPartnerPlayDetailCardProps>{
        return (
            <div className={ styles.partnerPlayDetailCard }>
                <div className={ styles.partnerPlayDetailCardWrapper } onClick={ this.navigateUrl.bind(this) } style={{height: this.props.height + 'px'}}>
                    <Image className={ styles.partnerPlayDetailCardImage } height={this.props.height} src={ this.props.cardDetail.Image.Url } alt={ this.props.cardDetail.Image.Description } shouldFadeIn={ true } imageFit={ ImageFit.cover } />
                    <div className= { styles.partnerPlayDetailCardHoverPanel } >
                        <div className={ styles.partnerPlayDetailCardTitle }>{this.props.cardDetail.Title}</div>
                    </div>
                </div>
            </div>
        );
    }
}