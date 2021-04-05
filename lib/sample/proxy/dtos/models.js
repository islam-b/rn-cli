"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["ONREVIEW"] = 1] = "ONREVIEW";
    Status[Status["REJECTED"] = 2] = "REJECTED";
    Status[Status["PUBLISHED"] = 3] = "PUBLISHED";
})(Status = exports.Status || (exports.Status = {}));
var Provider;
(function (Provider) {
    Provider[Provider["Udemy"] = 100] = "Udemy";
    Provider[Provider["Teachable"] = 200] = "Teachable";
    Provider[Provider["Pluralsight"] = 300] = "Pluralsight";
})(Provider = exports.Provider || (exports.Provider = {}));
//# sourceMappingURL=models.js.map