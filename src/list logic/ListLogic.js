/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
let watchList = {};

let getList = (listName) => {
  // retrieves a list from localStorage by its name and turns it into an object
  return JSON.parse(localStorage.getItem(listName));
};

let setList = (listName, list) => {
  // sets/updates a list in localStorage
  localStorage.setItem(listName, JSON.stringify(list));
};

let addToList = (movie, listName) => {
  // adds a movie to a list
  let list = getList(listName);
  if (!list[movie]) {
    list[movie] = movie;
  }
  setList(listName, list);
};

let removeFromList = (movie, listName) => {
  let list = getList(listName);
  if (!list[movie]) {
    list[movie] = movie;
  }
  setList(listName, list);
};
