import { SolutionArea } from "../models/SolutionArea"
import { PartnerPlay } from "../models/PartnerPlay";
import { PlayType } from "../models/PlayType";

export interface ISolutionAreasState{
    solutionAreas: Array<SolutionArea>
    playTypes: Array<PlayType>
    partnerPlays : Array<PartnerPlay>
    selectedPlayType?: number
}