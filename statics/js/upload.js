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
var Upload = /** @class */ (function () {
    function Upload() {
        this.newBouquet = new Bouquet();
    }
    Upload.prototype.bindUploadScreen = function () {
        var body = document.body;
        var dialog = document.getElementsByClassName('dialog');
        var buttons = document.getElementsByClassName('button--upload');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function (e) {
                body.classList.toggle("overlayed");
                dialog[0].classList.toggle("show");
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
                    var img = document.getElementById('preview');
                    img.src = reader.result.toString();
                    //TODO: Refactor to actual numbers
                    console.log('start timer');
                    setTimeout(function () {
                        console.log('starting');
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                        var MAX_WIDTH = 400;
                        var MAX_HEIGHT = 400;
                        var width = img.width;
                        var height = img.height;
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
                        ctx.drawImage(img, 0, 0, width, height);
                        var dataurl = canvas.toDataURL(file.type);
                        img.src = dataurl;
                        _this.newBouquet.AmountComments = 0;
                        _this.newBouquet.AmountLikes = 0;
                        _this.newBouquet.AmountViews = 0;
                        _this.newBouquet.PhotoUrl = img.src;
                        _this.newBouquet.PublishedDate = new Date();
                        _this.newBouquet.Rating = 0;
                        _this.newBouquet.Title = img.title;
                        _this.newBouquet.Username = 'ruofan';
                        console.log(_this.newBouquet);
                    }, 1000);
                };
                reader.readAsDataURL(file);
            }
        });
        var cancel = document.getElementById('cancel');
        cancel.addEventListener('click', function () {
            document.body.classList.toggle("overlayed");
            var dialog = document.getElementsByClassName('dialog');
            dialog[0].classList.toggle("show");
        });
        var form = document.getElementById('submit');
        form.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (e.preventDefault)
                            e.preventDefault();
                        console.log('clicked');
                        name = document.getElementById('name');
                        this.newBouquet.Title = name.value;
                        return [4 /*yield*/, this.uploadImage(this.newBouquet)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    };
    Upload.prototype.uploadImage = function (bouquet) {
        return __awaiter(this, void 0, void 0, function () {
            var requestHelper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHelper = new RequestHelper('http://practicesoft/bouquet/add');
                        console.log('uplad');
                        return [4 /*yield*/, requestHelper.post(bouquet)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Upload;
}());
//# sourceMappingURL=upload.js.map