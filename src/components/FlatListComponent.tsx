import React from 'react';
import {Data, Story} from '../types';
import {
  FlatList,
  ListRenderItem,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import NewsOrComment from './NewsOrComment';
import {paginate} from '../helpers/helpers';
import {Loader} from './Loader';
import {FadeInView} from './FadeInView';

type State = {
  data: Array<Data>; // Combined type for Stories and comments
  page: number; // how many single items should be displayed in one pagination
  loading: boolean; // used for loading effect
};

type Props = {
  ids: Array<number>; // All ids which are used to get story or comments data from hacker news api.
  story?: Story; // when using comments ids which are inside story.kids to get comments from hackers new api
};

/**
 * FlatList Component which is a pure component, and only render again when props or state
 * changes. This is way our Flat list will optimized.
 */

class FlatListComponent extends React.PureComponent<Props, State> {
  _isAsyncActive = true; // clean up Api calls

  state: State = {
    data: [],
    page: 5,
    loading: true,
  };

  // display header only on the home screen flat list
  _renderHeader = () => {
    const {story} = this.props;
    if (typeof story === 'undefined') {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#023413',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'OpenSans-Bold',
              paddingVertical: 20,
              paddingHorizontal: 20,
              color: '#fff',
            }}>
            {'Hacker News Client'}
          </Text>
        </View>
      );
    }
    return <React.Fragment />;
  };

  _renderFooter = () => {
    const {loading} = this.state;
    if (loading) {
      return <ActivityIndicator color={'#333'} size={'large'} />;
    } else {
      return <React.Fragment />;
    }
  };

  _getDataByIds = async (ids: Array<number>): Promise<Array<Data>> => {
    let responses: Array<Data> = [];

    for (let i = 0; i < ids.length; i++) {
      const response: Response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json`,
      );

      const json = await response.json();

      responses.push(json);
    }
    return responses;
  };

  _renderItem: ListRenderItem<Data> = ({item}) => {
    return <NewsOrComment data={item} />;
  };

  _keyExtractor = (item: Data) => {
    return `${item.id}}`;
  };

  _onEndReach = () => {
    const {data, page} = this.state;

    const {ids, story} = this.props;

    if (ids.length > data.length) {
      // When getting stories
      this._loadMoreStories();
    } else if (typeof story !== 'undefined') {
      if (story.kids.length > page) {
        // when getting comments
        this._loadMoreStories();
      } else {
        this.setState({
          loading: false,
        });
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  };
  _loadMoreStories = () => {
    const {page, data} = this.state;

    const {ids, story} = this.props;

    let storyOrCommentIds: Array<number>;

    if (typeof story === 'undefined') {
      storyOrCommentIds = ids;
    } else {
      storyOrCommentIds = story.kids;
    }

    const nextIds = paginate(storyOrCommentIds, data, page);

    this._getDataByIds(nextIds).then(promises => {
      Promise.all(promises).then(json => {
        const mergedData = data.concat(...json);
        this.setState({
          data: mergedData,
          page: page + 5,
        });
      });
    });
  };

  componentDidMount() {
    if (this._isAsyncActive) {
      this._loadMoreStories();
    }
  }

  componentWillUnmount() {
    this._isAsyncActive = false;
  }

  render() {
    const {data} = this.state;
    return data.length > 0 ? (
      <FadeInView>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooter}
          ListHeaderComponent={this._renderHeader}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReach}
          onEndReachedThreshold={0.01}
        />
      </FadeInView>
    ) : (
      <Loader />
    );
  }
}

export default FlatListComponent;
