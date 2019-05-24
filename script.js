var YEARS = [" год", " года", " лет"];
var MONTH = [" месяц", " месяца", " месяцев"];
var START_DATE = "Sep 1 2017";
var START_DATE_IN_RETARCORP = "Sep 1 2017";
var END_DATE_IN_RETARCORP = "";

var BWS_SKILLS = [
  "JavaScript",
  "HTML",
  "Git",
  "ESLint",
  "Prettier",
  "Webpack",
  "CSS",
  "Ajax"
];

var TB_SKILLS = [
  "Vue",
  "JavaScript",
  "MongoDB",
  "REST API",
  "Express",
  "Git",
  "Node.js",
  "ESLint",
  "Prettier",
  "Ajax"
];

var OS_SKILLS = ["HTML", "CSS", "JavaScript", "ESLint", "Prettier"];
var PR_SKILLS = [
  "Git",
  "JavaScript",
  "React",
  "Golang",
  "REST API",
  "ESLint",
  "Prettier",
  "SQL",
  "Redux",
  "Ajax",
  "React Router"
];
if (!window.navigator.userAgent.includes("Mobile")) {
  var projectBoxes = document.querySelectorAll(".about-pojects .section-box");
  projectBoxes.forEach(box => {
    var data = [];
    switch (box.getAttribute("data-project")) {
      case "PR":
        data = PR_SKILLS;
        break;
      case "BWS":
        data = BWS_SKILLS;
        break;
      case "TB":
        data = TB_SKILLS;
        break;
      case "OS":
        data = OS_SKILLS;
        break;
    }
    var spans = [];
    document.querySelectorAll("span[data-skill]").forEach(span => {
      if (data.includes(span.getAttribute("data-skill"))) {
        spans.push(span);
      }
    });
    box.addEventListener("mouseover", e => {
      var skillsBox = document.querySelector("section.about-skills");
      var top = skillsBox.offsetTop;
      var bot = top + skillsBox.offsetHeight * 0.5;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (bot < scrollTop) {
        document.body.appendChild(getSpanList(data));
      } else {
        spans.forEach(span => {
          span.classList.add("span-marked");
        });
      }
    });
    box.addEventListener("mouseout", e => {
      document.querySelectorAll(".span-list-fixed").forEach(el => el.remove());
      spans.forEach(span => {
        span.classList.remove("span-marked");
      });
    });
  });
} else {
}

bDate.innerText = " " + getNumWithPrefix(getAge(), YEARS);

var worksGen = getWorkExperience(START_DATE);
expAmt.innerText +=
  " " +
  getNumWithPrefix(worksGen.next().value, YEARS) +
  " " +
  getNumWithPrefix(worksGen.next().value, MONTH);

var retarcorpsGen = getWorkExperience(START_DATE_IN_RETARCORP);
retarcorpDate.innerText = getWorkPeriode(
  START_DATE_IN_RETARCORP,
  END_DATE_IN_RETARCORP
);
retarcorpAmt.innerText +=
  " " +
  getNumWithPrefix(retarcorpsGen.next().value, YEARS) +
  " " +
  getNumWithPrefix(retarcorpsGen.next().value, MONTH);

function getAge() {
  var now = new Date();
  var start = new Date("Nov 18 1997");
  var age = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth()) {
    age--;
  }
  return age;
}

function getNumWithPrefix(number, [_1, _2, _3]) {
  var strNumber = number.toString();
  var lastNum = Number(strNumber[strNumber.length - 1]);
  if (lastNum === 1) {
    return strNumber + _1;
  }
  if (lastNum >= 2 && lastNum <= 4) {
    return strNumber + _2;
  }
  return strNumber + _3;
}

function* getWorkExperience(from = "") {
  var now = new Date();
  var start = new Date(from);

  var amountYears = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth()) {
    amountYears--;
  }
  yield amountYears;

  var amountMonth = now.getMonth() - start.getMonth();
  amountMonth = amountMonth < 0 ? 12 + amountMonth : amountMonth;
  amountMonth++;
  return amountMonth;
}

function getWorkPeriode(start, end) {
  if (end === "") {
    end = " по настоящее время";
  } else {
    end = getMonthName(new Date(end).getMonth());
  }
  start = new Date(start);
  return (
    getMonthName(start.getMonth()) + " " + start.getFullYear() + " - " + end
  );
}

function getMonthName(number) {
  switch (number) {
    case 0:
      return "Январь";
    case 1:
      return "Февраль";
    case 2:
      return "Март";
    case 3:
      return "Апрель";
    case 4:
      return "Май";
    case 5:
      return "Июнь";
    case 6:
      return "Июль";
    case 7:
      return "Август";
    case 8:
      return "Сентябрь";
    case 9:
      return "Октябрь";
    case 10:
      return "Ноябрь";
    case 11:
      return "Декабрь";
    default:
      return "";
  }
}

function getSpanList(spans) {
  var p = document.createElement("p");
  spans = spans.forEach(span => {
    var spanNode = document.createElement("span");
    spanNode.innerText = span;
    p.appendChild(spanNode);
  });
  p.classList.add("span-list-fixed");
  return p;
}
