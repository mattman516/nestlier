import { userLocation } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

export const getPageInfo = async () => {
    const pageinfo = await API.graphql(
        graphqlOperation(userLocation, { user: 'nestlier', location: { eq: 'pageinfo' }  })
    );
    const data = pageinfo.data.userLocation.items[0].value;
    return JSON.parse(data);
}