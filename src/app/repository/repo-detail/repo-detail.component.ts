import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RestApiService } from '../../shared/rest-api.service';
import * as fromRoot from '../../store/reducers/app.reducer';
import * as UI from '../../store/actions/ui.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.css']
})
export class RepoDetailComponent implements OnInit, OnChanges {
  @Input() currentRepo: any;

  isLoading$: Observable<boolean>;

  private contributors: any;

  constructor(private rest: RestApiService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.currentRepo !== undefined) {
      this.store.dispatch(new UI.StartLoading());
      this.contributors = [];
      let name = this.currentRepo.node.name;
      let owner = this.currentRepo.node.owner.login;
      this.rest.getContributors(name, owner).subscribe((data: any[]) => {
        this.contributors = data;
        this.store.dispatch(new UI.StopLoading());
      });
    }

  }

}
