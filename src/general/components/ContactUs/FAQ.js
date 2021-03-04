import React from 'react';
import { useParams } from 'react-router-dom';
import Faq from '../../../store/reducers/FAQ-reducers';

import classes from './FAQ.module.css';

const FAQ = (props) => {
  const { faqId } = useParams();
  const Faqs = Faq.FAQS.find((state) => state.faqId === faqId);

  let content = (
    <div className={classes.ErrorPage}>
      {' '}
      Tidak ada data dengan id {`${faqId}`} ditemukan
    </div>
  );

  if (Faqs) {
    content = (
      <div className={classes.Container}>
        <h2>{Faqs.Title}</h2>
        {Faqs.Questions.map((question, i) => {
          return (
            <div className={classes.Content} key={i}>
              <div>
                <h3>Q: </h3>
                <p>{question}</p>
              </div>

              <div>
                <h3>A: </h3>

                {Faqs.Answers.slice(i, i + 1).map((Answer, index) => {
                  return <p key={index}>{Answer}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return content;
};

export default FAQ;
