const apiHost = 'https://bakesaleforgood.com'
export default {
  async fetchInitialDeals() {
    try {
      const response = await fetch(apiHost + '/api/deals');
      const responseJson = response.json();
      return responseJson;
    } catch(e) {
      console.log("API failed to fetch initial deals => ", e);
    }
  },
  async fetchMoreInfo(dealId) {
    try {
      const response = await fetch(apiHost + '/api/deals/' + dealId);
      const responseJson = response.json();
      return responseJson;
    } catch(e) {
      console.log("API failed to fetch more info => ", e);
    }
  }
}