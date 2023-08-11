export enum Position {
    GOALKEEPER = 'GOALKEEPER',
    DEFENDER = 'DEFENDER',
    MIDFIELDER = 'MIDFIELDER',
    FORWARD = 'FORWARD'
}

export function getPositionDisplayName(position: Position): string {
    switch (position) {
        case Position.GOALKEEPER:
            return 'Goalkeeper';
        case Position.DEFENDER:
            return 'Defender';
        case Position.MIDFIELDER:
            return 'Midfielder';
        case Position.FORWARD:
            return 'Forward';
        default:
            return '';
    }

}