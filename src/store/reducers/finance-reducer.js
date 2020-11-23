const initJobState = {
  financial: [
    {
      orderId: "SSS_O1",
      companyId: "SSS",
      orders: [
        { package: "Regular", slot: 30, price: 20000 },
        { package: "Premium", slot: 40, price: 18000 },
        { package: "Lifetime", slot: 60, price: 15000 },
      ],
      status: "Active",
    },
    {
      orderId: "SSS_O2",
      companyId: "SSS",
      package: "Regular",
      status: "Pending",
      slot: 30,
      price: 20000,
    },
    {
      orderId: "RCN_O1",
      companyId: "RCN",
      package: "Premium",
      status: "Expired",
      slot: 40,
      price: 18000,
    },
    {
      orderId: "RCN_O2",
      companyId: "RCN",
      package: "Premium",
      status: "Cancel",
      slot: 40,
      price: 18000,
    },
    {
      orderId: "IDN_O1",
      companyId: "IDN",
      package: "Lifetime",
      status: "Expired",
      slot: 60,
      price: 15000,
    },
    {
      orderId: "IDN_O2",
      companyId: "IDN",
      package: "Lifetime",
      status: "Active",
      slot: 60,
      price: 15000,
    },
  ],
};

const financeReducers = (state = initJobState) => {
  return state;
};

export default financeReducers;
