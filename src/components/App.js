import React, { Component } from 'react'
import DealList from './DealList';
import DealDetail from './DealDetail';
import {View, Text, StyleSheet } from 'react-native';

import ajax from '../ajax';
export default class App extends Component {
  state = {
    dealsList: [],
    currentDealId: null,
  }
  async componentDidMount() {
    const dealsList = await ajax.fetchInitialDeals();
    this.setState({
      dealsList,
    });
    await console.log(this.state.dealsList);
  }
  setCurrentDealId = (dealId) => {
    this.setState({
      currentDealId: dealId
    })
  }
  currentDeal = () => {
    return this.state.dealsList.find(deal => deal.key === this.state.currentDealId);
  }
  render() {
    if (this.state.currentDealId !== null) {
      return  <DealDetail initialDeal={this.currentDeal()}/> 
    }
    if (this.state.dealsList.length > 0) {
      return <DealList deals={this.state.dealsList} onItemPress={this.setCurrentDealId}/>
    }
    return (
      <View style={styles.container}> 
        <Text style={styles.bakesale}>Bakesale</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bakesale: { 
    fontSize: 40,
  }
}) 
