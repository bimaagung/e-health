const resData = require('../helper/response');

module.exports = {
  addAvailableSchedule: async (req, res, next) => {
    try {
      const schedule = {
        doctorId: req.user.id,
        dayNameId: req.body.dayNameId,
        time: null,
        // newTime: req.body.newTime,
      };

      const result = await req.availableScheduleUC.addAvailableSchedule(schedule);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
  getAllAvailableScheduleByDoctorId: async (req, res, next) => {
    try {
      const { doctorId } = req.query;
      const result = await req.availableScheduleUC.getAllAvailableScheduleByDoctorId(doctorId);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

};
