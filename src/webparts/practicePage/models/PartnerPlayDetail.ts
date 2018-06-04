import { PlayImageOrLink } from './PlayImageOrLink'

export class PartnerPlayDetail{
    public ID:number;
    public Title:string;
    public PlayDescription: string;
    public PlayImage: PlayImageOrLink;
    public PlayLink: PlayImageOrLink;
    public SalesConversationsDescription: string;
    public SalesConversationsIcon: PlayImageOrLink;
    public SalesConversationsLink: PlayImageOrLink;
    public MarketOpportunitiesDescription: string;
    public MarketOpportunitiesIcon: PlayImageOrLink;
    public MarketOpportunitiesLink: PlayImageOrLink;
    public SolutionArea: any;
}