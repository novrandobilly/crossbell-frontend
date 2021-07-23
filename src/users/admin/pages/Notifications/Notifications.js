import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions';

import classes from './Notifications.module.css';

const Notifications = (props) => {
  const [adminNotifications, setAdminNotifications] = useState([]);
  const { getAdmin, admin } = props;
  useEffect(() => {
    const payload = {
      token: admin.token,
      userId: admin.userId,
    };
    const getCurrentAdmin = async () => {
      const res = await getAdmin(payload);
      if (res.admin.notifications)
        setAdminNotifications(res.admin.notifications);
    };
    getCurrentAdmin();
  }, [admin.token, admin.userId, getAdmin]);

  console.log(adminNotifications);

  return (
    <div className={classes.Container}>
      <div className={classes.ContainerFlex}>
        <div className={classes.HeaderPadding}>
          <div className={classes.Header}>
            <p>Notifikasi</p>
            <p>(dd/mm/yyyy)</p>
          </div>
        </div>
        <div className={classes.Content}>
          {adminNotifications?.map((notif, index) => (
            <div className={classes.NotificationBox} key={`notif-${index}`}>
              <p
                className={classes.Text}
                style={!notif.isOpen ? { fontWeight: 'bold' } : {}}
              >
                {notif.message}
              </p>
              <p>{moment(notif.date).format('DD/ MMM/ YY')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAdmin: (payload) => dispatch(actionCreators.getAdmin(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
