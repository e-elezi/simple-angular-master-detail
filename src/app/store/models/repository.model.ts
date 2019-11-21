export type Repository = {
    node: {
        name: string;
        owner: {
            login: string;
        };
        description: string;
        url: string;
    }
}

export type Query = {
    viewer: {
        repositories: {
            nodes: Repository[];
        };
    }
}

// const REPOSITORY_QUERY = gql`
// query ( $pageSize: Int! , $cursor:String){
//   viewer {
//     repositories(first: $pageSize, after: $cursor) {
//       totalCount
//       nodes {
//         name
//         owner {
//           login
//         }
//         description
//         url
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//     }
//   }
// }
// `;