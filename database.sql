

create TABLE repositories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256),
    owner VARCHAR(256),
    watch INTEGER,
    stars INTEGER
)