! function (e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }
    r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) r.d(n, o, function (t) {
                return e[t]
            }.bind(null, o));
        return n
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 10)
}({
    0: function (e, t) {
        e.exports = library
    },
    1: function (e, t, r) {
        e.exports = r(0)(1199)
    },
    10: function (e, t, r) {
        "use strict";
        r.r(t);
        r(23);
        var n = r(1),
            o = r.n(n),
            a = r(2),
            c = r(3),
            u = r.n(c);
        u.a.defaultFormat("0,0");
        var i = o()(a.a.url);
        i.emit("cliStart", {
            cliRequire: "propertyMessage"
        }), i.on("propertyMessage", (function (e) {
            e.message.forEach((function (e) {
                switch (e.property_type) {
                    case "Office/Commercial":
                        console.log(document.querySelector("#chart1-office-data .count")), document.querySelector("#chart1-office-data .count").innerHTML = u()(e.Count).format(), document.querySelector("#chart1-office-data .area").innerHTML = u()(e.Area).format();
                        break;
                    case "Industrial":
                        document.querySelector("#chart1-industry-data .count").innerHTML = u()(e.Count).format(), document.querySelector("#chart1-industry-data .area").innerHTML = u()(e.Area).format();
                        break;
                    case "Business Park":
                        document.querySelector("#chart1-park-data .count").innerHTML = u()(e.Count).format(), document.querySelector("#chart1-park-data .area").innerHTML = u()(e.Area).format();
                        break;
                    case "Retail":
                        document.querySelector("#chart1-retail-data .count").innerHTML = u()(e.Count).format(), document.querySelector("#chart1-retail-data .area").innerHTML = u()(e.Area).format()
                }
            }))
        }))
    },
    2: function (e, t, r) {
        "use strict";
        t.a = {
            url: "https://jll-sh-hkri.chinacloudsites.cn"
        }
    },
    23: function (e, t) {},
    3: function (e, t, r) {
        e.exports = r(0)(1198)
    }
});