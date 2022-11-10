const MedicalSpecialisUseCase = require("../../usecase/medicalSpecialist");
const medicalSpecialistMock = require("../mock/medicalSpecialist.mock");
const userMock = require("../mock/user.mock");

let mockMedicalSpecialistReturn,
  mockUserReturn = {};
let medicalSpecialistUC = null;

describe("approve validation test", () => {
  beforeEach(() => {
    mockMedicalSpecialistReturn = {
      addMedicalSpecialist: jest
        .fn()
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
      getListMedicalSpecialist: jest
        .fn()
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
      getDoctorByMedicalSpecialistId: jest
        .fn()
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
      getMedicalSpecialistById: jest
        .fn()
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
      getMedicalSpecialistByName: jest
        .fn()
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
      updateMedicalSpecialist: jest.fn().mockReturnValue(true),
      deleteMedicalSpecialist: jest.fn().mockReturnValue(true),
    };

    mockUserReturn = {
      getUserByDoctorRole: jest.fn().mockReturnValue(userMock.user),
    };

    medicalSpecialistUC = new MedicalSpecialisUseCase(
      mockMedicalSpecialistReturn,
      mockUserReturn
    );
  });
  describe("add medicalSpecialist test", () => {
    test("should isSuccess = true, statusCode = 200, and data is true", async () => {
      mockMedicalSpecialistReturn.getMedicalSpecialistByName = jest
        .fn()
        .mockReturnValue(null);
      medicalSpecialistUC = new MedicalSpecialisUseCase(
        mockMedicalSpecialistReturn
      );

      let res = await medicalSpecialistUC.addMedicalSpecialist("KUTIL");

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(typeof res.data === "object").toBeTruthy();
      expect(res.data).toHaveProperty("id");
      expect(res.data).toHaveProperty("specialistName");
    });

    test("should isSuccess = false, statusCode = 400, and reason = 'category name already exists' ", async () => {
      let res = await medicalSpecialistUC.addMedicalSpecialist("KUTIL");

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual("specialist name already exists");
    });
  });
  describe("getList medical specialist test", () => {
    test("should isSuccess = true, statusCode = 200, and type data is array", async () => {
      let res = await medicalSpecialistUC.getListMedicalSpecialist();

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("get doctor by medical specialist test", () => {
    test("should isSuccess = true, statusCode = 200, and type data is valid", async () => {
      let res = await medicalSpecialistUC.getDoctorByMedicalSpecialistId(1);

      expect(
        mockMedicalSpecialistReturn.getDoctorByMedicalSpecialistId
      ).toHaveBeenCalled();
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(typeof res.data === "object").toBeTruthy();
      expect(res.data).toHaveProperty("id");
      expect(res.data).toHaveProperty("name");
      expect(res.data).toHaveProperty("doctors");
    });

    test("should isSuccess is true,  statusCode = 404, and message 'category not found'", async () => {
      mockMedicalSpecialistReturn.getDoctorByMedicalSpecialistId = jest
        .fn()
        .mockReturnValue(null);
      medicalSpecialistUC = new MedicalSpecialisUseCase(
        mockMedicalSpecialistReturn,
        mockUserReturn
      );
      let res = await medicalSpecialistUC.getDoctorByMedicalSpecialistId(1);

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(404);
      expect(res.reason).toEqual("category not found");
    });
  });

  describe("deleteSepcialits test", () => {
    test("should isSuccess = true, statusCode = 200", async () => {
      let res = await medicalSpecialistUC.deleteMedicalSpecialist(1);

      expect(
        mockMedicalSpecialistReturn.getDoctorByMedicalSpecialistId
      ).toHaveBeenCalled();
      expect(
        mockMedicalSpecialistReturn.deleteMedicalSpecialist
      ).toHaveBeenCalled();
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
    });

    test("should isSuccess is true,  statusCode = 404, and message 'category not found'", async () => {
      mockMedicalSpecialistReturn.getDoctorByMedicalSpecialistId = jest
        .fn()
        .mockReturnValue(null);
      medicalSpecialistUC = new MedicalSpecialisUseCase(
        mockMedicalSpecialistReturn,
        mockUserReturn
      );
      let res = await medicalSpecialistUC.deleteMedicalSpecialist(1);

      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(404);
      expect(res.reason).toEqual("Specialist Name not found");
    });
  });
});
