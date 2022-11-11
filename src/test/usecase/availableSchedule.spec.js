const AviableScheduleUseCase = require("../../usecase/availableSchedule");
const aviableScheduleUseMock = require("../mock/aviableSchedule.mock");
const doctorValidationMock = require("../mock/docterValidation.mock");
const has = require('lodash');

let mockAvailableScheduleReturn,
  mockDoctorValidationReturn = {};
let avilableScheduleUC = null;

describe("available schedule test", () => {
  beforeEach(() => {
    mockAvailableScheduleReturn = {
      getAllAvailableScheduleByDoctorValidationId: jest
        .fn()
        .mockReturnValue([aviableScheduleUseMock.aviableSchedule]),
      addAvailableSchedule: jest
        .fn()
        .mockReturnValue(aviableScheduleUseMock.aviableSchedule),
    };

    mockDoctorValidationReturn = {
      getDoctorValdationByUserId: jest
        .fn()
        .mockReturnValue(doctorValidationMock.doctorValidation),
    };
    
    mockHasReturn = {
      has: jest.mock('lodash')
    }

    avilableScheduleUC = new AviableScheduleUseCase(
      mockAvailableScheduleReturn,
      mockDoctorValidationReturn,
      mockHasReturn
    );
  });
  describe("add schedule availableSchedule test", () => {
    let aviableSchedule = {
      id: 23,
      doctorValidationId: 10,
      doctorId: 5,
      dayNameId: 1,
      time: "2022-09-07 09:36:06.000 +0700",
      createdAt: "2022-09-07 09:36:06.000 +0700",
      updatedAt: "2022-09-07 09:36:08.000 +0700",
    };
    test("should isSuccess = true, statusCode = 200, and data is true", async () => {
      mockDoctorValidationReturn.getAllAvailableScheduleByDoctorValidationId = jest.fn().mockReturnValue({
        id:10,
        status: 'COMPLETED',
        adminId: 1,
        createdAt: '2022-09-07 09:36:06.000 +0700',
        updatedAt: '2022-09-07 09:36:08.000 +0700'
      })
      avilableScheduleUC = new AviableScheduleUseCase(mockAvailableScheduleReturn, mockDoctorValidationReturn, mockHasReturn)
      let res = await avilableScheduleUC.addAvailableSchedule(aviableSchedule);

      expect(res.reason).toEqual('');
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
    });
  });
});
