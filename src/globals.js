const one = (selected, parent = document) => {
  return parent.querySelector(selected);
};

const few = (selected, parent = document) => {
  return parent.querySelectorAll(selected);
};

const clone = (parent, template) => {
  one(parent).appendChild(document.importNode(one(template).content, true));
};

const clear = (selected, parent = document) => {
  parent.querySelector(selected).textContent = "";
};
