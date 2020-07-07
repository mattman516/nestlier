import { userLocation } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

export const getContent = async (name, location) => {
    console.log(`${location}|${name}`);
    return (await API.graphql(
        graphqlOperation(userLocation, { user: 'nestlier', location: { eq: `${location}|${name}` }  })
    )).data.userLocation.items[0];
}