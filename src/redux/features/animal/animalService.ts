const LOCALSTORAGE_KEY = "animals";

export const getList = () => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "[]");
};

export const saveList = <t>(data: t[]) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};
