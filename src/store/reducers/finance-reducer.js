const initJobState = {
  financial: [
    // {
    //   orderId: "SSS_O1",
    //   companyId: "SSS",
    //   orders: [
    //     { package: "Regular", slot: 30, price: 20000 },
    //     { package: "Premium", slot: 40, price: 18000 },
    //     { package: "Lifetime", slot: 60, price: 15000 },
    //   ],
    //   createdAt: "",
    //   approvetAt: "",
    //   status: "Active",
    // },

    //>>>>>>>>>>>> template <<<<<<<<<<<<<<<
    {
      orderId: "SSS_O2",
      invoiceId: "5dAO9244gAhKSA",
      companyId: "SSS",
      packageName: "Silver",
      status: "Pending",
      createdAt: "12/04/2020",
      approvetAt: "12/05/2020",
      dueDate: "2 minggu dari createdAt",
      slot: 2,
      packagePrice: 35000,
      amount: 3,
      totalPrice: null,
    },
    //>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<

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
