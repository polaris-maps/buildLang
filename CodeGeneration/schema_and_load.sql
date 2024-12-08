DROP TABLE IF EXISTS Buildings;
DROP TABLE IF EXISTS Nodes;
DROP TABLE IF EXISTS Position;
DROP TABLE IF EXISTS Edges;
DROP TABLE IF EXISTS Building_Sources_Nodes;


CREATE TABLE Buildings
    (building_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL);
CREATE TABLE Nodes
    (node_id INTEGER PRIMARY KEY AUTOINCREMENT,
    record_number TEXT,
    name TEXT,
    node_type TEXT);
CREATE TABLE Edges
    (edge_id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_node INTEGER REFERENCES Nodes(node_id) NOT NULL,
    target_node INTEGER REFERENCES Nodes(node_id) NOT NULL,
    source_side INTEGER,
    source_rank FLOAT);
CREATE TABLE Building_Sources_Nodes
    (node_id INTEGER REFERENCES Nodes(node_id) NOT NULL,
    building_id INTEGER REFERENCES Buildings(building_id) NOT NULL,
    UNIQUE (node_id, building_id));


INSERT INTO Buildings (name) VALUES ("Sitterson");
INSERT INTO Buildings (name) VALUES ("Fred Brooks");

INSERT INTO Building_Sources_Nodes (node_id, building_id) VALUES (?, ?);
INSERT INTO Nodes (name, node_type) VALUES (?, "hallway");
INSERT INTO Nodes (node_type) VALUES ("stairs");
INSERT INTO Nodes (node_type) VALUES ("elevator");
SELECT DISTINCT node_id FROM Nodes WHERE node_type = "room" AND name = ?;
INSERT INTO Nodes (name, node_type) VALUES (?, "room");
INSERT INTO Nodes (name, node_type) VALUES (?, "door");
INSERT INTO Edges (source_node, target_node) VALUES (?, ?);