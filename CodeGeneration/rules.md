# Rules (Draft, not necessarily implemented)

## Grammar
Floorplan ::= (BuildingDecl)* eot
BuildingDecl ::= building identifier { (FloorDecl)* }
FloorDecl ::= floor identifier { RoomDecl (, RoomDecl)* }
Room :: = identifier ( { (Side)* } )?
Side ::= ( RoomDoor (, RoomDoor)* )? ;
RoomDoor ::= ( DoorType )? Room
DoorType ::= |

## Visitor implementations

arg = {node_id, parent_node}

### visitFloorplan
For BuildingDecl, visitBuilding.

### visitBuilding
Insert building.
Pass building id.
```
INSERT INTO Buildings (name) VALUES ( <identifier> );
```
For FloorDecl, visitFloor.

### visitFloor
For RoomDecl, visitRoom.
Pass building id.
```
INSERT INTO Building_Sources_Nodes (node_id, building_id) VALUES (?, ?);
```

Other possible notes:
- Set ```target_z_rank``` to a number corresponding to the floor?

### visitRoom -> node_id
Obtain node_id. 
- This will be source_node.
- Assign node to building.
- Pass source_node to visitSide.

```
INSERT INTO Nodes (name, node_type) VALUES (<identifier>, "room");
INSERT INTO Building_Sources_Nodes (node_id, building_id) VALUES (?, ?);
```
#### If position is a table
- Insert position, change x rank as you increment i.

#### Node type (later)

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

### visitSide
For each side:
- Obtain all room node_id, hallway
- Insert door nodes (if not hallway). Assign door nodes to buildings. Insert edges from source_node to door and door to room node_id. 
```
INSERT INTO Nodes (name, node_type) VALUES (<node_id>, "door");
INSERT INTO Building_Sources_Nodes (node_id, building_id) VALUES (door_node_id, ?);

```
- If hallway, insert edge form source_node to target_node.
- Enumerate sides and enumerate order within sides. Use as source_side and source_rank.

### visitRoomDoor -> {node_id, hallway?}
- visitRoom
- visitDoorType