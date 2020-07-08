import { updatePost } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

export const publishContent = async (input) => {
    delete input.updatedAt;
    delete input.createdAt;
    const post = await API.graphql(
        graphqlOperation(updatePost, { input } )
    );
    return post.data.updatePost;
}