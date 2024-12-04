export enum TokenType {
    BUILDING_TYPE,
    FLOOR_TYPE,
    LBRACE,
    RBRACE,
    LPAREN,
    RPAREN,
    COMMA,
    PERIOD,
    SEMICOLON,
    HALLWAY,
    ASSIGN,
    OPEN,
    // RANGE,
    INT_LITERAL,
    BOOLEAN_LITERAL,
    // TIME_HH_MM_LITERAL,
    IDENTIFIER,
    EOT,
    ERROR
}

//     BUILDING_TYPE = "building"
//     FLOOR_TYPE = "floor"
//     LBRACE = "{"
//     RBRACE = "}"
//     LPAREN = "("
//     RPAREN = ")"
//     COMMA = ","
//     PERIOD = "."
//     SEMICOLON = ";"
//     HALLWAY = "|"  # write something else
//     ASSIGN = "="
//     OPEN = "open"
//     RANGE = "-"
//     INT_LITERAL = 0
//     BOOLEAN_LITERAL = 1
//     TIME_HH_MM_LITERAL = 2
//     EOT = 3
//     ERROR = 4