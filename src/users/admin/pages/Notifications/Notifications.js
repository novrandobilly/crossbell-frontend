import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions';

const Notifications = props => {
  const [adminNotifications, setAdminNotifications] = useState([]);
  const { getAdmin, admin } = props;
  useEffect(() => {
    const payload = {
      token: admin.token,
      userId: admin.userId,
    };
    const getCurrentAdmin = async () => {
      const res = await getAdmin(payload);
      if (res.admin.notifications) setAdminNotifications(res.admin.notifications);
    };
    getCurrentAdmin();
  }, [admin.token, admin.userId, getAdmin]);

  return (
    <div>
      {adminNotifications?.map((notif, index) => (
        <p key={`notif-${index}`}>{notif.message}</p>
      ))}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAdmin: payload => dispatch(actionCreators.getAdmin(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
