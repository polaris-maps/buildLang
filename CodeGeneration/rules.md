# Rules

## Grammar
Floorplan ::= (BuildingDecl)* eot
BuildingDecl ::= building identifier { (FloorDecl)* }
FloorDecl ::= floor identifier { RoomDecl (, RoomDecl)* }
Room :: = identifier ( { (Side)* } )?
Side ::= ( RoomDoor (, RoomDoor)* )? ;
RoomDoor ::= ( DoorType )? Room
DoorType ::= |

## Visitor implementations

### visitFloorplan
For BuildingDecl, visitBuilding.

### visitBuilding
Insert building.
```
INSERT INTO Buildings (name) VALUES ( <identifier> );
```
For FloorDecl, visitFloor.

### visitFloor
For RoomDecl, visitRoom.
```
INSERT INTO Building_Sources_Nodes (node_id, building_id) VALUES (?, ?);
```

Other possible notes:
- Set ```target_z_rank``` to a number corresponding to the floor?

### visitRoom
Obtain node_id. 
- This will be source_node.
- Assign node to building.
If there are sides, for each side:
- Obtain all room node_id, DoorType
- Insert door nodes. Assign door nodes to buildings.
- Insert edges. Enumerate sides and enumerate order within sides. Use as source_side and source_rank.

#### If position is a table
- Insert position, change x rank as you increment i.

#### Node type

if stairs in <identifier>:
```
INSERT INTO Nodes (name, node_type) VALUES ( <identifier>, "stairs");
```
elif elevator in <identifier>:
```
INSERT INTO Nodes (name, node_type) VALUES ( <identifier>, "elevator");
```
elif hallway in <identifier>:
```
INSERT INTO Nodes (name, node_type) VALUES ( <identifier>, "hallway");
```
else:
```
INSERT INTO Nodes (name, node_type) VALUES ( <identifier>, "room");
```