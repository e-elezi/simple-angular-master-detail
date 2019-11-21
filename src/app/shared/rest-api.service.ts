import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
// import * as fromRoot from './reducers/app.reducer';
// import * as UI from './actions/ui.actions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private REST_API_SERVER = environment.githubRestApi.url;

  headers = new HttpHeaders(environment.githubRestApi.headers)

  constructor(
    // private store: Store<fromRoot.State>,
    private http: HttpClient
  ) { }

  public getContributors(repoName: string, ownerName: string) {
    // this.store.dispatch(new UI.StartLoading());
    let url = `/repos/${ownerName}/${repoName}/contributors`
    return this.http.get(this.REST_API_SERVER + url, { headers: this.headers });
  }

  doSmth() {
    // this.store.dispatch(new UI.StartLoading());
    // this.store.dispatch(new UI.StopLoading());
  }
}
