import React, { Fragment } from "react";
import { connect } from "react-redux";

const Alert = ({ alert }) => {
  return (
    <Fragment>
      {alert ? (
        <div className={`app-alert app-alert-${alert.type}`}>
          {alert.content}
        </div>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { alert: state.alert };
};
export default connect(mapStateToProps)(Alert);
