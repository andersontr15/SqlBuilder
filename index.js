/* Authored by Theodore Anderson 15 July 2018 */

class SqlBuilder {
  constructor() {
    this.fetchRecords = (table1, table2, key, options) => {
      const rows = {};
      for (let i = 0; i < table1.length; i++) {
        const correspondingRecord = table2.find(v => v[key] === table1[i][key]);
        if (correspondingRecord && options.type === "inner") {
          rows[table1[i][key]] = [table1[i], correspondingRecord];
        } else if (options.type === "left" || options.type === "right") {
          if (correspondingRecord) {
            rows[table1[i][key]] = [table1[i], correspondingRecord];
          } else {
            rows[table1[i][key]] = [table1[i], { correspondingRecord: null }];
          }
        } else if (options.type === "full-outer") {
          rows[table1[i][key]] = [table1[i], correspondingRecord];
        }
      }
      return rows;
    };
    this.join = (table1, table2, key, options = { type: "inner" }) => {
      return this.fetchRecords(table1, table2, key, options);
    };
  }

  fullOuterJoin(table1, table2, key) {
    return this.join(table1, table2, key, { type: "full-outer" });
  }

  leftJoin(table1, table2, key) {
    return this.join(table1, table2, key, { type: "left" });
  }

  innerJoin(table1, table2, key, options = { type: "inner" }) {
    return this.join(table1, table2, key, options);
  }

  rightJoin(table1, table2, key) {
    return this.join(table2, table1, key, { type: "right" });
  }
}

const orders = [
  {
    order_id: 50,
    customer_id: 99,
    price: 40,
    created_at: Date.now()
  },
  {
    customer_id: 50,
    price: 60,
    created_at: null
  }
];

const customers = [
  {
    customer_id: 99,
    name: "First customer"
  },
  {
    customer_id: 102,
    name: "Third customer",
    order_id: 50
  }
];

const sqlBuilder = new SqlBuilder();
const records = sqlBuilder.leftJoin(orders, customers, "customer_id");
console.log(records);
