import { SolutionArea } from "../../../../lib/webparts/solutoinAreas/models/SolutionArea";
import { PlayType } from "./PlayType";
import { PlayImage } from "./PlayImage";

export class PartnerPlay{
    public Title :string;
    public PlayType : PlayType;
    public SolutionArea : SolutionArea
    public PlayThumbnail : PlayImage
}
