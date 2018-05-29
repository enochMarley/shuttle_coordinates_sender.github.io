import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CoordinatesProvider {
	

	constructor(public http: Http) {
		console.log('hello coords provider...')
	}

	sendCoordinates(url) {
		return this.http.get(url).map(res => res.json());
	}

}
