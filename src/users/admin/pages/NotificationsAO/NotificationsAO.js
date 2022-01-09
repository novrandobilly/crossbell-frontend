import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../../../store/actions/index';

import styles from './NotificationsAO.module.scss';

const NotificationsAO = ({
  admin,
  auth,
  notif,
  getAdminNotifications,
  readNotification,
  getCompanyNotifications,
  readNotificationCOM,
}) => {
  // console.log(notifications);
  const { notifications } = notif;

  const readNotificationHandler = async (e, notificationId) => {
    if (admin.isAdmin) {
      const payload = {
        token: admin.token,
        adminId: admin.userId,
        notificationId,
      };
      try {
        const res = await readNotification(payload);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      getAdminNotifications(payload).catch((err) => console.log(err));
    }

    if (auth.isCompany) {
      const payload = {
        token: auth.token,
        companyId: auth.userId,
        notificationId,
      };
      try {
        const res = await readNotificationCOM(payload);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      getCompanyNotifications(payload).catch((err) => console.log(err));
    }
  };

  return (
    <ul className={styles.Container}>
      <li className={styles.NotifItem}>
        <p>No</p>
        <p>Title</p>
        <p>Content</p>
        <p>Action</p>
        <p>Date</p>
        <p></p>
      </li>
      {notifications.length &&
        notifications
          .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
          .map((notif, index) => {
            let read = false;
            if (admin.isAdmin) read = notif.isOpened?.some((id) => id.toString() === admin.userId.toString());
            if (auth.isCompany) read = notif.isOpened?.some((id) => id.toString() === auth.userId?.toString());
            return (
              <li key={`admin-notif-${index}`} className={`${styles.NotifItem} ${!read && styles.Unread}`}>
                <p>{index + 1}</p>
                <p>{notif.header}</p>
                <p>{notif.content}</p>
                <p>{notif.action || ''}</p>
                <p>{moment(notif.dateCreated).format('MMM Do, YYYY')}</p>
                <button type='button' onClick={(e) => readNotificationHandler(e, notif._id)}>
                  Mark as read
                </button>
              </li>
            );
          })}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
    auth: state.auth,
    notif: state.notification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readNotification: (payload) => dispatch(actionCreators.readNotification(payload)),
    readNotificationCOM: (payload) => dispatch(actionCreators.readNotificationCOM(payload)),
    getAdminNotifications: (payload) => dispatch(actionCreators.getAdminNotifications(payload)),
    getCompanyNotifications: (payload) => dispatch(actionCreators.getCompanyNotifications(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsAO);
