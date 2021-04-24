import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";


@Injectable({
    providedIn:'root'
})

export class GeneralService {

    private baseurl=environment.livebaseurl;

    constructor(private httpClient : HttpClient){}

    getGenere(){
        let url="./assets/json/genere.json"
        // if(environment.production=true){
        //     url = this.baseurl+url
        //     return this.httpClient.get(url)
        // }
        // else{
            return this.httpClient.get(url)

       // }
        
       
    }

    getSearchResult(url){
        url=environment.skunkworks+url
        return this.httpClient.get(url);
    }

}