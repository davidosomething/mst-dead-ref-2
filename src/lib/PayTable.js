import BigNumber from 'bignumber.js';
import { keys, map, reduce, values, zipObject, zipWith } from 'lodash';

/**
 * @param {object} params
 * @param {BigNumber} params.one amount of one deduction/contribution
 * @param {BigNumber} params.max max deduction/contribution for the year
 * @return {BigNumber[]} payPeriod-1: amount deducted/contributed
 */
export const getCappedTable = ({ periods, one, max }) => {
  let total = new BigNumber(0);
  return map(periods, (period) => {
    if (total.gte(max)) {
      return new BigNumber(0);
    }

    const nextTotal = total.plus(one);
    const nextAmount = nextTotal.gt(max) ? max.minus(total) : one;
    total = total.plus(nextAmount);
    return nextAmount;
  });
};

/**
 * @param {Object} tables tableName: table
 * @return {Object[]} merged tables w/total sum values of each row
 */
export const getGrossTable = (tablesToSum) => {
  const resultKeys = keys(tablesToSum);
  const resultTables = values(tablesToSum);
  return zipWith(...resultTables, (...tables) => {
    const total = reduce(tables, (periodTotal, value) =>
      value.plus(periodTotal)
    );
    return zipObject([...resultKeys, 'total'], [...tables, total]);
  });
};

/**
 * @param {Object[]} grossTable
 * @return {BigNumber} Sum of the 'total' cell of each row
 */
export const sumGrossTable = (grossTable) =>
  reduce(grossTable, (sum, row) => row.total.plus(sum), new BigNumber(0));

/**
 * @param {BigNumber[]} grossTable
 * @return {BigNumber} Sum array of BigNumber
 */
export const sumTable = (grossTable) =>
  reduce(grossTable, (sum, cell) => sum.plus(cell), new BigNumber(0));
