module.exports = {
  success: (data) => {
    const resData = {
      status: 'ok',
      message: 'success',
    };

    if (typeof data !== 'undefined') {
      resData.data = data;
    }

    return resData;
  },

  failed: (message, data) => {
    const resData = {
      status: 'failed',
      message,
    };

    if (typeof data !== 'undefined') {
      resData.data = data;
    }

    return resData;
  },
};
