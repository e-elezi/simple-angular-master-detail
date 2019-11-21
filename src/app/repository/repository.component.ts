import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Repository, Query } from '../store/models/repository.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../store/reducers/app.reducer';
import * as UI from '../store/actions/ui.actions';

const REPOSITORY_QUERY = gql`
query ($queryWord: String!) {
  search(query: $queryWord, type: REPOSITORY, first: 10) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          descriptionHTML
          url
          owner {
            login
          }
          updatedAt
        }
      }
    }
  }
}
`;

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  displayedColumns: string[] = ['name'];

  searchValue: string = "is:public";

  dataSource = new MatTableDataSource<Repository>([]);

  reposs: Repository[];

  selectedRepo: any;

  isLoading$: Observable<boolean>

  constructor(private apollo: Apollo,
    private store: Store<fromRoot.State>,
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    this.getListRepos();
  }

  getListRepos() {
    let variables = {
      "queryWord": this.searchValue,
    }
    this.store.dispatch(new UI.StartLoading());
    this.apollo
      .query({
        query: REPOSITORY_QUERY,
        variables: variables
      })
      .subscribe(({ data, loading }) => {
        this.reposs = data['search'].edges;
        this.dataSource = new MatTableDataSource<Repository>(this.reposs);
        this.selectedRepo = this.reposs[0];
        this.store.dispatch(new UI.StopLoading());
      });
  }

  handleListClick(repo) {
    this.selectedRepo = repo;
  }

  searchRepo(value: string) {
    this.searchValue = value;
    this.getListRepos();
  }

}
