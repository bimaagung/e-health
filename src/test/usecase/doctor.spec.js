const DoctorUseCase = require("../../usecase/doctor");
const doctorMock = require("../mock/doctor.mock");
const doctorValidationMock = require("../mock/docterValidation.mock");
const userMock = require("../mock/user.mock")
const medicalSpecialistMock = require("../mock/medicalSpecialist.mock")
const hospitalMock = require("../mock/hospital.mock")
const aviableScheduleMock = require("../mock/aviableSchedule.mock")


let doctorReturn, doctorValidationReturn, userReturn, medicalSpecialistReturn, hospitalReturn, aviableScheduleReturn = {};
let doctorUC = null;

describe("available schedule test", () => {
  beforeEach(() => {
    doctorReturn = {
        getListDoctor: jest
        .fn()
        .mockReturnValue([doctorMock.doctor]),
        getDoctorById: jest
        .fn()
        .mockReturnValue(doctorMock.doctor),
    };
    userReturn = {
        getUserById: jest
        .fn()
        .mockReturnValue(userMock.user),
    }; 
    aviableScheduleReturn = {
        getAllScheduleByDoctorId: jest
        .fn()
        .mockReturnValue([aviableScheduleMock.aviableSchedule]),
    };
    hospitalReturn = {
        getHospitalById: jest
        .fn()
        .mockReturnValue(hospitalMock.hospital),
    };
    medicalSpecialistReturn = {
        getMedicalSpecialistById: jest
        .fn()
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
    };
    doctorValidationReturn = {
        getDoctorValdationByUserId: jest
        .fn()
        .mockReturnValue(doctorValidationMock.doctorValidation),
    };

    doctorUC = new DoctorUseCase(doctorReturn, doctorValidationReturn, userReturn, medicalSpecialistReturn, hospitalReturn, aviableScheduleReturn);
  });
  describe("get all Dotor test", () => {
    test("should isSuccess = true, statusCode = 200, and data is true", async () => {
    
      let res = await doctorUC.getAllDoctor()
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(typeof res.data === 'object').toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
      expect(res.data[0]).toHaveProperty('id');
      expect(res.data[0]).toHaveProperty('medicalSpecialistId');
      expect(res.data[0]).toHaveProperty('doctorValidationId');
      expect(res.data[0]).toHaveProperty('hospitalId');
    });
  });
  describe("Get doctor Detail by Id schedule availableSchedule test", () => {
    test("should isSuccess = true, statusCode = 200, and data is true", async () => {
    
      let res = await doctorUC.getDoctorById()
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
