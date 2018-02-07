import gql from 'graphql-tag';

export default apolloClient => {
  return apolloClient.query({
    query: gql`
      query {
        viewer {
          id
          userType
          firstName
          familyName
          email
          lastLogin
        }
      }
    `
  })
    .then(({ data }) => {
      return data.viewer;
    })
    .catch(console.log);
};
