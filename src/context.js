import React from "react";
let selectedStore = {
  project: [],
  date: []
};
const selectedItem = React.createContext({
  get dateData() {
    return selectedStore.date;
  },
  get projectData() {
    return selectedStore.project;
  },
  editor: (nextData, name) => {
    selectedStore[name] = nextData;
  },
  clear: name => {
    selectedStore[name] = [];
  }
});
export { selectedItem };
