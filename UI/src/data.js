const patientData = [
    {
      Name: "Bobby Jackson",
      Age: 30,
      Gender: "Male",
      BloodType: "B-",
      MedicalCondition: "Cancer",
      DateOfAdmission: "2024-01-31",
      Doctor: "Matthew Smith",
      Hospital: "Sons and Miller",
      InsuranceProvider: "Blue Cross",
      BillingAmount: 18856.28,
      RoomNumber: 328,
      AdmissionType: "Urgent",
      DischargeDate: "2024-02-02",
      Medication: "Paracetamol",
      TestResults: "Normal",
    },
    {
      Name: "Leslie Terry",
      Age: 62,
      Gender: "Male",
      BloodType: "A+",
      MedicalCondition: "Obesity",
      DateOfAdmission: "2019-08-20",
      Doctor: "Samantha Davies",
      Hospital: "Kim Inc",
      InsuranceProvider: "Medicare",
      BillingAmount: 33643.33,
      RoomNumber: 265,
      AdmissionType: "Emergency",
      DischargeDate: "2019-08-26",
      Medication: "Ibuprofen",
      TestResults: "Inconclusive",
    },
    {
      Name: "Danny Smith",
      Age: 76,
      Gender: "Female",
      BloodType: "A-",
      MedicalCondition: "Obesity",
      DateOfAdmission: "2022-09-22",
      Doctor: "Tiffany Mitchell",
      Hospital: "Cook PLC",
      InsuranceProvider: "Aetna",
      BillingAmount: 27955.10,
      RoomNumber: 205,
      AdmissionType: "Emergency",
      DischargeDate: "2022-10-07",
      Medication: "Aspirin",
      TestResults: "Normal",
    },
    {
      Name: "Andrew Watts",
      Age: 28,
      Gender: "Female",
      BloodType: "O+",
      MedicalCondition: "Diabetes",
      DateOfAdmission: "2020-11-18",
      Doctor: "Kevin Wells",
      Hospital: "Hernandez Rogers and Vang",
      InsuranceProvider: "Medicare",
      BillingAmount: 37909.78,
      RoomNumber: 450,
      AdmissionType: "Elective",
      DischargeDate: "2020-12-18",
      Medication: "Ibuprofen",
      TestResults: "Abnormal",
    },
    {
      Name: "Adrienne Bell",
      Age: 43,
      Gender: "Female",
      BloodType: "AB+",
      MedicalCondition: "Cancer",
      DateOfAdmission: "2022-09-19",
      Doctor: "Kathleen Hanna",
      Hospital: "White-White",
      InsuranceProvider: "Aetna",
      BillingAmount: 14238.32,
      RoomNumber: 458,
      AdmissionType: "Urgent",
      DischargeDate: "2022-10-09",
      Medication: "Penicillin",
      TestResults: "Abnormal",
    },
    {
      Name: "Emily Johnson",
      Age: 36,
      Gender: "Male",
      BloodType: "A+",
      MedicalCondition: "Asthma",
      DateOfAdmission: "2023-12-20",
      Doctor: "Taylor Newton",
      Hospital: "Nunez-Humphrey",
      InsuranceProvider: "UnitedHealthcare",
      BillingAmount: 48145.11,
      RoomNumber: 389,
      AdmissionType: "Urgent",
      DischargeDate: "2023-12-24",
      Medication: "Ibuprofen",
      TestResults: "Normal",
    },
    {
      Name: "Edward Edwards",
      Age: 21,
      Gender: "Female",
      BloodType: "AB-",
      MedicalCondition: "Diabetes",
      DateOfAdmission: "2020-11-03",
      Doctor: "Kelly Olson",
      Hospital: "Group Middleton",
      InsuranceProvider: "Medicare",
      BillingAmount: 19580.87,
      RoomNumber: 389,
      AdmissionType: "Emergency",
      DischargeDate: "2020-11-15",
      Medication: "Paracetamol",
      TestResults: "Inconclusive",
    },
    {
      Name: "Christina Martinez",
      Age: 20,
      Gender: "Female",
      BloodType: "A+",
      MedicalCondition: "Cancer",
      DateOfAdmission: "2021-12-28",
      Doctor: "Suzanne Thomas",
      Hospital: "Powell Robinson and Valdez",
      InsuranceProvider: "Cigna",
      BillingAmount: 45820.46,
      RoomNumber: 277,
      AdmissionType: "Emergency",
      DischargeDate: "2022-01-07",
      Medication: "Paracetamol",
      TestResults: "Inconclusive",
    },
    {
      Name: "Jasmine Aguilar",
      Age: 82,
      Gender: "Male",
      BloodType: "AB+",
      MedicalCondition: "Asthma",
      DateOfAdmission: "2020-07-01",
      Doctor: "Daniel Ferguson",
      Hospital: "Sons Rich",
      InsuranceProvider: "Cigna",
      BillingAmount: 50119.22,
      RoomNumber: 316,
      AdmissionType: "Elective",
      DischargeDate: "2020-07-14",
      Medication: "Aspirin",
      TestResults: "Abnormal",
    },
    {
      Name: "Christopher Berg",
      Age: 58,
      Gender: "Female",
      BloodType: "AB-",
      MedicalCondition: "Cancer",
      DateOfAdmission: "2021-05-23",
      Doctor: "Heather Day",
      Hospital: "Padilla-Walker",
      InsuranceProvider: "UnitedHealthcare",
      BillingAmount: 19784.63,
      RoomNumber: 249,
      AdmissionType: "Elective",
      DischargeDate: "2021-06-22",
      Medication: "Paracetamol",
      TestResults: "Inconclusive",
    },
    {
      Name: "Michelle Daniels",
      Age: 72,
      Gender: "Male",
      BloodType: "O+",
      MedicalCondition: "Cancer",
      DateOfAdmission: "2020-04-19",
      Doctor: "John Duncan",
      Hospital: "Schaefer-Porter",
      InsuranceProvider: "Medicare",
      BillingAmount: 12576.80,
      RoomNumber: 394,
      AdmissionType: "Urgent",
      DischargeDate: "2020-04-22",
      Medication: "Paracetamol",
      TestResults: "Normal",
    },
    {
      Name: "Aaron Martinez",
      Age: 38,
      Gender: "Female",
      BloodType: "A-",
      MedicalCondition: "Hypertension",
      DateOfAdmission: "2023-08-13",
      Doctor: "Douglas Mayo",
      Hospital: "Lyons-Blair",
      InsuranceProvider: "Medicare",
      BillingAmount: 7999.59,
      RoomNumber: 288,
      AdmissionType: "Urgent",
      DischargeDate: "2023-09-05",
      Medication: "Lipitor",
      TestResults: "Inconclusive",
    },
    {
      Name: "Connor Hansen",
      Age: 75,
      Gender: "Female",
      BloodType: "A+",
      MedicalCondition: "Diabetes",
      DateOfAdmission: "2019-12-12",
      Doctor: "Kenneth Fletcher",
      Hospital: "Powers Miller",
      InsuranceProvider: "Cigna",
      BillingAmount: 43282.28,
      RoomNumber: 134,
      AdmissionType: "Emergency",
      DischargeDate: "2019-12-28",
      Medication: "Penicillin",
      TestResults: "Abnormal",
    },
    {
      Name: "Robert Bauer",
      Age: 68,
      Gender: "Female",
      BloodType: "AB+",
      MedicalCondition: "Asthma",
      DateOfAdmission: "2020-05-22",
      Doctor: "Theresa Freeman",
      Hospital: "Rivera-Gutierrez",
      InsuranceProvider: "UnitedHealthcare",
      BillingAmount: 33207.71,
      RoomNumber: 309,
      AdmissionType: "Urgent",
      DischargeDate: "2020-06-19",
      Medication: "Lipitor",
      TestResults: "Normal",
    },
    {
      Name: "Brooke Brady",
      Age: 44,
      Gender: "Female",
      BloodType: "AB+",
      MedicalCondition: "Cancer",
      DateOfAdmission: "2021-10-08",
      Doctor: "Roberta Stewart",
      Hospital: "Morris-Arellano",
      InsuranceProvider: "UnitedHealthcare",
      BillingAmount: 40701.60,
      RoomNumber: 182,
      AdmissionType: "Urgent",
      DischargeDate: "2021-10-13",
      Medication: "Paracetamol",
      TestResults: "Normal",
    },
    {
      Name: "Ms. Natalie Gamble",
      Age: 46,
      Gender: "Female",
      BloodType: "AB-",
      MedicalCondition: "Obesity",
      DateOfAdmission: "2023-01-01",
      Doctor: "Maria Dougherty",
      Hospital: "Cline-Williams",
      InsuranceProvider: "Blue Cross",
      BillingAmount: 12263.36,
      RoomNumber: 465,
      AdmissionType: "Elective",
      DischargeDate: "2023-01-11",
      Medication: "Aspirin",
      TestResults: "Inconclusive",
    },
    {
      Name: "Haley Perkins",
      Age: 63,
      Gender: "Female",
      BloodType: "A+",
      MedicalCondition: "Arthritis",
      DateOfAdmission: "2020-06-23",
      Doctor: "Erica Spencer",
      Hospital: "Cervantes-Wells",
      InsuranceProvider: "UnitedHealthcare",
      BillingAmount: 24499.85,
      RoomNumber: 114,
      AdmissionType: "Elective",
      DischargeDate: "2020-07-14",
      Medication: "Paracetamol",
      TestResults: "Normal",
    },
    {
      Name: "Mrs. Jamie Campbell",
      Age: 38,
      Gender: "Male",
      BloodType: "AB-",
      MedicalCondition: "Obesity",
      DateOfAdmission: "2020-03-08",
      Doctor: "Justin Kim",
      Hospital: "Torres and Harrison Jones",
      InsuranceProvider: "Cigna",
      BillingAmount: 17440.47,
      RoomNumber: 449,
      AdmissionType: "Urgent",
      DischargeDate: "2020-04-02",
      Medication: "Paracetamol",
      TestResults: "Abnormal",
    },
    {
      Name: "Luke Burgess",
      Age: 34,
      Gender: "Female",
      BloodType: "A-",
      MedicalCondition: "Hypertension",
      DateOfAdmission: "2021-03-04",
      Doctor: "Justin Moore Jr.",
      Hospital: "Houston PLC",
      InsuranceProvider: "Blue Cross",
      BillingAmount: 18843.02,
      RoomNumber: 260,
      AdmissionType: "Elective",
      DischargeDate: "2021-03-14",
      Medication: "Aspirin",
      TestResults: "Abnormal",
    },
  ];
  
  export default patientData;
  