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
        .fn(medicalSpecialistMock.medicalSpecialist)
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
        getListMedicalSpecialist: jest
        .fn([medicalSpecialistMock.medicalSpecialist])
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
      getDoctorByMedicalSpecialistId: jest
        .fn(medicalSpecialistMock.medicalSpecialist)
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
      getMedicalSpecialistById: jest
        .fn(medicalSpecialistMock.medicalSpecialist)
        .mockReturnValue(medicalSpecialistMock.medicalSpecialist),
      getMedicalSpecialistByName: jest
        .fn(medicalSpecialistMock.medicalSpecialist)
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
    const list=  [
      {
        id: 1,
        specialistName: 'BISUL',
        createdAt: '2022-09-07 09:36:06.000 +0700',
        updatedAt: '2022-09-07 09:36:08.000 +0700'
   },
   {
    id: 2,
        specialistName: 'T',
        createdAt: '2022-09-07 09:36:06.000 +0700',
        updatedAt: '2022-09-07 09:36:08.000 +0700'
   }
  ]
    
    
    test("should isSuccess = true, statusCode = 200, and type data is array", async () => {
      


      mockMedicalSpecialistReturn.getListMedicalSpecialist = jest.fn().mockReturnValue(list)
      medicalSpecialistUC = new MedicalSpecialisUseCase(mockMedicalSpecialistReturn,
        mockUserReturn)
      let res = await medicalSpecialistUC.getListMedicalSpecialist([medicalSpecialistMock.medicalSpecialist]);
      console.log(res)

      expect(res.isSuccess).toBeTruthy();
      expect(typeof res.data === 'object').toBeTruthy();
      expect(Array.isArray(res.data)).toBeTruthy();
      expect(res.data[0]).toHaveProperty("id");
      expect(res.data[0]).toHaveProperty("specialistName");
      
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
