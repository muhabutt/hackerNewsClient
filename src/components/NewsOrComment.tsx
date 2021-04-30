import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Data} from '../types';
import {capitalize} from '../helpers/helpers';
import {useNavigation} from '@react-navigation/native';
import {decode} from 'html-entities';

type Props = {
  data?: Data;
};

const NewsOrComment: React.FC<Props> = ({data}) => {
  const navigation = useNavigation();

  const readComments = () => {
    navigation.navigate('Comment', {
      story: data,
    });
  };
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'column',
      }}>
      {/*news section*/}
      {typeof data !== 'undefined' && data.type === 'story' ? (
        <View>
          {data.title ? (
            <Text
              style={{
                fontSize: 15,
                paddingVertical: 5,
                color: '#333',
                fontFamily: 'OpenSans-BoldItalic',
              }}>
              {data.title}
            </Text>
          ) : (
            <React.Fragment />
          )}
          {data.by ? (
            <Text
              style={{
                fontSize: 12,
                paddingVertical: 5,
                color: '#333',
                fontFamily: 'OpenSans-Regular',
              }}>
              {`${capitalize(data.type)} author: ${data.by}`}
            </Text>
          ) : (
            <React.Fragment />
          )}

          {data.time ? (
            <Text
              style={{
                fontSize: 12,
                paddingVertical: 5,
                color: '#333',
                fontFamily: 'OpenSans-Light',
              }}>
              {`Published on: ${new Date(data.time * 1000)}`}
            </Text>
          ) : (
            <React.Fragment />
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {typeof data.url !== 'undefined' && data.url ? (
              <TouchableOpacity
                style={{
                  flex: 50,
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  typeof data.url !== 'undefined'
                    ? Linking.openURL(data.url).catch(error => {
                        console.log('error in opening the url', error);
                      })
                    : null;
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 10,
                    color: '#333',
                    fontFamily: 'OpenSans-Bold',
                  }}>
                  {'Read more'}
                </Text>
              </TouchableOpacity>
            ) : (
              <React.Fragment />
            )}
            {data.kids.length > 0 ? (
              <TouchableOpacity
                style={{
                  flex: 50,
                  marginVertical: 1,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                }}
                onPress={() => {
                  readComments();
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    paddingVertical: 10,
                    color: '#333',
                    fontFamily: 'OpenSans-Bold',
                  }}>
                  {'Read Comments'}
                </Text>
              </TouchableOpacity>
            ) : (
              <React.Fragment />
            )}
          </View>
        </View>
      ) : (
        <React.Fragment />
      )}
      {/*comment section*/}
      {typeof data !== 'undefined' && data.type === 'comment' ? (
        <View
          key={data.id}
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            padding: 10,
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flex: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 60 / 2,
                borderWidth: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#333',
                  fontFamily: 'OpenSans-Bold',
                }}>
                {`${data.by}`}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 80,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#333',
                fontFamily: 'OpenSans-Regular',
              }}>
              {decode(data.text)}
            </Text>
          </View>
        </View>
      ) : (
        <React.Fragment />
      )}
    </View>
  );
};

const propsAreEqual = (
  prevProps: Readonly<React.PropsWithChildren<Props>>,
  nextProps: Readonly<React.PropsWithChildren<Props>>,
) => {
  return prevProps.data?.id === nextProps.data?.id;
};

export default React.memo(NewsOrComment, propsAreEqual);
