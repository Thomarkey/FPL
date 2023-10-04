package com.example.FPL.Model;

public enum Team {
    AA_GENT("GNT", "Gent"),
    CERCLE_BRUGGE("CER", "Cercle Brugge"),
    CLUB_BRUGGE("CLU", "Club Brugge"),
    KAS_EUPEN("EUP", "Eupen"),
    KRC_GENK("GNK", "Genk"),
    KV_KORTRIJK("KOR", "Kortrijk"),
    KV_MECHELEN("KVM", "Mechelen"),
    KVC_WESTERLO("WES", "Westerlo"),
    OH_LEUVEN("OHL", "Leuven"),
    ROYAL_ANTWERP_FC("ANT", "Antwerp"),
    ROYALE_UNION_SAINT_GILLOISE("USG", "Royale Union Saint-Gilloise"),
    RSC_ANDERLECHT("AND", "Anderlecht"),
    RWDM("RWD", "RWDM"),
    SPORTING_CHARLEROI("CHA", "Charleroi"),
    STANDARD_DE_LIEGE("STA", "Standard de Liège"),
    STVV("STV", "Sint-Truiden");

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
