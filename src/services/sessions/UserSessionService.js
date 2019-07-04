export default {
  getUserProfile() {
    return this.getUserSession().userProfile;
  },
  getFirstName() {
    return this.getUserProfile().firstname;
  },
  getlastName() {
    return this.getUserProfile().lastname;
  },
  getUserId() {
    return this.getUserProfile().id;
  }
};
