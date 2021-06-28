module.exports = {
  dtr: function (d) {
    return (d * Math.PI) / 180.0;
  },
  rtd: function (r) {
    return (r * 180.0) / Math.PI;
  },
  sin: function (d) {
    return Math.sin(this.dtr(d));
  },
  cos: function (d) {
    return Math.cos(this.dtr(d));
  },
  tan: function (d) {
    return Math.tan(this.dtr(d));
  },
  arcsin: function (d) {
    return this.rt0d(Math.asin(d));
  },
  arccos: function (d) {
    return this.rtd(Math.acos(d));
  },
  arctan: function (d) {
    return this.rtd(Math.atan(d));
  },
  arccot: function (x) {
    return this.rtd(Math.atan(1 / x));
  },
  arctan2: function (y, x) {
    return this.rtd(Math.atan2(y, x));
  },
  fixAngle: function (a) {
    return this.fix(a, 360);
  },
  fixHour: function (a) {
    return this.fix(a, 24);
  },
  fix: function (a, b) {
    a = a - b * Math.floor(a / b);
    return a < 0 ? a + b : a;
  },
};
