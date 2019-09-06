interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

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

    bindFilters() {
        //TODO: refactor move outside, be more efficient with elements
        var sidebar = document.getElementById('sidebar');
        var filters = sidebar.getElementsByClassName('collage-filter');
        for (var i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', (e) => {
                var filter = e.srcElement;
                var type = (<any>filter).getAttribute('data-filter');
                var text = (<any>filter).textContent;
                console.log(type);
                this.getData(type, text);
            });
        }
    };

    async getData(param: string = null, text: string = 'Hoogste gewaardeerde') {
        var collageContainer = document.getElementsByClassName('collage__container');
        var requestHelper = new RequestHelper('http://practicesoft/api/bouquet?type='+param);
        this.data = await requestHelper.get();
        console.log(this.data);
        collageContainer[0].innerHTML = "";
        for (var i = 0; i < this.data.length; i++) {
            var card = this._generateHtml(this.data[i]);
            collageContainer[0].appendChild(card);
        }

        var collageTitle = document.getElementsByClassName('collage__title');
        collageTitle[0].textContent = text + ' boeketten';

        //TODO: Investigate nice void return
        return this.data;
    };

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

class Upload {
    newBouquet: Bouquet = new Bouquet();

    bindUploadScreen() {
        var body = document.body;
        var dialog = document.getElementsByClassName('dialog');
        var buttons = document.getElementsByClassName('button--upload');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', (e) => {
                body.classList.toggle("overlayed");
                dialog[0].classList.toggle("show");
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
                    var img = document.getElementById('preview') as HTMLImageElement;
                    img.src = reader.result.toString();
                    //TODO: Refactor to actual numbers
                    console.log('start timer')
                    setTimeout(() => {
                        console.log('starting')

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
                        } else {
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

                        this.newBouquet.AmountComments = 0;
                        this.newBouquet.AmountLikes = 0;
                        this.newBouquet.AmountViews = 0;
                        this.newBouquet.PhotoUrl = img.src;
                        this.newBouquet.PublishedDate = new Date();
                        this.newBouquet.Rating = 0;
                        this.newBouquet.Title = img.title;
                        this.newBouquet.Username = 'ruofan'
                        console.log(this.newBouquet)

                    }, 1000);


                };
                reader.readAsDataURL(file);
            }
        });

        var cancel = document.getElementById('cancel');
        cancel.addEventListener('click', () => {
            document.body.classList.toggle("overlayed")
            var dialog = document.getElementsByClassName('dialog');
            dialog[0].classList.toggle("show");
        });

        var form = document.getElementById('submit');
        form.addEventListener('click', async (e) => {
            if (e.preventDefault) e.preventDefault();
            console.log('clicked')
            var name = document.getElementById('name') as HTMLInputElement;
            this.newBouquet.Title = name.value;
            return await this.uploadImage(this.newBouquet);
        });
    }

    async uploadImage(bouquet: Bouquet) {
        var requestHelper = new RequestHelper('http://practicesoft/api/bouquet/add');

        console.log('uplad')
        return await requestHelper.post(bouquet);
        //TODO: Create Post Helper
        //TODO: Autorefresh latest search with new item
    }
}

class Init {
    constructor() {
        var bouquetHelper = new BouquetHelper();
        bouquetHelper.bindFilters();
        var upload = new Upload();
        upload.bindUploadScreen();
        upload.bindUpload();
    }
}

var init = new Init();
