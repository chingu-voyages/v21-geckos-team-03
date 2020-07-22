import React from 'react';
import firebase from 'firebase';

class CreateListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    return this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const firebaseConfig = {
      apiKey: 'AIzaSyAoHYf5Y18V0KtgA4KhsVmq097I7HpFDIQ',
      authDomain: 'geckos-03-movie-app.firebaseapp.com',
      databaseURL: 'https://geckos-03-movie-app.firebaseio.com',
      projectId: 'geckos-03-movie-app',
      storageBucket: 'geckos-03-movie-app.appspot.com',
      messagingSenderId: '309894013278',
      appId: '1:309894013278:web:963efac864c127013eefcf',
      measurementId: 'G-0XTZXCRDSS',
    };

    // make sure firebase is initialized only once
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();
    const ref = database.ref('lists');

    ref.push(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="input-list-name">
            List Name:
            <input
              type="text"
              name="input-list-name"
              id="input-list-name"
              value=""
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>
      </div>
    );
  }
}

export default CreateListForm;
