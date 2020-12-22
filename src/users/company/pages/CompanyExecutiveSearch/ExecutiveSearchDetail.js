import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
// import moment from "moment";

import * as actionCreators from "../../../../store/actions/index";

import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import classes from "./ExecutiveSearchDetail.module.css";

const ExecutiveSearchDetail = (props) => {
  const { orderid } = useParams();

  const [dataES, setDataES] = useState();

  const { getOrderInvoice } = props;

  useEffect(() => {
    const token = props.auth.token;
    if (token) {
      const dataES = {
        token: token,
        orderId: orderid,
      };

      getOrderInvoice(dataES)
        .then((res) => {
          console.log(res);
          setDataES(res.order);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getOrderInvoice, orderid, props.auth]);

  let content = <SpinnerCircle />;

  // if (!props.isLoading && data.length < 1) {
  //   content = <h1>tidak ada order untuk saat ini</h1>;
  // }

  if (!props.isLoading && dataES) {
    content = (
      <div className={classes.Container}>
        <div className={classes.PageContainer}>
          <div className={classes.PageHeader}>
            <p>{dataES.companyId.companyName}</p>
            <p>{dataES.companyId.emailRecipient}</p>
          </div>
          <div className={classes.DetailContainer}>
            <div className={classes.DescHolder}>
              <p className={classes.DescLabel}>Posisi</p>
              <p>{dataES.positionLevel}</p>
            </div>

            <div className={classes.DescHolder}>
              <p className={classes.DescLabel}>Pengalaman</p>
              <p>{dataES.experience}</p>
            </div>

            <div className={classes.DescHolder}>
              <p className={classes.DescLabel}>Bidang keahlian</p>
              <p>{dataES.expertise}</p>
            </div>

            <div className={classes.DescHolder}>
              <p className={classes.DescLabel}>Kisaran Gaji</p>
              <p>
                IDR {dataES.salaryRange.min} - IDR {dataES.salaryRange.max}
              </p>
            </div>

            <div className={classes.DescHolder}>
              <p className={classes.DescLabel}>Tugas utama</p>
              <p>{dataES.mainTask}</p>
            </div>

            <div className={classes.DescHolder}>
              <p className={classes.DescLabel}>Tanggung jawab</p>
              <p>{dataES.responsibility}</p>
            </div>

            <div className={classes.DescHolder}>
              <p className={classes.DescLabel}>Wewenang</p>
              <p>{dataES.authority}</p>
            </div>

            <div className={classes.DescHolder}>
              <p className={classes.DescLabel}>Catatan tambahan</p>
              <p>{dataES.specification}</p>
            </div>
          </div>
        </div>
        <div className={classes.InputContainer}>
          <h2 style={{ fontFamily: "lucida handwriting" }}>candidate list</h2>
          <div className={classes.CadidateContainer}>
            {dataES.candidates.map((can, i) => {
              return (
                <div className={classes.CandidateCard} key={i}>
                  <div className={classes.CandidateHead}>
                    <p>{can.candidateName}</p>

                    <div className={classes.DropDown}>
                      <p
                        style={
                          can.status === "Open"
                            ? { color: "green" }
                            : { color: "gray" }
                        }
                      >
                        {can.status}
                      </p>
                    </div>
                  </div>
                  <div className={classes.CandidateBody}>
                    <div className={classes.CandidateContact}>
                      <p>{can.candidateEmail}</p>
                      <p>{can.candidateContact}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoading: state.finance.isLoading,
    error: state.finance.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderInvoice: (data) => dispatch(actionCreators.getOrderInvoice(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExecutiveSearchDetail);
