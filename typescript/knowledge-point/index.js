var person = [1, 'dd'];
person.push(4);
console.info(person);
// 元组 tiuple类型
var person1 = [1, 'abc'];
// person1 = [1, 2];
var literal1;
literal1 = 1;
// 报错
// literal1 = 2;
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
;
var color1 = Color.green;
var Color2;
(function (Color2) {
    Color2[Color2["red"] = 5] = "red";
    Color2["green"] = "green";
    Color2[Color2["blue"] = 2] = "blue";
})(Color2 || (Color2 = {}));
;
var color2 = Color2.green;
