import { Position } from "./position.enum";
import { StatName } from "./statName.enum";
import { Team } from "./team.enum";

export interface Player {
    id: number;
    name: string;
    team: Team;
    position: Position;
    // stats: Map<StatName, number>;
    stats: Record<StatName, number>;
}