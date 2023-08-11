export enum Team {
    AA_GENT = 'AA_GENT',
    CERCLE_BRUGGE = 'CERCLE_BRUGGE',
    CLUB_BRUGGE = 'CLUB_BRUGGE',
    KAS_EUPEN = 'KAS_EUPEN',
    KRC_GENK = 'KRC_GENK',
    KV_KORTRIJK = 'KV_KORTRIJK',
    KV_MECHELEN = 'KV_MECHELEN',
    KVC_WESTERLO = 'KVC_WESTERLO',
    OH_LEUVEN = 'OH_LEUVEN',
    ROYAL_ANTWERP_FC = 'ROYAL_ANTWERP_FC',
    ROYALE_UNION_SAINT_GILLOISE = 'Royale Union Saint-Gilloise',
    RSC_ANDERLECHT = 'RSC_ANDERLECHT',
    RWDM = 'RWDM',
    SPORTING_CHARLEROI = 'SPORTING_CHARLEROI',
    STANDARD_DE_LIEGE = 'STANDARD_DE_LIEGE',
    STVV = 'STVV'
}

export function getTeamDisplayName(team: Team): string {
    const words = team.toLowerCase().split('_');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}
