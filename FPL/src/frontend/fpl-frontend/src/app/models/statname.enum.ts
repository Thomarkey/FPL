export enum StatName {
    GAME_STARTED = 'GAME_STARTED',
    TOT_60_MIN_GESPEELD = 'TOT_60_MIN_GESPEELD',
    MIN_60_PLUS_GESPEELD = 'MIN_60_PLUS_GESPEELD',
    DOELPUNT = 'DOELPUNT',
    ASSIST = 'ASSIST',
    CLEAN_SHEET = 'CLEAN_SHEET',
    PENALTYREDDING = 'PENALTYREDDING',
    PENALTYMISSER = 'PENALTYMISSER',
    JUPILER_MAN_OF_THE_MATCH = 'JUPILER_MAN_OF_THE_MATCH',
    SKILL_INDEX = 'SKILL_INDEX',
    PER_2_TEGENDOELPUNTEN = 'PER_2_TEGENDOELPUNTEN',
    GELE_KAART = 'GELE_KAART',
    RODE_KAART = 'RODE_KAART',
    EIGEN_DOELPUNT = 'EIGEN_DOELPUNT',
    PER_2_SCHOTEN_BUITEN_DOELKADER = 'PER_2_SCHOTEN_BUITEN_DOELKADER',
    PER_FOUT_LEIDEND_TOT_DOELPUNT = 'PER_FOUT_LEIDEND_TOT_DOELPUNT',
    PER_2_SAVES = 'PER_2_SAVES',
    MEER_DAN_1_GROTE_KANS_GECREËERD = 'MEER_DAN_1_GROTE_KANS_GECREËERD',
    MEER_DAN_1_VERDEDIGENDE_KOPBAL = 'MEER_DAN_1_VERDEDIGENDE_KOPBAL',
    MEER_DAN_7_GERECUPEREERDE_BALLEN = 'MEER_DAN_7_GERECUPEREERDE_BALLEN',
    MEER_DUELS_GEWONNEN = 'MEER_DUELS_GEWONNEN',
    MEER_DAN_1_INTERCEPTIE = 'MEER_DAN_1_INTERCEPTIE'
}

export const StatNameInfo: Record<StatName, { displayName: string, abbrev: string }> = {
    [StatName.GAME_STARTED]: { displayName: 'Matches gestart', abbrev: 'MG' },
    [StatName.TOT_60_MIN_GESPEELD]: { displayName: 'Tot 60 minuten gespeeld', abbrev: '-60' },
    [StatName.MIN_60_PLUS_GESPEELD]: { displayName: '60 minuten of meer gespeeld', abbrev: '+60' },
    [StatName.DOELPUNT]: { displayName: 'Goal', abbrev: 'G' },
    [StatName.ASSIST]: { displayName: 'Assist', abbrev: 'A' },
    [StatName.CLEAN_SHEET]: { displayName: 'Clean Sheet', abbrev: 'CS' },
    [StatName.PENALTYREDDING]: { displayName: 'Penaltyredding', abbrev: 'PR' },
    [StatName.PENALTYMISSER]: { displayName: 'Penaltymisser', abbrev: 'PM' },
    [StatName.JUPILER_MAN_OF_THE_MATCH]: { displayName: 'Man of the Match', abbrev: 'MOTM' },
    [StatName.SKILL_INDEX]: { displayName: 'Skill Index', abbrev: 'SI' },
    [StatName.PER_2_TEGENDOELPUNTEN]: { displayName: 'Per 2 tegendoelpunten', abbrev: 'GT' },
    [StatName.GELE_KAART]: { displayName: 'Gele kaart', abbrev: 'GK' },
    [StatName.RODE_KAART]: { displayName: 'Rode kaart', abbrev: 'RK' },
    [StatName.EIGEN_DOELPUNT]: { displayName: 'Own Goal', abbrev: 'OG' },
    [StatName.PER_2_SCHOTEN_BUITEN_DOELKADER]: { displayName: 'Per 2 schoten buiten doelkader', abbrev: 'SBD' },
    [StatName.PER_FOUT_LEIDEND_TOT_DOELPUNT]: { displayName: 'Per fout die leidt tot een doelpunt', abbrev: 'FLTG' },
    [StatName.PER_2_SAVES]: { displayName: 'Per 2 saves', abbrev: 'SA' },
    [StatName.MEER_DAN_1_GROTE_KANS_GECREËERD]: { displayName: 'Meer dan 1 grote kans gecreëerd', abbrev: 'KG' },
    [StatName.MEER_DAN_1_VERDEDIGENDE_KOPBAL]: { displayName: 'Meer dan 1 verdedigende kopbal', abbrev: 'VK' },
    [StatName.MEER_DAN_7_GERECUPEREERDE_BALLEN]: { displayName: 'Meer dan 7 gerecupereerde ballen', abbrev: 'BG' },
    [StatName.MEER_DUELS_GEWONNEN]: { displayName: 'Meer duels gewonnen dan verloren', abbrev: 'DG' },
    [StatName.MEER_DAN_1_INTERCEPTIE]: { displayName: 'Meer dan 1 interceptie', abbrev: 'IN' }
};



export function getStatNameDisplayName(statName: StatName): string {
    return StatNameInfo[statName]?.displayName || '';
}

export function getStatNameAbbreviation(statName: StatName): string {
    return StatNameInfo[statName]?.abbrev || '';
}

