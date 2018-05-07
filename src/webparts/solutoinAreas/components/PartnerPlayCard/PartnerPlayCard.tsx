import * as React from 'react'
import styles from './PartnerPlayCard.module.scss';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react';
import { escape } from '@microsoft/sp-lodash-subset';
import { IPartnerPlayCardProps } from './IPartnerPlayCardProps';

export class PartnerPlayCard extends React.Component<IPartnerPlayCardProps, {}>{
    constructor(props: IPartnerPlayCardProps){
        super(props);
    }

    public render() : React.ReactElement<IPartnerPlayCardProps>{
        return (
            <div className={ styles.partnerPlayCard }>
                <div className={ styles.partnerPlayCardWrapper }>
                    <Image className={ styles.partnerPlayCardImage } src={ this.props.partnerPlay.PlayThumbnail.Url } alt={ this.props.partnerPlay.PlayThumbnail.Description } shouldFadeIn={ true } imageFit={ ImageFit.cover } />
                    <div className= { styles.partnerPlayCardHoverPanel } style={{backgroundColor: this.props.style}} >
                        <div className={ styles.partnerPlayCardTitle }>{this.props.partnerPlay.Title}</div>
                    </div>
                </div>
            </div>
        );
    }
}