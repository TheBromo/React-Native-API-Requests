import React from 'react';
import Requests from './requests.js'
import { FlatList, ActivityIndicator, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    Requests.loginAsUser("","").then(data => {
      this.setState({
        isLoading: false,
        dataSource: data.succes,
      });
    }).catch(error => console.log('Error:', error));

    /*
    Requests.postData().then(movies => {
      this.setState({
        isLoading: false,
        dataSource: movies,
      });
    });*/
  }



  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text>{item.id}. {item.title}, {item.releaseYear}</Text>}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
};
