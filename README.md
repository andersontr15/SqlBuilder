# SqlBuilderJavaScript
Simple SqlBuilder written in JavaScript to practice JOINS 

Supports INNER JOIN, LEFT JOIN, RIGHT JOIN and FULL OUTER JOIN

## Example

```js
 const sqlBuilder = new SqlBuilder();
 const recordsReturned = sqlBuilder.innerJoin(table1: [], table2: [], keyToJoinOn, options = { type: 'inner' })
```
