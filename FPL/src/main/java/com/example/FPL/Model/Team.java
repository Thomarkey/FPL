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
    ROYALE_UNION_SAINT_GILLOISE("USG", "Royale Union Saint-Gilloise"),
    RSC_ANDERLECHT("AND", "Anderlecht"),
    RWDM,
    SPORTING_CHARLEROI,
    STANDARD_DE_LIEGE("STA", "Standard de Liège"),
    STVV;

    private final String alternativeName;
    private final String abbreviation;

    Team() {
        this.alternativeName = null;
        this.abbreviation = null;
    }


    Team(String abbreviation, String alternativeName) {
        this.abbreviation = abbreviation;
        this.alternativeName = alternativeName;
    }


    public String getAlternativeName() {
        return alternativeName;
    }

    public String getAbbreviation() {
        return abbreviation;
    }


    public static Team fromAbbreviation(String abbreviation) {
        for (Team team : Team.values()) {
            if (abbreviation.equalsIgnoreCase(team.getAbbreviation())) {
                return team;
            }
        }
        return null; // Handle unknown abbreviation
    }

}
