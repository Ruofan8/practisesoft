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
var BouquetHelper = /** @class */ (function () {
    function BouquetHelper() {
        this.collageContainer = document.getElementsByClassName('collage__container');
    }
    BouquetHelper.prototype.bindFilters = function () {
        var _this = this;
        //TODO: refactor move outside, be more efficient with elements
        //var sidebar = document.getElementById('sidebar');
        var filters = document.getElementsByClassName('collage-filter');
        for (var i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', function (e) {
                var filter = e.srcElement;
                var type = filter.getAttribute('data-filter');
                var text = filter.textContent;
                console.log(type);
                //this.getData(type, text);
                _this.getView(type, text);
                _this.checkHeight();
            });
        }
    };
    ;
    BouquetHelper.prototype.getView = function (param, text) {
        if (param === void 0) { param = null; }
        if (text === void 0) { text = 'Hoogste gewaardeerde'; }
        return __awaiter(this, void 0, void 0, function () {
            var requestHelper, view;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHelper = new RequestHelper('http://practicesoft/bouquet/test?type=' + param);
                        return [4 /*yield*/, requestHelper.getView()];
                    case 1:
                        view = _a.sent();
                        return [2 /*return*/, this.collageContainer[0].innerHTML = view];
                }
            });
        });
    };
    ;
    BouquetHelper.prototype.getData = function (param, text) {
        if (param === void 0) { param = null; }
        if (text === void 0) { text = 'Hoogste gewaardeerde'; }
        return __awaiter(this, void 0, void 0, function () {
            var requestHelper, _a, i, card, collageTitle;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestHelper = new RequestHelper('http://practicesoft/bouquet/test?type=' + param);
                        _a = this;
                        return [4 /*yield*/, requestHelper.get()];
                    case 1:
                        _a.data = _b.sent();
                        this.collageContainer[0].innerHTML = "";
                        for (i = 0; i < this.data.length; i++) {
                            card = this._generateHtml(this.data[i]);
                            this.collageContainer[0].appendChild(card);
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
    BouquetHelper.prototype.checkHeight = function () {
        var children = this.collageContainer[0].children;
        var first = 0;
        var second = 0;
        var third = 0;
        var highest = 0;
        for (var i = 0; i < children.length; i++) {
            if (i % 2 == 0 && i % 3 != 0) {
                second = second + children[i].clientHeight;
                if (highest < second)
                    highest = children[i].clientHeight;
            }
            else if (i % 3 == 0) {
                third = third + children[i].clientHeight;
                if (highest < third)
                    highest = children[i].clientHeight;
            }
            else {
                first = first + children[i].clientHeight;
                if (highest < first)
                    highest = children[i].clientHeight;
            }
        }
        var highestTotal = Math.max(first, second, third) + highest;
        this.collageContainer[0].setAttribute('style', 'height: ' + highestTotal + 'px');
    };
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
var Upload = /** @class */ (function () {
    function Upload() {
        this.newBouquet = new Bouquet();
        this.body = document.body;
        this.dialog = document.getElementsByClassName('dialog');
        this.preview = document.getElementById('preview');
    }
    Upload.prototype.bindUploadScreen = function () {
        var _this = this;
        var buttons = document.getElementsByClassName('button--upload');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function (e) {
                _this.toggleDialog();
            });
        }
        ;
    };
    Upload.prototype.bindUpload = function () {
        var _this = this;
        var file = document.getElementById('files');
        file.addEventListener('change', function (e) {
            var files = e.target.files;
            var file = files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function (ev) {
                    _this.preview.src = reader.result.toString();
                    //TODO: Refactor to actual numbers
                    console.log('start timer');
                    setTimeout(function () {
                        console.log('starting');
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(_this.preview, 0, 0);
                        var MAX_WIDTH = 400;
                        var MAX_HEIGHT = 400;
                        var width = _this.preview.width;
                        var height = _this.preview.height;
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        }
                        else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(_this.preview, 0, 0, width, height);
                        var dataurl = canvas.toDataURL(file.type);
                        _this.preview.src = dataurl;
                        _this.newBouquet.AmountComments = 0;
                        _this.newBouquet.AmountLikes = 0;
                        _this.newBouquet.AmountViews = 0;
                        _this.newBouquet.PhotoUrl = _this.preview.src;
                        _this.newBouquet.PublishedDate = new Date();
                        _this.newBouquet.Rating = 0;
                        _this.newBouquet.Title = _this.preview.title;
                        _this.newBouquet.Username = 'ruofan';
                        console.log(_this.newBouquet);
                    }, 1000);
                };
                reader.readAsDataURL(file);
            }
        });
        var cancel = document.getElementById('cancel');
        cancel.addEventListener('click', function () {
            _this.toggleDialog();
        });
        var form = document.getElementById('submit');
        form.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (e.preventDefault)
                            e.preventDefault();
                        console.log(this.newBouquet.PhotoUrl);
                        if (this.newBouquet.PhotoUrl == undefined)
                            return [2 /*return*/];
                        name = document.getElementById('name');
                        this.newBouquet.Title = name.value;
                        return [4 /*yield*/, this.uploadImage()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    };
    Upload.prototype.uploadImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestHelper, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHelper = new RequestHelper('http://practicesoft/bouquet/add');
                        return [4 /*yield*/, requestHelper.post(this.newBouquet)];
                    case 1:
                        result = _a.sent();
                        this.newBouquet = new Bouquet();
                        if (result.indexOf('Succeeded') > -1) {
                            this.preview.src = 'https://cdn.icon-icons.com/icons2/1325/PNG/512/thumbsup4x_86998.png';
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Upload.prototype.toggleDialog = function () {
        this.body.classList.toggle("overlayed");
        this.dialog[0].classList.toggle("show");
    };
    return Upload;
}());
var Init = /** @class */ (function () {
    function Init() {
        var bouquetHelper = new BouquetHelper();
        bouquetHelper.bindFilters();
        bouquetHelper.checkHeight();
        var upload = new Upload();
        upload.bindUploadScreen();
        upload.bindUpload();
    }
    return Init;
}());
var init = new Init();
console.log('request.ts');
var RequestHelper = /** @class */ (function () {
    function RequestHelper(url) {
        this.url = url;
    }
    RequestHelper.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myHeaders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json');
                        return [4 /*yield*/, fetch(this.url, {
                                method: 'GET',
                                headers: myHeaders,
                                mode: 'cors',
                                credentials: 'same-origin',
                                cache: 'default'
                            })
                                .then(function (response) {
                                return response.json();
                            })
                                .then(function (data) {
                                return data;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestHelper.prototype.getView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myHeaders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'text/html');
                        return [4 /*yield*/, fetch(this.url, {
                                method: 'GET',
                                headers: myHeaders,
                                mode: 'cors',
                                credentials: 'same-origin',
                                cache: 'default'
                            })
                                .then(function (response) {
                                return response.text();
                            }).then(function (data) {
                                return data;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    RequestHelper.prototype.post = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var myHeaders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        myHeaders = new Headers();
                        myHeaders.append('Content-Type', 'application/json; charset=utf-8');
                        return [4 /*yield*/, fetch(this.url, {
                                method: 'POST',
                                headers: myHeaders,
                                mode: 'cors',
                                credentials: 'same-origin',
                                cache: 'default',
                                body: JSON.stringify(data),
                            })
                                .then(function (response) {
                                return response.text();
                            }).then(function (data) {
                                return data;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RequestHelper;
}());
//# sourceMappingURL=main.js.map