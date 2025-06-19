https://gist.github.com/Sharaal/742b0537035720dba7bc85b6bc7854c5

---
layout: "post"
title: "Write a tagged template literal function for SQL"
---

After I searched for alternatives to [knex](https://knexjs.org/) and discover the new feature of the [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) and an example usage of them for sql queries in [slonik](https://www.npmjs.com/package/slonik), I wanted to understand the usability of them by writing an own tagged template literal function.

This came with a few unexpected stumbling blocks but at the end it resulted in the [sql-pg](https://www.npmjs.com/package/sql-pg) library only for this responsibility which also solves problems [slonik](https://www.npmjs.com/package/slonik) has and can be used together with [`pg`](https://www.npmjs.com/package/pg).

<!--more-->

## The first draft how tagged template literal functions work

At the beginning I thought "it's really easy, just replace the variables with numbered `$` and fill them into an array":
```javascript
function sql(textFragments, ...parameters) {
  let text = ''
  for (let i = 0; i < textFragments.length; ++i) {
    if (text !== '') {
      text += `$${i}`
    }
    text += textFragments[i]
  }
  return { text, parameters }
}
```

And this few lines works pretty well like expected:
```javascript
const id = 5
const name = 'new name'

client.query(sql`
  UPDATE users SET name = ${name} WHERE id = ${id}
`)

// text: 'UPDATE users SET name = $1 WHERE id = $2'
// parameters: [5, 'new name']
```

But after that I started to think about some requirements which are also needed...

## Tag helpers

Not all dynamic parts of a SQL query are variables. Especially table and column names, limits and offsets needs to be supported. And also more complex structures like lists of variables, pairs of column names and values and so on.

So we need a convention how to support that parts. So in the tag function I assume objects are complex parts which has already `text` and `parameters` to take over and tag helpers producing them:
```javascript
  // TODO
```

### Table and column names

[`pg`](https://www.npmjs.com/package/pg) doesn't have a function to escape table and column names. But fortunately it's not that complicated, we only need to care about `"`:
```javascript
sql.key = key => ({
  text: key.replace(/"/g, '""'),
  parameters: []
})

const table = 'users'

client.query(sql`
  SELECT * FROM ${sql.key(table)}
`)

// text: 'SELECT * FROM "users"'
// parameters: []
```

## Nested queries

...

## Summary
