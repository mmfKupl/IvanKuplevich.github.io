var YEARS = [" год", " года", " лет"];
var MONTH = [" месяц", " месяца", " месяцев"];
var START_DATE = "Sep 1 2017";
var START_DATE_IN_RETARCORP = "Sep 1 2017";
var END_DATE_IN_RETARCORP = "";

bDate.innerText = getNumWithPrefix(getAge(), YEARS);

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
