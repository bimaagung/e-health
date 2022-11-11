const AviableScheduleUseCase = require("../../usecase/availableSchedule");
const aviableScheduleUseMock = require("../mock/aviableSchedule.mock");


let mockAvailableScheduleReturn = {};
let avilableScheduleUC = null;

describe("available schedule test", () => {
  beforeEach(() => {
    mockAvailableScheduleReturn = {
      getAllScheduleByDoctorId: jest
        .fn()
        .mockReturnValue([aviableScheduleUseMock.aviableSchedule]),
      addAvailableSchedule: jest
        .fn()
        .mockReturnValue(aviableScheduleUseMock.aviableSchedule),
    };

    avilableScheduleUC = new AviableScheduleUseCase(mockAvailableScheduleReturn);
  });
  describe("get all schedule availableSchedule test", () => {
    test("should isSuccess = true, statusCode = 200, and data is true", async () => {
    
      let res = await avilableScheduleUC.getAllAvailableScheduleByDoctorId()
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(typeof res.data === 'object').toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
      expect(res.data[0]).toHaveProperty('id');
      expect(res.data[0]).toHaveProperty('doctorId');
      expect(res.data[0]).toHaveProperty('dayNameId');
      expect(res.data[0]).toHaveProperty('time');
    });
  });
  describe("add schedule availableSchedule test", () => {
    test("should isSuccess = true, statusCode = 200, and data is true", async () => {
    let aviableSchedule = {
        id: 3,
        medicalSpecialistId: 5,
        doctorValidationId: 1,
        hospitalId: 1,
        createdAt: '2022-09-07 09:36:06.000 +0700',
        updatedAt: '2022-09-07 09:36:08.000 +0700'
    }
      let res = await avilableScheduleUC.addAvailableSchedule(aviableSchedule)
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(201);
      expect(typeof res.data === 'object').toBeTruthy();
      expect(res.data).toHaveProperty('id');
      expect(res.data).toHaveProperty('doctorId');
      expect(res.data).toHaveProperty('dayNameId');
      expect(res.data).toHaveProperty('time');
    });
  });

});
