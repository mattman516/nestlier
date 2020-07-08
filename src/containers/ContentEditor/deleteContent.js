import { deletePost } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

export const deleteContent = async (id) => {
    return (await API.graphql(
        graphqlOperation(deletePost, { input: { id }})
    ));
}