import { updatePost } from '../../graphql/mutations';
import { userLocation } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

export const publishPageInfo = async (info) => {
    const getInfo = await API.graphql(
        graphqlOperation(userLocation, { user: 'nestlier', location: { eq: 'pageinfo' }  })
    );
    const input = getInfo.data.userLocation.items[0];
    input.value = JSON.stringify(info);
    delete input.updatedAt;
    delete input.createdAt;
    const post = await API.graphql(
        graphqlOperation(updatePost, { input } )
    );
    console.log(JSON.parse(post.data.updatePost.value));
    return JSON.parse(post.data.updatePost.value);
}