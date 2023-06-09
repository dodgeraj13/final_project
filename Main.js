const daysInMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthsInWords = [
  "BLANK",
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
const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

function findStartDay(date, day) {
  for (let i = date; i > 1; i--) {
    day--;

    if (day == -1) {
      day = 6;
    }
  }
  return day;
}

function arrayMe(rows) {
  let arr = new Array(rows);
  for (var i = 0; i < rows; i++) {
    arr[i] = new Array(7);
  }

  return arr;
}

const button22 = document.createElement("button");

button22.innerText = "clear";
button22.id = "clear";
button22.style.height = "1px";
button22.style.width = "1px";
document.body.appendChild(button22);

class Calender {
  constructor(monthIn, dateIn) {
    this.start = dateIn; // 0 - 6
    this.month = monthIn; // 1 - 12
    this.days = daysInMonths[this.month]; // goes up to 31
    this.rows = Math.ceil((this.days + this.start) / 7) * 2 + 2; // idk just leave it cuz it works
    this.cal = arrayMe(this.rows); // creates 2d array with proper amount of rows for given month
    this.counter = 0; // counter throughout initialization
    this.cal[0][0] = monthsInWords[this.month]; // month for the calender (ex: May)
    this.events = new Array(this.days); // array for events
    this.eventsLabels = new Array(this.days); // array for events labels (blue,red,green)
    this.arrayB; // array of buttons?

    for (let i = 0; i < this.eventsLabels.length; i++) {
      this.eventsLabels[i] = "white";
    }

    for (let i = 0; i < this.events.length; i++) {
      this.events[i] = "blank";
    }

    for (let i = 0; i <= 6; i++) {
      this.cal[1][i] = daysOfWeek[this.counter];
      this.counter++;
    }

    this.counter = 1;

    for (let i = this.start; i <= 6; i++) {
      this.cal[2][i] = this.counter;
      this.counter++;
    }

    for (let i = 0; i < this.start; i++) {
      this.cal[2][i] = "-";
    }

    for (let i = 4; i <= this.rows - 1; i += 2) {
      for (let j = 0; j <= 6; j++) {
        this.cal[i][j] = this.counter;
        this.counter++;

        if (this.counter > this.days + 1) {
          this.cal[i][j] = "-";
        }
      }
    }
  }

  setEverything(eventsIn, eventsLabelsIn) {
    for (let i = 0; i < this.events.length; i++) {
      try {
        this.events[i] = eventsIn[i];
      } catch (err) {
        this.events[i] = "blank";
      }

      try {
        this.eventsLabels[i] = eventsLabelsIn[i];
      } catch (err) {
        this.eventsLabels[i] = "white";
      }
    }

    this.deleteButtons();

    this.printEverything();
  }

  // for console/debugging purposes
  /*
  showCal() {
    let print = "\t\t\t" + this.cal[0][0] + "\n";

    for (let i = 0; i <= 6; i++) {
      print += this.cal[1][i] + "\t";
    }

    print += "\n";

    for (let i = 0; i <= 6; i++) {
      print += this.cal[2][i] + "\t";
    }

    print += "\n";

    for (let i = 3; i < this.rows - 1; i++) {
      for (let j = 0; j < 7; j++) {
        if (i % 2 == 0) {
          print += this.cal[i][j] + "\t";
        } else {
          if (this.cal[i][j] == null) {
            print += "\t";
          } else {
            print += this.cal[i][j];
          }
        }
      }

      print += "\n";
    }

    return print;
  }
  

  
  markCal() {
    const d = new Date();
    let today = d.getDate();

    for (let i = 3; i < this.rows; i += 2) {
      for (let j = 0; j < 7; j++) {
        let temp = this.cal[i - 1][j];
        let dash = "-";

        if (temp != null && temp != dash) {
          let temp2 = temp;

          if (temp2 < today) {
            this.cal[i][j] = "X\t";
          }
        }
      }
    }
  }
  */

  saveEvent(date, box, button, button2) {
    try {
      this.events[date - 1] = box.value;
    } catch (err) {
      console.log("broke");
    }
    document.body.removeChild(box);
    document.body.removeChild(button2);
    this.labelButtons(date, button);
  }

  removeEvent(date, button, button1, button2) {
    this.deleteButtons();

    this.events[date - 1] = "blank";
    this.eventsLabels[date - 1] = "white";
    document.body.removeChild(button1);
    document.body.removeChild(button2);
    button.style.backgroundColor = "white";

    this.deleteButtons();
    this.printEvents();

    const d = new Date();
    const today = d.getDate();

    if (date < today) {
      button.style.backgroundColor = "orange";
    } else if (date == today) {
      button.style.backgroundColor = "cyan";
    }
  }

  chooseLabel(date, color, button, redB, blueB, greenB) {
    this.eventsLabels[date - 1] = "white";
    this.eventsLabels[date - 1] = color;
    document.body.removeChild(redB);
    document.body.removeChild(blueB);
    document.body.removeChild(greenB);
    button.style.backgroundColor = color;
    this.printEvents();
  }

  printCal() {
    for (let i = 2; i < this.rows; i += 2) {
      for (let j = 0; j < 7; j++) {
        this.buttonCreator(this.cal[i][j]);
        document.body.appendChild(document.createTextNode("\u00A0\u00A0"));
      }
      document.write("<br>");
    }
  }

  printMonth() {
    document.body.innerHTML = monthsInWords[this.month];
    document.body.style.color = "black";
    document.write("<br>");
  }

  printDays() {
    for (let i = 0; i < 7; i++) {
      this.buttonCreator2(this.cal[1][i]);
      document.body.appendChild(document.createTextNode("\u00A0\u00A0"));
    }
    document.write("<br>");
  }

  // prints buttons for the dates on the calender
  buttonCreator(number) {
    const button = document.createElement("button");

    button.innerText = number;

    button.id = "mainButton";

    button.style.height = "50px";
    button.style.width = "50px";

    const d = new Date();
    const today = d.getDate();

    button.addEventListener("click", () => this.decider(number, button));

    let color = "white";
    try {
      color = this.eventsLabels[number - 1];
    } catch (err) {
      color = "white";
    }
    if (number == today) {
      button.style.backgroundColor = "cyan";
    } else if (number < today) {
      button.style.backgroundColor = "orange";
    }

    if (color != "white") {
      button.style.backgroundColor = this.eventsLabels[number - 1];
    }

    document.body.appendChild(button);
  }

  //lets user decide what to do when clicking on day with an event
  decider(number, button) {
    let event = "blank";

    try {
      event = this.events[number - 1];
      console.log(this.events[number - 1]);
    } catch (err) {
      event = "blank";
    }
    if (event != "blank") {
      const button2 = document.createElement("button");
      button2.innerText = "Event: " + tester.events[number - 1];
      button2.id = "mainButton";
      button2.style.height = "50px";
      button2.style.width = "150px";

      document.body.appendChild(button2);

      const button3 = document.createElement("button");
      button3.innerText = "clear event";
      button3.id = "mainButton";
      button3.style.height = "50px";
      button3.style.width = "100px";

      button2.addEventListener("click", () =>
        this.deleteThese(button2, button3)
      );

      button3.addEventListener("click", () =>
        tester.removeEvent(number, button, button2, button3)
      );
      document.body.appendChild(button3);
    } else {
      this.textBoxCreator(number, button);
    }
  }

  deleteThese(button1, button2) {
    document.body.removeChild(button1);
    document.body.removeChild(button2);
  }
  // creates label buttons for user to choose from when creating event
  labelButtons(date, button) {
    const redB = document.createElement("button");
    redB.innerText = "School";
    redB.id = "mainButton";
    redB.style.height = "50px";
    redB.style.width = "60px";
    redB.style.backgroundColor = "red";
    redB.addEventListener("click", () =>
      tester.chooseLabel(date, "red", button, redB, blueB, greenB)
    );
    document.body.appendChild(redB);

    const blueB = document.createElement("button");
    blueB.innerText = "Work";
    blueB.id = "mainButton";
    blueB.style.height = "50px";
    blueB.style.width = "60px";
    blueB.style.backgroundColor = "blue";
    blueB.addEventListener("click", () =>
      tester.chooseLabel(date, "blue", button, redB, blueB, greenB)
    );
    document.body.appendChild(blueB);

    const greenB = document.createElement("button");
    greenB.innerText = "Other";
    greenB.id = "mainButton";
    greenB.style.height = "50px";
    greenB.style.width = "60px";
    greenB.style.backgroundColor = "green";
    greenB.addEventListener("click", () =>
      tester.chooseLabel(date, "green", button, redB, blueB, greenB)
    );
    document.body.appendChild(greenB);
  }
  //creates unclickable buttons for days of the week (no need to click these)
  buttonCreator2(day) {
    const button = document.createElement("button");

    button.innerText = day;

    button.id = "mainButton";

    button.style.height = "30";
    button.style.width = "50px";

    button.style.backgroundColor = "green";

    document.body.appendChild(button);
  }

  //doesn't create buttons, but used for events on right side (unclickable)
  buttonCreator3(event, topIn, move, day) {
    const button = document.createElement("button2");

    button.innerText = event;
    button.id = "apples";

    if (move == 1) {
      button.style.left = "900px";
    } else if (move == 2) {
      button.style.left = "700px";
    }

    button.style.top = topIn * 50 + 80 + "px";

    button.style.background = this.eventsLabels[day];

    document.body.appendChild(button);
  }

  deleteButtons() {
    let buttons = document.getElementsByTagName("button2");

    try {
      for (let i = 0; i <= buttons.length; i++) {
        buttons[i].remove();
      }
    } catch (err) {}
  }

  buttonCreator3second(event, move) {
    const button = document.createElement("button2");

    button.innerText = event;
    button.id = "mainButton";

    button.style.left = move + "px";

    button.style.top = 20 + "px";

    button.style.background = "lavender";

    document.body.appendChild(button);
  }

  buttonCreator4() {
    const button = document.createElement("button");

    button.innerText = "Clear Events";

    button.id = "mainButton";

    button.style.height = "50px";
    button.style.width = "60px";

    button.addEventListener("click", () => this.clearEvents());

    document.body.appendChild(button);
  }

  //highlights date selected and creates textbook for user to type into, then sends info to events
  textBoxCreator(number, buttons) {
    buttons.style.backgroundColor = "yellow";

    let box = document.createElement("input");
    document.body.appendChild(box);

    const button = document.createElement("button");
    button.innerText = "Enter";
    button.id = "mainButton";
    button.style.height = "30px";
    button.style.width = "50px";
    button.style.backgroundColor = "grey";
    document.body.appendChild(button);

    button.addEventListener("click", () => {
      this.saveEvent(number, box, buttons, button);
    });
  }

  printEvents() {
    const a = new Date();
    let dayA = a.getDate();

    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;

    this.deleteButtons();

    let printMe = new Array(0);
    let printI = new Array(0);

    for (let i = 0; i < this.days; i++) {
      try {
        if (this.events[i] != "blank") {
          printMe.push(this.events[i]);
          printI.push(i);
        }
      } catch (err) {
        console.log("i hate this");
      }
    }

    this.buttonCreator3second("Current", 500);
    this.buttonCreator3second("Future", 700);
    this.buttonCreator3second("Past", 900);

    for (let i = 0; i < printMe.length; i++) {
      let move = 0;

      if (printI[i] < dayA - 1) {
        move = 1;
        this.buttonCreator3(
          printI[i] + 1 + ": " + printMe[i],
          counter1,
          move,
          printI[i]
        );
        counter1++;
      } else if (printI[i] > dayA - 1) {
        move = 2;
        this.buttonCreator3(
          printI[i] + 1 + ": " + printMe[i],
          counter2,
          move,
          printI[i]
        );
        counter2++;
      } else {
        this.buttonCreator3(
          printI[i] + 1 + ": " + printMe[i],
          counter3,
          move,
          printI[i]
        );
        counter3++;
      }
    }
  }

  printEverything() {
    this.printMonth();
    this.printDays();
    this.printCal();
    //this.buttonCreator4();
    this.printEvents();
  }
}

const a = new Date();
let month = a.getMonth() + 1;
let dayA = a.getDate();
let dayB = a.getDay();

let startDay = findStartDay(dayA, dayB);

const tester = new Calender(month, startDay); // (month[1-12],startDay[0=Sunday])

const testMe = JSON.parse(localStorage.getItem("tester"));
const testMe2 = JSON.parse(localStorage.getItem("tester2"));

try {
  for (let i = 0; i < testMe.length; i++) {
    if (testMe[i] == undefined || testMe[i] == null) {
      testMe[i] = "blank";
    }

    if (testMe2[i] == undefined || testMe2[i] == null) {
      testMe2[i] = "white";
    }
  }
} catch (err) {
  console.log("first time");
}

tester.setEverything(testMe, testMe2);

//tester.markCal();
//console.log(tester.showCal());

tester.printEverything();

window.onbeforeunload = function () {
  tester.deleteButtons();
  localStorage.setItem("tester", JSON.stringify(tester.events));
  localStorage.setItem("tester2", JSON.stringify(tester.eventsLabels));
};
