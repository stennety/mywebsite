---
layout: "post"
title: "Common Database Design Standards"
---

There are some common database design standards which are often seen:
* `id` column as serial id automatically increments for every new record
* `created_at` and `updated_at` timestamp columns with the timestamps of the creation and last update

Some of them are easy to solve, but others are not trivial. So I will have a look at all and provide go to solutions with [knex.js migrations](https://knexjs.org/#Migrations) and PostgreSQL.

<!--more-->

## `id` column

This column is used as primary key and so also as foreign key in related tables. It will be automatically incremented for every new record.

Why is this column useful?

Let's have an example, a `users` table contains users and their authentications. Often if a user registers, the email address is required and must be unique. So the obviously idea is to use these column as primary key. But this results in a lot of issues later on:
* email is an information which can change in the future. Then it would be needed not only to update the `users` table, also all relation tables
* email is a sensible information, it can be problematic to have these in all user related tables as foreign key. Especially if a user want to be deleted and you want to anonymise and archive the account

So it makes sense to have a dedicated `id` column as primary key and the email as string column with a unique index.

Example:
```javascript
const tableName = 'users'
module.exports = {
  up: knex => knex.schema.createTable(tableName, (table) => {
    table.increments()

    table.string('email')
    table.unique('email')
  }),
  down: knex => knex.schema.dropTable(tableName)
}
```

The `id` column should never be set in an insert and be preferred for selecting/updating/deleting specific rows.

## `created_at` and `updated_at` timestamp columns

This columns contains the timestamps when the record was created and when it was the last update. Both should be filled with the current timestamp on insert and the `created_at` column should also be filled during updating a record.

Why are this columns useful?
* It helps on tracking changes in general

It seems to be easily usable with `knex` by `table.timestamps()`. But in PostgreSQL there is no built in function to update automatically the `updated_at` column with the current timestamp on every update. So both columns will be filled in for new rows, but nothing happens on updating rows. This needs to be done by a trigger.

1. Migration to add a function updating the `updated_at` column:
```javascript
module.exports = {
  up: knex => knex.raw(`
    CREATE OR REPLACE FUNCTION on_updated_at()
    RETURNS trigger AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
    $$ language 'plpgsql';
  `),
  down: knex => knex.raw(`DROP FUNCTION on_updated_at`)
}
```
2. Add a helper to the `knexfile.js` creating the trigger for a table:
```javascript
module.exports = {
  onUpdateTrigger: (knex, table) => () => knex.raw(`
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_updated_at();
  `)
}
```
3. Use the helper for every table creation:
```javascript
const tableName = 'users'
module.exports = {
  up: knex => knex.schema.createTable(tableName, (table) => {
    table.increments()

    table.string('email')
    table.unique('email')
  }).then(onUpdateTrigger(knex, tableName)),
  down: knex => knex.schema.dropTable(tableName)
}
```

Now the `updated_at` column will be set to the current timestamp every time the row gets updated.
