console.log('request.ts')
class RequestHelper {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async get() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        return await fetch(this.url, {
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
                //TODO: return typed json?
                return data;
            });
    }
    async post(data) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        return await fetch(this.url, {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            credentials: 'same-origin',
            cache: 'default',
            body: JSON.stringify(data),
        })
            .then(function (response) {
                return response.json();
            });
    }
}
