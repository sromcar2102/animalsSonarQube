export class HttpService{

    get(url: string){   //devuelve un template generico se puede poner la letra que quieras.
        return fetch(url)
        .then(response => response.json())
        .catch(console.error);
    }

    post(url, options){
        fetch(url, {
            method: "POST", //le digo el metodo que voy a usar
            body: JSON.stringify(options),  //le mando los datos
            headers: {"Content-type": "application/json; charset=UTF-8"} 
        })
        .then(response => response.json())
        .catch(err => console.log(err));
    }

    delete(url){
        return fetch(url, {
            method: "DELETE",
        })
        .then(response => response.json())
        .catch(err => console.log(err));
    }

    put(url, options){
        fetch(url, {
        method: "PUT",
        body: JSON.stringify(options),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .catch(err => console.log(err));  
    }

    request(url, method, options = {} ){
        return fetch(url, {
                method,
                ...options,
            }).then(data=>data.json());
    }
}