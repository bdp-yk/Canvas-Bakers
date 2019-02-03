import {
  isBefore,
  isAfter,
  formatRelative
} from "date-fns";
// import * as actionCreators from "../redux/_actions";

import {
  bindActionCreators
} from 'redux';
import {
  lmc_schema,
  bmc_schema,
  lmc_design,
  bmc_design
} from '../featured';


//Redux Util for connect function
export const mapStateToProps = state => {
  const {
    ...rest
  } = state;
  return rest;
}

export const mapDispatchToProps = (actionCreators) => (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}
export const multipleActionsMapDispatchToProps = (actionCreators) => (dispatch) => {
  let all_actions = {}
  actionCreators.forEach(element => {
    all_actions = {
      ...all_actions,
      ...element
    }
  });
  return bindActionCreators(all_actions, dispatch);
}

//Featured function
export const range = n =>
  Array(n)
  .fill()
  .map((_, i) => i);

export const sample = arr => arr[Math.floor(Math.random() * arr.length)];

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const clamp = (val, min = 0, max = 1) =>
  Math.max(min, Math.min(max, val));

export const debounce = (callback, wait, timeoutId = null) => (...args) => {
  window.clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    callback.apply(null, args);
  }, wait);
};

// TODO: Modernize!
/* eslint-disable */
export function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;

  return function () {
    var context = scope || this;

    var now = +new Date(),
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
/* eslint-enable */

export const stripHTMLFromString = string => {
  // Rather than try and use a regex, we'll just rely on the browser's engine.
  // NOTE: This is probably not safe to use on untrusted
  const placeholderDiv = document.createElement('div');
  placeholderDiv.innerHTML = string;

  return placeholderDiv.textContent || placeholderDiv.innerText || '';
};
export const pure_alphanum_str = (x) => {
  return x.toLocaleLowerCase().match(/[a-z0-9]/ig).join('')
}
export const truncateByLetterCount = (string, l_count) => {
  if (!string) return string
  let l = 0,
    st = string.split(/[^a-z0-9]/ig),
    i = st.findIndex(e => (l += e.length) >= l_count);

  return st.splice(0, i).join(' ') + "..."
}
export const truncateStringByWordCount = (string, maxWords) => {
  if (!string) return string
  const wordArray = string.split(/\s/g);

  // Maybe no truncation is necessary, if the string is below the limit?
  if (wordArray.length <= maxWords) {
    return string;
  }

  const truncatedString = wordArray.slice(0, maxWords).join(' ');

  // Attach an ellipsis at the end, since it needed truncation
  return `${truncatedString}`;
};

export const isEmpty = obj => Object.keys(obj).length === 0;

export const convertArrayToMap = list =>
  list.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item,
    }), {}
  );

// Either removes or adds an item to an array
// EXAMPLE: toggleInArray([1, 2], 3) -> [1, 2, 3]
// EXAMPLE: toggleInArray([1, 2], 2) -> [1]
export const toggleInArray = (arr, item) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

// Combines 2 arrays, removing duplicates.
// EXAMPLE: mergeUnique([1, 2], [2, 3]) -> [1, 2, 3]
export const mergeUnique = (arr1, arr2) =>
  arr1.concat(arr2.filter(item => arr1.indexOf(item) === -1));

export const prettyDate = (dateN) => {
  return formatRelative(new Date(dateN), new Date());
}

export const isBetween = ({
    date,
    startDate,
    endDate
  }) =>
  isAfter(date, startDate) && isBefore(date, endDate);

export const findRight = (arr, predicate) =>
  arr
  .slice()
  .reverse()
  .find(predicate);

export function requestAnimationFramePromise() {
  return new Promise(resolve => window.requestAnimationFrame(resolve));
}

export function setTimeoutPromise(duration) {
  return new Promise(resolve => window.setTimeout(resolve, duration));
}

export const deleteCookie = key => {
  document.cookie = `${encodeURIComponent(
    key
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};


export const get_init_schema = schema => {
  switch (schema) {
    case "lmc":
      return lmc_schema;

    default:
      return bmc_schema;
  }
}

export const get_init_design = schema => {
  switch (schema) {
    case "lmc":
      return lmc_design;

    default:
      return bmc_design;
  }
}

export const who_am_i = () => {
  return JSON.parse(localStorage.getItem('tester', null) ||
    localStorage.getItem('user', null) ||
    localStorage.getItem('admin', null))
}
export const createOption = (label) => ({
  label,
  value: label.toUpperCase().replace(/\W/g, ''),
});