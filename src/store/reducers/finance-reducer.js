import * as actionTypes from "../actions/actions";
const initJobState = {
  financial: [
    //>>>>>>>>>>>> template <<<<<<<<<<<<<<<
    {
      orderId: "SSS_O1",
      invoiceId: "5dAO9244gAhKSA",
      companyId: "5fc7703579182d0c786cc17c",
      packageName: "silver",
      status: "expired",
      createdAt: "12/04/2020",
      approvetAt: "12/05/2020",
      dueDate: 0,
      slot: 2, //ilang
      packagePrice: 35000, //ilang
      amount: 3,
      totalPrice: null,
    },
    {
      orderId: "SSS_O2",
      invoiceId: "5dAO9244gAhKSA",
      companyId: "5fc7703579182d0c786cc17c",
      packageName: "gold",
      status: "paid",
      createdAt: "12/04/2020",
      approvetAt: "12/05/2020",
      dueDate: 0,
      slot: 2,
      packagePrice: 35000,
      amount: 3,
      totalPrice: null,
    },
    {
      orderId: "SSS_O3",
      invoiceId: "5dAO9244gAhKSA",
      companyId: "5fc7703579182d0c786cc17c",
      packageName: "silver",
      status: "pending",
      createdAt: "12/04/2020",
      approvetAt: "12/05/2020",
      dueDate: 14,
      slot: 2,
      packagePrice: 35000,
      amount: 3,
      totalPrice: null,
    },
    {
      orderId: "SSS_O4",
      invoiceId: "5dAO9244gAhKSA",
      companyId: "5fc7703579182d0c786cc17c",
      packageName: "silver",
      status: "pending",
      createdAt: "12/04/2020",
      approvetAt: "12/05/2020",
      dueDate: 7,
      slot: 2,
      packagePrice: 35000,
      amount: 3,
      totalPrice: null,
    },
    {
      orderId: "SSS_O5",
      invoiceId: "5dAO9244gAhKSA",
      companyId: "5fc7703579182d0c786cc17c",
      packageName: "silver",
      status: "pending",
      createdAt: "12/04/2020",
      approvetAt: "12/05/2020",
      dueDate: 1,
      slot: 2,
      packagePrice: 35000,
      amount: 3,
      totalPrice: null,
    },
    //>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<
  ],
};

const financeReducers = (state = initJobState, action) => {
  switch (action.type) {
    case actionTypes.CREATEORDER: {
      const financeArray = {
        orderId: action.payload.orderId,
        invoiceId: action.payload.invoiceId,
        companyId: action.payload.companyId,
        packageName: action.payload.packageName,
        status: action.payload.status,
        createdAt: action.payload.createdAt,
        approvetAt: null,
        dueDate: action.payload.dueDate,
        slot: action.payload.slot,
        packagePrice: action.payload.packagePrice,
        amount: action.payload.amount,
        totalPrice: action.payload.totalPrice,
      };
      console.log(state.financial);
      return {
        ...state,
        financial: state.financial.concat(financeArray),
      };
    }

    default:
      return state;
  }
};

export default financeReducers;
