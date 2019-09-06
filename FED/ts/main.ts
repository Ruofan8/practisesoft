class Bouquet {
    AmountComments: number;
    AmountLikes: number;
    AmountViews: number;
    PhotoUrl: string;
    PublishedDate: Date;
    Rating: number;
    Title: string;
    Username: string;
}

class BouquetHelper {
    data: Bouquet[];
    collageContainer = document.getElementsByClassName('collage__container');

    bindFilters() {
        //TODO: refactor move outside, be more efficient with elements
        //var sidebar = document.getElementById('sidebar');
        var filters = document.getElementsByClassName('collage-filter');
        for (var i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', (e) => {
                var filter = e.srcElement;
                var type = (<any>filter).getAttribute('data-filter');
                var text = (<any>filter).textContent;
                console.log(type);
                //this.getData(type, text);
                this.getView(type, text);
                this.checkHeight();
            });
        }
    };
    async getView(param: string = null, text: string = 'Hoogste gewaardeerde') {
        var requestHelper = new RequestHelper('http://practicesoft/bouquet/test?type=' + param);
        var view = await requestHelper.getView();
        return this.collageContainer[0].innerHTML = view;
    };
    async getData(param: string = null, text: string = 'Hoogste gewaardeerde') {
        var requestHelper = new RequestHelper('http://practicesoft/bouquet/test?type=' + param);
        this.data = await requestHelper.get();
        this.collageContainer[0].innerHTML = "";
        for (var i = 0; i < this.data.length; i++) {
            var card = this._generateHtml(this.data[i]);
            this.collageContainer[0].appendChild(card);
        }

        var collageTitle = document.getElementsByClassName('collage__title');
        collageTitle[0].textContent = text + ' boeketten';

        //TODO: Investigate nice void return
        return this.data;
    };

    checkHeight() {
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

            } else if (i % 3 == 0) {
                third = third + children[i].clientHeight;

                if (highest < third)
                    highest = children[i].clientHeight;

            } else {
                first = first + children[i].clientHeight;

                if (highest < first)
                    highest = children[i].clientHeight;
            }
        }
        var highestTotal = Math.max(first, second, third) + highest;
        this.collageContainer[0].setAttribute('style', 'height: ' + highestTotal + 'px');
        
    }

    //TODO: Refactor return view as data instead of generateHtml
    _generateHtml(bouquet: Bouquet) {
        var cardImage = document.createElement('div');
        cardImage.className = 'card__image';

        var img = document.createElement('img');
        img.src = bouquet.PhotoUrl;
        cardImage.appendChild(img);

        var like = document.createElement('span')
        like.innerText = bouquet.AmountLikes.toString();
        cardImage.appendChild(like);
        var comments = document.createElement('span')
        comments.innerText = bouquet.AmountComments.toString();
        cardImage.appendChild(comments);

        var cardContent = document.createElement('div');
        cardContent.className = 'card__content';

        var title = document.createElement('h3')
        title.innerText = bouquet.Title;
        cardContent.appendChild(title);
        var username = document.createElement('p')
        username.innerText = bouquet.Username;
        cardContent.appendChild(username);

        var card = document.createElement('div');
        card.className = 'card card--collage';
        card.appendChild(cardImage);
        card.appendChild(cardContent);

        return card;
    }

}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

class Upload {
    newBouquet: Bouquet = new Bouquet();
    body = document.body;
    dialog = document.getElementsByClassName('dialog');
    preview = document.getElementById('preview') as HTMLImageElement;

    bindUploadScreen() {
        var buttons = document.getElementsByClassName('button--upload');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', (e) => {
                this.toggleDialog();
            });
        };
    }
    bindUpload() {
        var file = document.getElementById('files');
        file.addEventListener('change', (e: HTMLInputEvent) => {
            var files = e.target.files;
            var file = files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = (ev: Event) => {
                    this.preview.src = reader.result.toString();
                    //TODO: Refactor to actual numbers
                    console.log('start timer')
                    setTimeout(() => {
                        console.log('starting')

                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(this.preview, 0, 0);

                        var MAX_WIDTH = 400;
                        var MAX_HEIGHT = 400;
                        var width = this.preview.width;
                        var height = this.preview.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(this.preview, 0, 0, width, height);

                        var dataurl = canvas.toDataURL(file.type);
                        this.preview.src = dataurl;

                        this.newBouquet.AmountComments = 0;
                        this.newBouquet.AmountLikes = 0;
                        this.newBouquet.AmountViews = 0;
                        this.newBouquet.PhotoUrl = this.preview.src;
                        this.newBouquet.PublishedDate = new Date();
                        this.newBouquet.Rating = 0;
                        this.newBouquet.Title = this.preview.title;
                        this.newBouquet.Username = 'ruofan'
                        console.log(this.newBouquet)

                    }, 1000);


                };
                reader.readAsDataURL(file);
            }
        });

        var cancel = document.getElementById('cancel');
        cancel.addEventListener('click', () => {
            this.toggleDialog();
        });

        var form = document.getElementById('submit');
        form.addEventListener('click', async (e) => {
            if (e.preventDefault) e.preventDefault();
            console.log(this.newBouquet.PhotoUrl)
            if (this.newBouquet.PhotoUrl == undefined)
                return;

            var name = document.getElementById('name') as HTMLInputElement;
            this.newBouquet.Title = name.value;


            return await this.uploadImage();
        });
    }

    async uploadImage() {
        var requestHelper = new RequestHelper('http://practicesoft/bouquet/add');
        var result = await requestHelper.post(this.newBouquet);

        this.newBouquet = new Bouquet();

        if (result.indexOf('Succeeded') > -1) {
            this.preview.src = 'https://cdn.icon-icons.com/icons2/1325/PNG/512/thumbsup4x_86998.png';
        }

        return result;
        //TODO: Create Post Helper
        //TODO: Autorefresh latest search with new item
    }

    toggleDialog() {
        this.body.classList.toggle("overlayed")
        this.dialog[0].classList.toggle("show");
    }
}

class Init {
    constructor() {
        var bouquetHelper = new BouquetHelper();
        bouquetHelper.bindFilters();
        bouquetHelper.checkHeight();
        var upload = new Upload();
        upload.bindUploadScreen();
        upload.bindUpload();
    }
}

var init = new Init();
