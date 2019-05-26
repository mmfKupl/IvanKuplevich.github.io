var YEARS = [" год", " года", " лет"];
var YEARS_ENG = [" years", " years", " years"];
var MONTHES = [" месяц", " месяца", " месяцев"];
var MONTHES_ENG = [" month", " months", " months"];
var START_DATE = "Sep 1 2017";
var START_DATE_IN_RETARCORP = "Sep 1 2017";
var END_DATE_IN_RETARCORP = "";
var END_PHRAZE = " по настоящее время";
var END_PHRAZE_ENG = " till now";
var MONTH = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

var MONTH_ENG = [
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
  "December"
];

var BWS_SKILLS = [
  "JavaScript",
  "Webpack",
  "Git",
  "ESLint",
  "Prettier",
  "HTML",
  "CSS",
  "Ajax"
];

var TB_SKILLS = [
  "Node.js",
  "Express",
  "Vue",
  "JavaScript",
  "MongoDB",
  "REST API",
  "Git",
  "Ajax",
  "ESLint",
  "Prettier"
];

var OS_SKILLS = ["HTML", "CSS", "JavaScript", "ESLint", "Prettier"];
var PR_SKILLS = [
  "JavaScript",
  "React",
  "Golang",
  "Redux",
  "React Router",
  "React Native",
  "SQL",
  "REST API",
  "Git",
  "Ajax",
  "Prettier",
  "ESLint"
];

// window.onload = function() {
var curLang = checkLanguage();
if (curLang == "en") {
  YEARS = YEARS_ENG;
  MONTHES = MONTHES_ENG;
  END_PHRAZE = END_PHRAZE_ENG;
  MONTH = MONTH_ENG;
}

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
} else if (window.navigator.userAgent.includes("Mobile")) {
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

  if (window.screen.availWidth <= 420) {
    var header = document.querySelector("header");
    var main = document.querySelector("main");
    main.style.marginTop = header.offsetHeight + 5 + "px";

    var swapSections = document.querySelectorAll(".section-mob-swap");
    console.log(swapSections);
    swapSections.forEach(el => {
      var dateS = el.querySelector(".section-date");
      var roleS = el.querySelector(".place-role");
      roleS.insertBefore(dateS, roleS.firstChild);
    });
  }
}

bDate.innerText = " " + getNumWithPrefix(getAge(), YEARS);

var worksGen = getWorkExperience(START_DATE);
expAmt.innerText +=
  " " +
  getNumWithPrefix(worksGen.next().value, YEARS) +
  " " +
  getNumWithPrefix(worksGen.next().value, MONTHES);

var retarcorpsGen = getWorkExperience(START_DATE_IN_RETARCORP);
retarcorpDate.innerText = getWorkPeriode(
  START_DATE_IN_RETARCORP,
  END_DATE_IN_RETARCORP
);
retarcorpAmt.innerText +=
  " " +
  getNumWithPrefix(retarcorpsGen.next().value, YEARS) +
  " " +
  getNumWithPrefix(retarcorpsGen.next().value, MONTHES);
// };

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
    end = END_PHRAZE;
  } else {
    end = getMonthName(new Date(end).getMonth());
  }
  start = new Date(start);
  return (
    getMonthName(start.getMonth()) + " " + start.getFullYear() + " - " + end
  );
}

function getMonthName(number) {
  if (number >= MONTH.length) {
    return "";
  }
  return MONTH[number];
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

function checkLanguage() {
  var href = window.location.href;
  if (href.includes("en")) {
    return "en";
  }
  return "ru";
}

function setLanguage() {}
