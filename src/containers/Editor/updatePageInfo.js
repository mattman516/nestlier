import { updatePost } from '../../graphql/mutations';
import { userLocation } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

export const publishPageInfo = async (info, location) => {
    const getInfo = await API.graphql(
        graphqlOperation(userLocation, { user: 'nestlier', location: { eq: 'pageinfo' }  })
    );
    const input = getInfo.data.userLocation.items[0];
    input.value = JSON.parse(input.value);
    input.value.pages[location] = info;
    input.value = JSON.stringify(input.value);
    delete input.updatedAt;
    delete input.createdAt;
    const post = await API.graphql(
        graphqlOperation(updatePost, { input } )
    );
    return post.data.updatePost;
}