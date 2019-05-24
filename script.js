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
    data = getCurrentData(box.getAttribute("data-project"));
    var spans = [];
    document.querySelectorAll("span[data-skill]").forEach(span => {
      if (data.includes(span.getAttribute("data-skill"))) {
        spans.push(span);
      }
    });
    box.addEventListener("mouseenter", e => {
      var skillsBox = document.querySelector("section.about-skills");
      var top = skillsBox.offsetTop;
      var bot = top + skillsBox.offsetHeight * 0.5;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (bot < scrollTop) {
        var p = getSpanList(data, "span-list-fixed");
        document.body.appendChild(p);
        setTimeout(() => {
          p.style.top = "0";
        }, 0);
      } else {
        spans.forEach(span => {
          span.classList.add("span-marked");
        });
      }
    });
    box.addEventListener("mouseleave", e => {
      var p = document.querySelectorAll(".span-list-fixed");
      p.forEach(el => {
        el.style.top = "-100px";
      });
      p.forEach(el => {
        setTimeout(() => {
          el.remove();
        }, 500);
      });
      spans.forEach(span => {
        span.classList.remove("span-marked");
      });
    });
  });
} else {
  var dataProjects = document.querySelectorAll("section[data-project]");
  dataProjects.forEach(dataProject => {
    var data = getCurrentData(dataProject.getAttribute("data-project"));
    if (!data.length) {
      return;
    }
    var p = getSpanList(data, "span-list-mobile");
    var h5p = dataProject.querySelector("h5 + p");
    dataProject.querySelector(".place-role").insertBefore(p, h5p);
  });
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

function getSpanList(spans, style) {
  var p = document.createElement("p");
  spans = spans.forEach(span => {
    var spanNode = document.createElement("span");
    spanNode.innerText = span;
    p.appendChild(spanNode);
  });
  p.classList.add(style);
  return p;
}

function removeAllAttr(elements, attr) {
  elements.forEach(el => el.removeAttribute(attr));
}

function getCurrentData(attr) {
  switch (attr) {
    case "PR":
      return PR_SKILLS;
    case "BWS":
      return BWS_SKILLS;
    case "TB":
      return TB_SKILLS;
    case "OS":
      return OS_SKILLS;
  }
  return [];
}
