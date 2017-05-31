import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux';

/*
  This component displays the word Loading... whenever a page's data is being loaded through reduxAsyncConnect
*/
class Loading extends React.Component {
  state = {
    show: false
  };

  componentWillReceiveProps(nextProps) {
    // Show loading only ~1s after actual loading starts
    if (nextProps.show && !this.props.show) {
      this.timer = setTimeout(() => this.setState({ show: true }), 750);
    } else if (!nextProps.show && this.props.show) {
      this.timer && clearTimeout(this.timer);
      this.setState({
        show: false
      });
    }
  }

  render() {
    const { show } = this.state;

    return (
      <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
      >
        {show &&
          <div key="loading-box" className="loading-box">
            <FormattedMessage
              id="loadingBox.text"
              defaultMessage="Loading..."
            />
          </div>
        }
      </CSSTransitionGroup>
    );
  }
}
const MapToStateProps = ({ reduxAsyncConnect }) => {
    return {
        show: reduxAsyncConnect && reduxAsyncConnect.loaded === false
    };
};
export default connect(MapToStateProps)(Loading);