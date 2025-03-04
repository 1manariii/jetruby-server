

create TABLE repositories (
    id INTEGER PRIMARY KEY,
    name VARCHAR(256),
    owner VARCHAR(256),
    watch INTEGER,
    stars INTEGER
)