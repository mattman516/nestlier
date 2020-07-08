import { createPost } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

export const createContent = async (location, name) => {
    const pageinfo = await API.graphql(
        graphqlOperation(createPost, { input: { user: 'nestlier', location: `${location}|${name}` }})
    );
    const data = pageinfo.data.createPost;
    return data;
}