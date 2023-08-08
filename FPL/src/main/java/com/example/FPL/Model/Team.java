package com.example.FPL.Model;

public enum Team {
    AA_GENT,
    CERCLE_BRUGGE,
    CLUB_BRUGGE,
    KAS_EUPEN,
    KRC_GENK,
    KV_KORTRIJK,
    KV_MECHELEN,
    KVC_WESTERLO,
    OH_LEUVEN,
    ROYAL_ANTWERP_FC,
    ROYALE_UNION_SAINT_GILLOISE("Royale Union Saint-Gilloise"),
    RSC_ANDERLECHT,
    RWDM,
    SPORTING_CHARLEROI,
    STANDARD_DE_LIEGE("Standard de Liège"),
    STVV;

    private final String alternativeName;

    Team() {
        this.alternativeName = null;
    }

    Team(String alternativeName) {
        this.alternativeName = alternativeName;
    }

    public String getAlternativeName() {
        return alternativeName;
    }
}
