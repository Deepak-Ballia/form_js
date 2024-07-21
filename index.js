var originalInput = document.getElementById("inpt-v");
var originalSelect = document.getElementById("select-v");
var originalTextarea = document.getElementById("textarea-v");
var container = document.getElementById("myForm");
var lastLabel = document.getElementById("last-label");

function duplicateElement(originalElement) {
  var clonedElement = originalElement.cloneNode(true);
  clonedElement.value = "";
  document.getElementById("myForm").appendChild(clonedElement);
}
document.getElementById("inpt1").onclick = function () {
  duplicateElement(originalInput);
};
document.getElementById("selct1").onclick = function () {
  duplicateElement(originalSelect);
};
document.getElementById("txtarea1").onclick = function () {
  duplicateElement(originalTextarea);
};

// to delete a field

function DeleteButton(buttonId, targetElement) {
  var deleteButton = document.getElementById(buttonId);
  deleteButton.onclick = function () {
    container.removeChild(targetElement);
  };
}
DeleteButton("del-i", originalInput);
DeleteButton("del-s", originalSelect);
DeleteButton("del-t", originalTextarea);
DeleteButton("del-sl", lastLabel);

// add and delete Options

function addOption() {
  var obj = document.querySelector("select");
  var newThing = prompt("Enter a name for the new thing:");
  var newValue = obj.options.length;

  var newOption = document.createElement("option");
  newOption.text = newThing;
  newOption.value = newValue;

  obj.appendChild(newOption);
  obj.value = newValue; // Select the newly added option
}

function removeOption() {
  var obj = document.querySelector("select");
  var v = obj.value;

  if (v !== "") {
    obj.remove(v);
  }
}

document.querySelector(".addOption").addEventListener("click", addOption);
document.querySelector(".rOption").addEventListener("click", removeOption);

// JavaScript code for smooth drag-and-drop functionality
const formContainer = document.getElementById("myForm");
let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.outerHTML);
  this.classList.add("dragging");
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  e.dataTransfer.dropEffect = "move"; // See the section on the DataTransfer object.
  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave() {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  if (dragSrcEl !== this) {
    // Swap elements
    const temp = this.innerHTML;
    this.innerHTML = dragSrcEl.innerHTML;
    dragSrcEl.innerHTML = temp;
  }

  return false;
}

function handleDragEnd() {
  const draggableElements = document.querySelectorAll(".draggable");
  draggableElements.forEach((elem) => {
    elem.classList.remove("over");
    elem.classList.remove("dragging");
  });
}

const draggableElements = document.querySelectorAll(".draggable");
draggableElements.forEach((elem) => {
  elem.addEventListener("dragstart", handleDragStart, false);
  elem.addEventListener("dragenter", handleDragEnter, false);
  elem.addEventListener("dragover", handleDragOver, false);
  elem.addEventListener("dragleave", handleDragLeave, false);
  elem.addEventListener("drop", handleDrop, false);
  elem.addEventListener("dragend", handleDragEnd, false);
});

// form Json Data
const jsonData = [
  {
    id: "1",
    type: "input",
    label: "Sample label",
    placholder: "Sample placeholder",
  },
  {
    id: "2",
    type: "input",
    label: "Sample label",
    options: ["Sample options", "Sample options", "Sample options"],
  },
  {
    id: "3",
    type: "input",
    label: "Sample label",
    placholder: "Sample placeholder",
  },
  {
    id: "4",
    type: "input",
    label: "Sample label",
    placholder: "Sample placeholder",
  },
];

function populateForm() {
  jsonData.forEach((field) => {
    formField = document.getElementById("i-3");
    formField.placeholder = field.placholder;

    formField1 = document.getElementById("i-1");
    formField1.placeholder = field.label;

    formField2 = document.getElementById("i-4");
    formField2.placeholder = field.placholder;

    field.options?.forEach(function (optionText) {
      const formField3 = document.getElementById("selct-option");
      console.log(field.options);
      const optionElement = document.createElement("option");
      optionElement.textContent = optionText;

      // Append the option to the select element
      formField3.appendChild(optionElement);
    });
  });
}
window.onload = populateForm;

// form submission

function saveFormData() {
  var formData = {};
  formData.fields = [];

  var form = document.getElementById("myForm");
  var formElements = form.elements;

  for (var i = 0; i < formElements.length; i++) {
    var element = formElements[i];
    if (
      element.tagName === "INPUT" ||
      element.tagName === "SELECT" ||
      element.tagName === "TEXTAREA"
    ) {
      var fieldData = {
        id: element.id,
        value: element.value,
      };
      formData.fields.push(fieldData);
      element.value = "";
    }
  }

  console.log("Form data:", formData);
  return false;
}
