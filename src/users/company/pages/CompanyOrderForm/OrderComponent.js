import React from 'react';

import classes from './OrderComponent.module.css';

const OrderComponent = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.OrderCard}>
        <div className={classes.CardHolder}>
          <div>
            <div
              className={classes.CardHeader}
              style={
                props.title === 'Bronze'
                  ? { backgroundColor: '#ad8a56' }
                  : props.title === 'Silver'
                  ? { backgroundColor: '#a9a9a9' }
                  : props.title === 'Gold'
                  ? { backgroundColor: '#d4af47' }
                  : { backgroundColor: 'rgba(58, 81, 153, 1)' }
              }
            >
              <p className={classes.Title}>{props.title}</p>
              <div className={classes.Perks}>
                <p className={classes.Price}>
                  IDR {props.price.toLocaleString()}/ slot
                </p>
                <p className={classes.Slot}>{props.slot}</p>
              </div>
            </div>
            <div
              className={classes.CardContent}
              style={
                props.title === 'Bronze'
                  ? { backgroundColor: '#ad8a5640' }
                  : props.title === 'Silver'
                  ? { backgroundColor: '#a9a9a940' }
                  : props.title === 'Gold'
                  ? { backgroundColor: '#d4af4740' }
                  : { backgroundColor: 'rgba(58, 81, 153, 0.2)' }
              }
            >
              {props.perks ? (
                <ul>
                  {props.perks.map((perk, i) => {
                    return <li key={i}> {perk}</li>;
                  })}
                </ul>
              ) : (
                <ul>
                  <li>Harga normal tanpa diskon</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
