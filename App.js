import React from 'react';
import Requests from './requests.js'
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    let token;
    /*Requests.registerNewUser("testUser", "frickoff@christ.com", "password").then(response => {
      this.setState({
        isLoading: false,
        dataSource: response.data.token,
      });
      token = response.data.token;
    }).catch(error => console.log('Error:', error));
*/

Requests.queryDistricts("Akiva",8120).then(r => {
      console.log(r);
      this.setState({
        isLoading: false,
        dataSource: r,
      });
    })

    Requests.getLocationsForDistrict("5ca1b7714f07a5333d5dc2e1").then(r => {
      console.log(r);
      this.setState({
        isLoading: false,
        dataSource: r,
      });
    })
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
        <Text>{JSON.stringify(this.state.dataSource)}</Text>
      </View>
    );
  }
};
