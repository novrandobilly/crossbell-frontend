import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../../../../store/actions/index";
import SpinnerCircle from "../../../../shared/UI_Element/Spinner/SpinnerCircle";
import CompanyMap from "../Components/CompanyMap";

const CompanyDetails = (props) => {
  const { companyid } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getOneCompany } = props;
  useEffect(() => {
    getOneCompany(companyid).then((res) => {
      setData(res.company);
      setIsLoading(false);
    });
  }, [getOneCompany, setIsLoading, companyid]);

  if (!isLoading) {
    if (data) {
      return <CompanyMap items={data} />;
    } else {
      return (
        <div className="centerGlobal">
          <h2>No Company Available with that ID</h2>
        </div>
      );
    }
  } else {
    return <SpinnerCircle />;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneCompany: (data) => dispatch(actionCreators.getOneCompany(data)),
  };
};

export default connect(null, mapDispatchToProps)(CompanyDetails);
