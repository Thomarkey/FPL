package com.example.FPL.Model;

public enum StatName {
    GAME_STARTED,
    TOT_60_MIN_GESPEELD("LESS_THAN_60_MINUTES_PLAYED"),
    MIN_60_PLUS_GESPEELD("60_MINUTEN_OF_MEER_GESPEELD", "MORE_THAN_60_MINUTES_PLAYED"),
    DOELPUNT("GOAL"),
    ASSIST,
    CLEAN_SHEET,
    PENALTYREDDING,
    PENALTYMISSER,
    JUPILER_MAN_OF_THE_MATCH("MOTM"),
    SKILL_INDEX,
    PER_2_TEGENDOELPUNTEN("FOR_EACH_TWO_GOALS_AGAINST"),
    GELE_KAART("YELLOW_CARD"),
    RODE_KAART("RED_CARD"),
    EIGEN_DOELPUNT,
    PER_2_SCHOTEN_BUITEN_DOELKADER("SCHOTEN_BUITEN_DOELKADER"),
    PER_FOUT_LEIDEND_TOT_DOELPUNT,
    PER_2_SAVES,//CHECK PER 2 SAVES
    MEER_DAN_1_GROTE_KANS_GECREËERD,
    MEER_DAN_1_VERDEDIGENDE_KOPBAL,
    MEER_DAN_7_GERECUPEREERDE_BALLEN,
    MEER_DUELS_GEWONNEN("MEER_DUELS_GEWONNEN_DAN_VERLOREN"),
    MEER_DAN_1_INTERCEPTIE("MEER_DAN_1_RECOVERIES");

    private final String[] alternatives;

    StatName(String... alternatives) {
        this.alternatives = alternatives;
    }

    public static StatName fromName(String name) {
        for (StatName statName : values()) {
            for (String n : statName.alternatives) {
                if (n.equalsIgnoreCase(name)) {
                    return statName;
                }
            }
        }
        throw new IllegalArgumentException("No enum constant with name: " + name);
    }

    public static StatName findByNameOrAlt(String name) {
        StatName enumStatName = null;
        try {
            enumStatName = StatName.valueOf(name);
        } catch (IllegalArgumentException ignored) {
        }

        if (enumStatName == null) {
            enumStatName = StatName.fromName(name.toUpperCase().replace(" ", "_"));
        }

        return enumStatName;
    }
}


