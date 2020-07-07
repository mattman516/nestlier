import { userLocation } from '../../graphql/queries';
import { createPost } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

export const getContent = async (name, location) => {
    return (await API.graphql(
        graphqlOperation(userLocation, { user: 'test1', location: `${location}|${name}` })
    )).data.listPosts.items[0];
}