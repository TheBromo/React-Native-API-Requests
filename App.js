import React from 'react';
import Requests from './requests.js'
import { FlatList, ActivityIndicator, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    Requests.getAllDistricts().then(data => {
      this.setState({
        isLoading: false,
        dataSource: data.data,
      });
    }).catch(error => console.log('Error:', error));
  

    /*Requests.loginAsUser("this","is test").then(data => {
      this.setState({
        isLoading: false,
        dataSource: data.succes,
      });
    }).catch(error => console.log('Error:', error));
  */}



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
