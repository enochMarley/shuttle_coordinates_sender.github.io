import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CoordinatesProvider {
	
	url;
	constructor(public http: Http) {
		this.url = "http://localhost:4000/";
	}

	sendCoordinates(busName, latitude, longitude) {
		let fullUrl = this.url + `insertCoordinates?busName=${busName}&lon=${longitude}&lat=${latitude}`
		return this.http.get(fullUrl).map(res => res.json());
	}

	signupUser(data) {
		let fullUrl = this.url + "signup";
		return this.http.post(fullUrl, data).map(res => res.json())
	}

	loginUser(data) {
		let fullUrl = this.url + "login";
		return this.http.post(fullUrl, data).map(res => res.json())
	}

	authAdmin(data) {
		let fullUrl = this.url + "authAdmin";
		return this.http.post(fullUrl, data).map(res => res.json())
	}

}
