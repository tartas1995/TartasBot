CREATE TABLE IF NOT EXISTS command (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trigger varchar(255),
    response varchar(500),
    channel varchar(255),
    startWith INTEGER(1),
    endWith INTEGER(1)
)