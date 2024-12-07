import { Scanner } from "./Scanner";
import { Token } from "./Token";
import { ErrorReporter } from "../ErrorReporter";
import { AST } from "../AbstractSyntaxTrees/AST";
import { Floorplan } from "../AbstractSyntaxTrees/Floorplan";
import { SourcePosition } from "./SourcePosition";
import { BuildingDeclList } from "../AbstractSyntaxTrees/BuildingDeclList";
import { TokenType } from "./TokenType";
import { FloorDeclList } from "../AbstractSyntaxTrees/FloorDeclList";
import { FloorDecl } from "../AbstractSyntaxTrees/FloorDecl";
import { BuildingDecl } from "../AbstractSyntaxTrees/BuildingDecl";
import { RoomList } from "../AbstractSyntaxTrees/RoomList";
import { Room } from "../AbstractSyntaxTrees/Room";
import { SideList } from "../AbstractSyntaxTrees/SideList";
import { Side } from "../AbstractSyntaxTrees/Side";
import { RoomDoorList } from "../AbstractSyntaxTrees/RoomDoorList";
import { RoomDoor } from "../AbstractSyntaxTrees/RoomDoor";
import { DoorType } from "../AbstractSyntaxTrees/DoorType";

export class SyntaxError extends Error {
    private serialVersionID: number = 0;  // change
}

export class Parser {
    private _scanner: Scanner;
    private _errors: ErrorReporter;
    private _currentToken: Token;
    private trace: boolean = true;

    constructor(scanner: Scanner, errors: ErrorReporter) {
        this._scanner = scanner;
        this._errors = errors;
        this._currentToken = this._scanner.scan();
    }

    public parse(): AST | null {
        try {
            // The first thing we need to parse is the Floorplan symbol
            return this.parseFloorplan();
        } catch ( e: any ) {
            console.log("error")
            console.log(e);
            return null;
        }
    }

    // Floorplan ::= (BuildingDecl)* eot
    private parseFloorplan(): Floorplan {
        const resultSourcePos: SourcePosition = this._currentToken.getTokenPosition();
        const resultBuildingDeclList: BuildingDeclList = new BuildingDeclList();

        // Keep parsing building declarations until eot
        while (this._currentToken.getTokenType() != TokenType.EOT) {
            resultBuildingDeclList.add(this.parseBuildingDecl());
        }
        
        this.accept(TokenType.EOT);

        const resultFloorplan: Floorplan = new Floorplan(resultBuildingDeclList, resultSourcePos);
        return resultFloorplan;
    }

    // BuildingDecl ::= building identifier { (FloorDecl)* }
    private parseBuildingDecl(): BuildingDecl {
        // Take in a "building" token (check by TokenType) and set source position
        const resultSourcePos: SourcePosition = this.accept(TokenType.BUILDING_TYPE).getTokenPosition();

        // Take in an identifier token
        const resultIdentifierToken: Token = this.accept(TokenType.IDENTIFIER);
        const resultBuildingName: string = resultIdentifierToken.getTokenText();

        // Take in a {
        this.accept(TokenType.LBRACE);

        // List setup
        var resultFloorDeclList: FloorDeclList = new FloorDeclList();

        // Keep parsing a FloorDecl until }
        while (this._currentToken.getTokenType() != TokenType.RBRACE) {
            const currentFloorDecl: FloorDecl = this.parseFloorDecl();

            // Add to resultFloorDeclList
            resultFloorDeclList.add(currentFloorDecl);
        }

        // Take in a }
        this.accept(TokenType.RBRACE);

        // Return result
        const resultBuildingDecl: BuildingDecl = new BuildingDecl(resultBuildingName, null, resultFloorDeclList, resultSourcePos);
        return resultBuildingDecl;
    }

    // FloorDecl ::= floor identifier { RoomDecl (, RoomDecl)* }
    private parseFloorDecl(): FloorDecl {
        // Take in a "floor" token (check by TokenType) and set source position
        const resultSourcePos: SourcePosition = this.accept(TokenType.FLOOR_TYPE).getTokenPosition();

        // Take in an identifier token
        const resultIdentifierToken: Token = this.accept(TokenType.IDENTIFIER);
        const resultFloorName: string = resultIdentifierToken.getTokenText();

        // Take in a {
        this.accept(TokenType.LBRACE);

        // List setup
        var resultRoomList: RoomList = new RoomList();

        // Take in a room
        var currentRoom: Room = this.parseRoom();
        resultRoomList.add(currentRoom);

        while (this._currentToken.getTokenType() == TokenType.COMMA) {
            // Take in a ,
            this.accept(TokenType.COMMA);

            // Parse a Room
            currentRoom = this.parseRoom();
            resultRoomList.add(currentRoom);
        }

        // Take in a }
        this.accept(TokenType.RBRACE);

        const resultFloorDecl: FloorDecl = new FloorDecl(resultFloorName, null, resultRoomList, resultSourcePos);
        return resultFloorDecl;
    }

    // Room :: = identifier ( { (Side)* } )?
    private parseRoom(): Room {
        // Take in an identifier token
        const resultIdentifierToken: Token = this.accept(TokenType.IDENTIFIER);
        const resultRoomName: string = resultIdentifierToken.getTokenText();
        const resultSourcePos: SourcePosition = resultIdentifierToken.getTokenPosition();

        if (this._currentToken.getTokenType() == TokenType.LBRACE) {
            // Take in a {
            this.accept(TokenType.LBRACE);

            const resultSideList: SideList = new SideList();

            // Keep parsing a Side until }
            while (this._currentToken.getTokenType() != TokenType.RBRACE) {
                    const currentSide: Side = this.parseSide();

                // Add to resultFloorDeclList
                resultSideList.add(currentSide);
            }

            // Take in a }
            this.accept(TokenType.RBRACE);

            return new Room(resultRoomName, null, resultSideList, resultSourcePos);
        } else {
            return new Room(resultRoomName, null, null, resultSourcePos);
        }
    }

    // Side ::= ( RoomDoor (, RoomDoor)* )? ;
    private parseSide(): Side {
        // List setup
        var resultRoomDoorList: RoomDoorList = new RoomDoorList();

        if (this._currentToken.getTokenType() == TokenType.SEMICOLON) {
            const resultSourcePos: SourcePosition = this._currentToken.getTokenPosition();
            this.accept(TokenType.SEMICOLON);
            
            // Return result
            const resultSide: Side = new Side(null, resultSourcePos);
            return resultSide;
        } else {
            // Take in a RoomDoor, if it exists
            var currentRoomDoor: RoomDoor = this.parseRoomDoor();  // TODO: check other vars/const
            const resultSourcePos: SourcePosition = currentRoomDoor.posn;
            resultRoomDoorList.add(currentRoomDoor);

            while (this._currentToken.getTokenType() == TokenType.COMMA) {
                // Take in a ,
                this.accept(TokenType.COMMA);

                // Parse a RoomDoor
                currentRoomDoor = this.parseRoomDoor();
                resultRoomDoorList.add(currentRoomDoor);
            }

            // Take in a ;
            this.accept(TokenType.SEMICOLON);

            // Return result
            const resultSide: Side = new Side(resultRoomDoorList, resultSourcePos);
            return resultSide;
        }
    }

    // RoomDoor ::= ( DoorType )? Room
    private parseRoomDoor(): RoomDoor {  // TODO: refactor
        if (this._currentToken.getTokenType() == TokenType.HALLWAY) {
            const currentDoorType: DoorType = this.parseDoorType();
            const currentRoom: Room = this.parseRoom();
            const resultSourcePos: SourcePosition = currentDoorType.posn;

            const resultRoomDoor = new RoomDoor(currentRoom, currentDoorType, resultSourcePos);
            return resultRoomDoor;
        } else {
            const currentRoom: Room = this.parseRoom();
            const resultSourcePos: SourcePosition = currentRoom.posn;

            const resultRoomDoor = new RoomDoor(currentRoom, null, resultSourcePos);
            return resultRoomDoor;
        }
    }

    private parseDoorType(): DoorType {
        const resultIdentifierToken: Token = this.accept(TokenType.HALLWAY);
        const resultSourcePos: SourcePosition = resultIdentifierToken.getTokenPosition();

        const resultDoorType = new DoorType(resultSourcePos);
        return resultDoorType;
    }

    private accept(expectedType: TokenType): Token {
        if (this._currentToken.getTokenType() == expectedType) {
            if (this.trace) {
                this.pTrace();
                // console.log(this._currentToken);
            }
            const acceptedToken: Token = this._currentToken;  // TODO: check assign (copy or reference)
            this._currentToken = this._scanner.scan();
            return acceptedToken;
        } else {
            this._errors.reportError("Parse error: Expected " + expectedType.toString() +   // check toString
            ", but got " + this._currentToken.getTokenType().toString())
            throw new SyntaxError;
        }
    }

    private pTrace(): any {
        // check how to get stack trace
        return null;
    }
}