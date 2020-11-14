const initJobState = {
  financial: [
    {
      orderId: "SSS_O1",
      companyId: "SSS",
      package: "Regular",
      status: "Active",
    },
    {
      orderId: "SSS_O2",
      companyId: "SSS",
      package: "Regular",
      status: "Pending",
    },
    {
      orderId: "RCN_O1",
      companyId: "RCN",
      package: "Premium",
      status: "Expired",
    },
    {
      orderId: "RCN_O2",
      companyId: "RCN",
      package: "Premium",
      status: "Cancel",
    },
    {
      orderId: "IDN_O1",
      companyId: "IDN",
      package: "Lifetime",
      status: "Expired",
    },
    {
      orderId: "IDN_O2",
      companyId: "IDN",
      package: "Lifetime",
      status: "Active",
    },
  ],
};

const financeReducers = (state = initJobState) => {
  return state;
};

export default financeReducers;
