var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Bouquet = /** @class */ (function () {
    function Bouquet() {
    }
    return Bouquet;
}());
export { Bouquet };
var BouquetHelper = /** @class */ (function () {
    function BouquetHelper() {
    }
    BouquetHelper.prototype.bindFilters = function () {
        var _this = this;
        //TODO: refactor move outside, be more efficient with elements
        var sidebar = document.getElementById('sidebar');
        var filters = sidebar.getElementsByClassName('collage-filter');
        for (var i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', function (e) {
                var filter = e.srcElement;
                var type = filter.getAttribute('data-filter');
                var text = filter.textContent;
                console.log(type);
                //this.getData(type, text);
                _this.getView(type, text);
            });
        }
    };
    ;
    BouquetHelper.prototype.getView = function (param, text) {
        if (param === void 0) { param = null; }
        if (text === void 0) { text = 'Hoogste gewaardeerde'; }
        return __awaiter(this, void 0, void 0, function () {
            var collageContainer, requestHelper, view;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collageContainer = document.getElementsByClassName('collage__container');
                        requestHelper = new RequestHelper('http://practicesoft/bouquet/test?type=' + param);
                        return [4 /*yield*/, requestHelper.getView()];
                    case 1:
                        view = _a.sent();
                        return [2 /*return*/, collageContainer[0].innerHTML = view];
                }
            });
        });
    };
    ;
    BouquetHelper.prototype.getData = function (param, text) {
        if (param === void 0) { param = null; }
        if (text === void 0) { text = 'Hoogste gewaardeerde'; }
        return __awaiter(this, void 0, void 0, function () {
            var collageContainer, requestHelper, _a, i, card, collageTitle;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        collageContainer = document.getElementsByClassName('collage__container');
                        requestHelper = new RequestHelper('http://practicesoft/bouquet/test?type=' + param);
                        _a = this;
                        return [4 /*yield*/, requestHelper.get()];
                    case 1:
                        _a.data = _b.sent();
                        collageContainer[0].innerHTML = "";
                        for (i = 0; i < this.data.length; i++) {
                            card = this._generateHtml(this.data[i]);
                            collageContainer[0].appendChild(card);
                        }
                        collageTitle = document.getElementsByClassName('collage__title');
                        collageTitle[0].textContent = text + ' boeketten';
                        //TODO: Investigate nice void return
                        return [2 /*return*/, this.data];
                }
            });
        });
    };
    ;
    //TODO: Refactor return view as data instead of generateHtml
    BouquetHelper.prototype._generateHtml = function (bouquet) {
        var cardImage = document.createElement('div');
        cardImage.className = 'card__image';
        var img = document.createElement('img');
        img.src = bouquet.PhotoUrl;
        cardImage.appendChild(img);
        var like = document.createElement('span');
        like.innerText = bouquet.AmountLikes.toString();
        cardImage.appendChild(like);
        var comments = document.createElement('span');
        comments.innerText = bouquet.AmountComments.toString();
        cardImage.appendChild(comments);
        var cardContent = document.createElement('div');
        cardContent.className = 'card__content';
        var title = document.createElement('h3');
        title.innerText = bouquet.Title;
        cardContent.appendChild(title);
        var username = document.createElement('p');
        username.innerText = bouquet.Username;
        cardContent.appendChild(username);
        var card = document.createElement('div');
        card.className = 'card card--collage';
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        return card;
    };
    return BouquetHelper;
}());
export { BouquetHelper };
//# sourceMappingURL=bouquet.js.map