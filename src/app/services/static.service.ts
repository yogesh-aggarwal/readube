import { Injectable } from "@angular/core";
import gql from "graphql-tag";
import { DocumentNode } from "graphql";

interface HomeQuery {
  newRavels: DocumentNode;
  userRecommendations: DocumentNode;
}

interface TrendingQuery {
  trending: DocumentNode;
}

interface ExploreQuery {
  explore: DocumentNode;
}

interface AuthorQuery {
  collections: Function;
  info: Function;
  user: Function;
  story: Function;
}

interface CollectionQuery {
  collection: Function;
}

class Resolvers {
  static collection(id: string) {
    return gql`
      query {
        getCollection(args: { _id: "${id}" }) {
          _id
          title
          description
          thumbnail
          tags
          posts {
            _id
            title
            thumbnail
            readTime
            dateUpdated
            tags
          }
          dateCreated
          dateUpdated
        }
      }
    `;
  }
}

class AuthorQueryResolver {
  static collections(id: string): DocumentNode {
    return gql`
      {
        getUser(args: { _id: "${id}" }) {
          _id
          data {
            collections {
              _id
              title
              thumbnail
              dateUpdated
              tags
              posts {
                _id
              }
            }
          }
        }
      }
    `;
  }
  static info(id: string): DocumentNode {
    return gql`
      {
        getUser(args: { _id: "${id}" }) { 
          _id
          data {
            name
            bio
            profileImg
            coverImg
            stats {
              reach
              appreciations
            }
            memberOf {
              _id
              name
            }
            followers {
              _id
            }
            following {
              _id
            }
            posts {
              posts {
                _id
              }
            }
            socialLinks
          }
        }
      }
    `;
  }
  static user(id: string): DocumentNode {
    return gql`
      {
        getUser(args: { _id: "${id}" }) {
          _id
          data {
            posts {
              categories {
                name
                posts {
                  _id
                  title
                  thumbnail
                  readTime
                  dateUpdated
                  tags
                }
              }
            }
          }
        }
      }
    `;
  }
  static story(id: string): DocumentNode {
    return gql`
      {
        getUser(args: { _id: "${id}" }) {
          _id
          data {
            stories {
              _id
              content
            }
          }
        }
      }
    `;
  }
}

@Injectable({
  providedIn: "root",
})
export class StaticDataService {
  homeQuery: HomeQuery = {
    newRavels: gql`
      {
        getNewRavels {
          _id
          title
          thumbnail
          readTime
          dateUpdated
          tags
          credit {
            author {
              _id
              data {
                name
                profileImg
              }
            }
          }
        }
      }
    `,
    userRecommendations: gql`
      {
        getUserRecommendations {
          _id
          title
          thumbnail
          readTime
          dateUpdated
          tags
          credit {
            author {
              _id
              data {
                name
                profileImg
              }
            }
          }
        }
      }
    `,
  };
  trendingQuery: TrendingQuery = {
    trending: gql`
      {
        getTrending {
          _id
          tags
          categories {
            name
            posts {
              _id
              title
              thumbnail
              readTime
              dateUpdated
              tags
              credit {
                author {
                  _id
                  data {
                    name
                    profileImg
                  }
                }
              }
            }
          }
          creators {
            _id
            data {
              name
              profileImg
              coverImg
              posts {
                featuredPosts {
                  title
                  thumbnail
                }
              }
            }
          }
        }
      }
    `,
  };
  exploreQuery: ExploreQuery = {
    explore: gql`
      {
        getExplore {
          tags
          publications {
            name
            followers {
              _id
            }
            members {
              _id
            }
            featuredImg
          }
          creators {
            _id
            data {
              name
              followers {
                _id
              }
              profileImg
              coverImg
            }
          }
          posts {
            _id
            title
            thumbnail
            readTime
            dateUpdated
            tags
            credit {
              author {
                _id
                data {
                  name
                  profileImg
                }
              }
            }
          }
        }
      }
    `,
  };
  authorQuery: AuthorQuery = {
    collections: AuthorQueryResolver.collections,
    info: AuthorQueryResolver.info,
    user: AuthorQueryResolver.user,
    story: AuthorQueryResolver.story,
  };
  collection: CollectionQuery = {
    collection: Resolvers.collection,
  };
}
