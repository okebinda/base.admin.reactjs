import formatNum from 'format-num';
import formatCurrency from 'format-currency';
import moment from 'moment';

import Logger from './Logger';
import Config from '../Config';

// default formatting options
const options = {
  number: {fractionDigits: 0},
  currency: {format: '%s%v', symbol: '$'},
  percent: {style: 'percent', fractionDigits: 2},
  date: {format: Config.get('DEFAULT_DATE_FORMAT', 'mm/dd/yyyy')}
};

const _truncateNumbers = function(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "K" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "B" },
    { value: 1E12, symbol: "T" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const reISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{4}$/;

const Format = {

  // format number
  number: function(value, fractionDigits, truncate=false) {
    Logger.log('silly', `Format.number(${value}, ${fractionDigits})`);
    const opts = {
      maximumFractionDigits: Number.isInteger(fractionDigits)
        ? fractionDigits
        : options.number.fractionDigits,
      minimumFractionDigits: Number.isInteger(fractionDigits)
        ? fractionDigits
        : options.number.fractionDigits
    };
    return truncate ? _truncateNumbers(value, fractionDigits) : formatNum(value, opts);
  },

  // format currency
  currency: function(value, truncate=false) {
    Logger.log('silly', `Format.currency(${value})`);
    return truncate ? options.currency.symbol + _truncateNumbers(value, 1) : formatCurrency(value, options.currency);
  },

  // format percent
  percent: function(value, fractionDigits) {
    Logger.log('silly', `Format.percent(${value}, ${fractionDigits})`);
    const opts = {
      style: options.percent.style,
      maximumFractionDigits: Number.isInteger(fractionDigits)
        ? fractionDigits
        : options.percent.fractionDigits,
      minimumFractionDigits: Number.isInteger(fractionDigits)
        ? fractionDigits
        : options.percent.fractionDigits
    };
    return formatNum(value * 100, opts) + '%';
  },

  // formate date
  date: function(value, formatIn, utc=false) {
    Logger.log('silly', `Format.date(${value}, ${formatIn})`);
    if (value) {
      const format = formatIn ? formatIn : options.date.format;
      return typeof value === 'string' && reISO8601.test(value)
        ? moment(value, 'YYYY-MM-DDTHH:mm:ssZZ').format(format) // safari hack - doesn't support '-', only '/'
        : moment(value).format(format);
    }
    return null;
  }
}

export default Format;

Logger.log('silly', `Format loaded.`);
