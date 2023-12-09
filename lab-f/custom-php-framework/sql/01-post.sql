drop table if exists post;

create table if not exists post
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    name text not null,
    surname text not null,
    description text not null
);
