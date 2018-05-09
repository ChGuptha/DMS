import { SolutionArea } from "./SolutionArea";
import { PlayType } from "./PlayType";
import { PlayImage } from "./PlayImage";

export class PartnerPlay{
    public ID: number;
    public Title :string;
    public PlayType : PlayType;
    public SolutionArea : SolutionArea
    public PlayThumbnail : PlayImage
}
