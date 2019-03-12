---
layout: post
title: Knex vs alternatives
---

Working in code with a relational database can be done in different abstraction forms from writing SQL queries over using a query builder to completely abstract the type of the database by using an ORM.
But it's not only querying a database, also migration scripts needs to be defined and managed.

So let's have a critical look at [knex.js](https://knexjs.org/), where is it worth to use, where not and what are the alternatives.
<!--more-->

## Migrations

Here `knex.js` really shines. The setup with the `knexfile.js` and the commands are easy and the migrations with the definition of the schema table and their changes are readable and works smoothly. So there is no reason not to use it.

An example `knexfile.js`:
```javascript
require('@7tv-packages/env')
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL
}
```

The commands used via `npx`:
* Create a new migration file: `npx knex migrate:make migration_name`
  Example migration (for more schema documentation see https://knexjs.org/#Schema):
  ```javascript
  module.exports.up = knex => knex.schema.createTable('users', table => {
    table.increments()

    table.string('email').notNullable()
    table.unique('email')

    table.string('passwordhash').notNullable()
  })

  module.exports.down = knex => knex.schema.dropTable('users')
  ```
* Migrate to the latest schema: `npx knex migrate:latest`

For more commands and their descriptions see: https://knexjs.org/#Migrations-CLI

## Query builder

That’s the part where the discussions and the cons of `knex.js` start. As base for discussions it’s good to have a look at this article https://medium.com/@gajus/stop-using-knex-js-and-earn-30-bf410349856c (thx for [gajus](https://github.com/gajus) for the article and his library [slonik](https://www.npmjs.com/package/slonik) which inspired me to spend time into this topic).

The cons which are well described:
* SQL is a well known language, the syntax of `knex.js` needs to be learned on top of that. That makes it hard to think / prototype in plain SQL and then switch to the `knex.js` query building syntax. Also it makes it hard to read later on
* `knex.js` is NOT an abstraction layer. It’s not easily possible to move from e.g. `sqlite` to `pg` because the API of `knex.js` is different (e.g. the definition of an insert statement if need the increment ID a `.returning('id')` is needed for `pg` and the result object structure is different because it's the native structure of the database driver)
* On top of that the heavy use of the fluent interface makes it really hard to write mocks for automatic tests

An example use case inserting a row and give the insert ID back:
```javascript
const url = 'url'
const id = (await knex('urls').insert({ url }).returning('id'))[0].id
```

And the unit test for it with the mocked knex object:
```javascript
const knex = sinon.fake.returns({
  insert: sinon.fake.returns({
    returning: sinon.fake.returns(Promise.resolve([{ id: '5' }]))
  }),
  select: sinon.fake()
})
const url = 'mocked url'

const id = (await knex('urls').insert({ url }).returning('id'))[0].id

assert(knex.calledOnce)
assert(knex.calledWith('urls'))

assert(knex().insert.calledOnce)
assert(knex().insert.calledWith({ url }))

assert(knex().insert().returning.calledOnce)
assert(knex().insert().returning.calledWith('id'))

assert(knex().select.notCalled)

assert(id === 5)
```

## Alternative: SQL queries with `pg`

In the code SQL is directly written:
```javascript
const url = 'url'
const id = (await client.query(
  `INSERT INTO urls (url) VALUES ($1) RETURNING ('id')`,
  [url]
)).rows[0].id
```

And the test for it:
```javascript
const client = {
  query: sinon.fake.returns(Promise.resolve([{ id: '5' }]))
}   

const url = 'url'
const id = (await client.query(
  `INSERT INTO urls (url) VALUES ($1) RETURNING ('id')`,
  [url]
)).rows[0].id

assert(client.query.calledOnce)
assert(client.query.calledWith([
  `INSERT INTO urls (url) VALUES ($1) RETURNING ('id')`,
  [url]
]))
assert.equal(id, '5')
```

## Recommendation

* `knex.js` for migration scripts
* `pg` for writing SQL and testing the `client.query` calls
* If there is advanced / heavy usage of SQL in a service needed, have a look at SQL tagged template literals (for an example see https://gist.github.com/Sharaal/742b0537035720dba7bc85b6bc7854c5 or [slonik](https://www.npmjs.com/package/slonik)
