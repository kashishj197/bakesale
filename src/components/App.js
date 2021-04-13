import React, { Component } from 'react'
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';
import {View, Text, StyleSheet } from 'react-native';

import ajax from '../ajax';
export default class App extends Component {
  state = {
    dealsList: [],
    dealsFromSearch: [],
    currentDealId: null,
  }
  async componentDidMount() {
    const dealsList = await ajax.fetchInitialDeals();
    this.setState({
      dealsList,
    });
  }
  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchSearchDetails(searchTerm);
    }
    this.setState({ dealsFromSearch });
  }
  setCurrentDealId = (dealId) => {
    this.setState({
      currentDealId: dealId
    })
  }
  currentDeal = () => {
    return this.state.dealsList.find(deal => deal.key === this.state.currentDealId);
  }
  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    })
  }
  render() {
    if (this.state.currentDealId !== null) {
      return <DealDetail initialDeal={this.currentDeal()} onBack={this.unsetCurrentDeal}/> 
    }
    const dealsToDisplay = this.state.dealsFromSearch.length > 0 ?
      this.state.dealsFromSearch : this.state.dealsList;
    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals}/> 
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDealId}/>
        </View>
      )
    }
    return (
      <View style={[styles.container, styles.main]}> 
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
  main: {
    marginTop: 5,
  },
  bakesale: { 
    fontSize: 40,
  }
}) 
