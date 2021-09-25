import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../../../store/actions';
import * as actionTypes from '../../../../store/actions/actions';

import SpinnerCircle from '../../../../shared/UI_Element/Spinner/SpinnerCircle';

import classes from './Notifications.module.css';

const Notifications = props => {
  const [adminNotifications, setAdminNotifications] = useState([]);
  const { getAdmin, admin, updateNotification } = props;

  useEffect(() => {
    const payload = {
      token: admin.token,
      userId: admin.userId,
    };
    const getCurrentAdmin = async () => {
      const res = await getAdmin(payload);
      if (res?.admin?.notifications) {
        setAdminNotifications(res.admin.notifications);
        const newNotif = res.admin.notifications.filter(notif => {
          return notif.isOpened === false;
        });
        updateNotification(newNotif);
      }
    };
    getCurrentAdmin();
  }, [admin.token, admin.userId, getAdmin, updateNotification]);

  const openNotification = async notifId => {
    const payload = {
      token: admin.token,
      userId: admin.userId,
      notificationId: notifId,
    };

    try {
      const response = await props.notificationUpdate(payload);

      if (!response) {
        throw new Error('failed to fetch admin notification');
      }

      setAdminNotifications(prevState => {
        const tempData = [...prevState];
        for (var i = 0; i < tempData.length; i++) {
          if (tempData[i]._id === notifId) {
            tempData[i].isOpened = true;
          }
        }
        return tempData;
      });

      const notificationCount = adminNotifications.filter(adm => {
        return adm.isOpened === false;
      });

      localStorage.setItem('notificationCount', notificationCount.length);
    } catch (err) {
      console.log(err);
    }
  };

  let content = <SpinnerCircle />;

  if (!props.admin.isLoading && adminNotifications) {
    content = (
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
              <div className={classes.NotificationBox} key={`notif-${index}`} onClick={() => openNotification(notif.id)}>
                <p className={classes.Text} style={!notif.isOpened ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>
                  {notif.message}
                </p>
                <p>{moment(notif.date).format('DD/ MMM/ YY')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

const mapStateToProps = state => {
  return {
    admin: state.admin,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateNotification: payload => dispatch({ type: actionTypes.ADMINNOTIFICATIONUPDATE, payload }),
    getAdmin: payload => dispatch(actionCreators.getAdmin(payload)),
    notificationUpdate: payload => dispatch(actionCreators.notificationUpdate(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
