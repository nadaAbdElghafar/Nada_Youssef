var budgetController = (function () {
  //these ar function constructors to make alot of objects
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var calculateTotalls = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totalls[type] = sum;
  };
  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totalls: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };
  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      //create new id for each item
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      //create new item based on exp or inc
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      //push the new item into data
      data.allItems[type].push(newItem);
      //return the new item
      return newItem;
    },
    deleteItem: function (type, id) {
      var ids, index;
      //map function will bring a new array which contains all item to know the index of the item
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    calculateBudget: function () {
      //calculate the incomes and expenses
      calculateTotalls("exp");
      calculateTotalls("inc");
      //calculate the budget :income - expenses
      data.budget = data.totalls.inc - data.totalls.exp;
      //calculate the percentage of the income we spent
      if (data.totalls.inc > 0) {
        data.percentage = Math.round(
          (data.totalls.exp / data.totalls.inc) * 100
        );
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totallInc: data.totalls.inc,
        totallexp: data.totalls.exp,
        percentage: data.percentage,
      };
    },
    calculatPercentage: function () {
      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totalls.inc);
      });
    },
    getPercentage: function () {
      var allPerc = data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },
    test: function () {
      return data.allItems;
    },
  };
})();

//*********************************the date******************************************//
//**********************************************************************************//
var date = new Date();
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
document.querySelector(".budget__title--month").innerHTML =
  months[date.getMonth()] + " " + date.getFullYear();

//*********************************the UI controller********************************//
//**********************************************************************************//
var UIController = (function () {
  var domString = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentLabel: ".budget__expenses--percentage",
    container: ".container",
    expPercentLabel: ".item__percentage",
  };
  var formatNumber = function (num, type) {
    var numSplit, int, dec, type;
    //+ - before the num
    //decimel numbers
    //comma
    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split(".");
    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }
    dec = numSplit[1];
    return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
  };
  
  var nodeListForEach = function (list, callback) {
    for (i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(domString.inputType).value,
        description: document.querySelector(domString.inputDescription).value,
        value: parseFloat(document.querySelector(domString.inputValue).value), //return a number
      };
    },
    addListItem: function (obj, type) {
      var html, newHtml, element, percent;
      //percent = (obj.value / budgetController.test().exp)*100;
      if (type === "inc") {
        element = domString.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">' +
          '%description%</div><div class="right clearfix"><div class="item__value">' +
          '%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = domString.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">' +
          '%description%</div><div class="right clearfix"><div class="item__value"> ' +
          '%value%</div><div class="item__percentage"></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
      //newHtml = newHtml.replace("%percentage%", percent.toFixed(1));
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    deleteListItem: function (selectID) {
      var el = document.getElementById(selectID);
      el.parentNode.removeChild(el);
    },
    clearFields: function () {
      var fields, fieldsArray;
      fields = document.querySelectorAll(
        domString.inputDescription + ", " + domString.inputValue
      );
      fieldsArray = Array.prototype.slice.call(fields); //turn the list to an array
      fieldsArray.forEach(function (current, index, array) {
        current.value = "";
      });
      fieldsArray[0].focus(); //make the focus still on the description input
    },
    displayBudget: function (obj) {
      var type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");
      document.querySelector(domString.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(domString.incomeLabel).textContent = formatNumber(
        obj.totallInc,
        "inc"
      );
      document.querySelector(domString.expenseLabel).textContent = formatNumber(
        obj.totallexp,
        "exp"
      );
      if (obj.percentage > 0) {
        document.querySelector(domString.percentLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(domString.percentLabel).textContent = "--";
      }
    },
    displayPercentage: function (perc) {
      var fields = document.querySelectorAll(domString.expPercentLabel);
      nodeListForEach(fields, function (current, index) {
        if (perc[index] > 0) {
          current.textContent = perc[index] + "%";
        } else {
          current.textContent = "--";
        }
      });
    },
    changeType: function () {
      var fields = document.querySelectorAll(
        domString.inputType +
          "," +
          domString.inputDescription +
          "," +
          domString.inputValue
      );
      nodeListForEach(fields,function(cur){
        cur.classList.toggle('red-focus');
      });
      document.querySelector(domString.addBtn).classList.toggle('red');
    },
    getDomStrings: function () {
      return domString; //to be able to use it in the controller module
    },
  };
})();

//*********************************the global app controller*************************//
//**********************************************************************************//
var controller = (function (budgetCtrl, UICtrl) {
  var dom = UICtrl.getDomStrings(); //to be able to use it in the controller module
  //add the event handler
  var setupEventListener = function () {
    document.querySelector(dom.addBtn).addEventListener("click", ctrlAddItem);
    //we want to press the "enter" key either
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    //add the event handler of deleting procss
    document
      .querySelector(dom.container)
      .addEventListener("click", ctrlDeleteItem);
  };
  document
    .querySelector(dom.inputType)
    .addEventListener("change", UICtrl.changeType);
  var updateBudget = function () {
    //4.calculate the budget
    budgetController.calculateBudget();
    //5.Return the budget
    var budget = budgetController.getBudget();
    //6.display the budget at thr UI
    UIController.displayBudget(budget);
  };

  var updatePercentage = function () {
    //calculate the percentage
    budgetController.calculatPercentage();
    //read the percentage from budget controller
    var percentage = budgetController.getPercentage();
    //update the ui
    UICtrl.displayPercentage(percentage);
  };

  var ctrlAddItem = function () {
    var input, newItem;
    //1.get the field input data
    input = UICtrl.getInput();
    //the conditions of add item
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2.add the item to the budget controller
      newItem = budgetController.addItem(
        input.type,
        input.description,
        input.value
      );
      //3.add the item to UI
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields(); //clear the fields
      //4.calculate and update the budget
      updateBudget();
      updatePercentage();
    }
  };

  var ctrlDeleteItem = function (event) {
    var itemID, splitID, type, ID;
    //event.target that is what we click into the parent element(container)
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      splitID = itemID.split("-"); //it will return an array ['inc','0']
      type = splitID[0];
      ID = parseInt(splitID[1]);
      //delete the item from the data structure
      budgetController.deleteItem(type, ID);
      //delete the item from the UI
      UICtrl.deleteListItem(itemID);
      //update and show the new budget
      updateBudget();
      updatePercentage();
    }
  };

  return {
    init: function () {
      console.log("start");
      UIController.displayBudget({
        budget: 0,
        totallInc: 0,
        totallexp: 0,
        percentage: -1,
      });
      setupEventListener();
    },
  };
})(budgetController, UIController);
controller.init();
