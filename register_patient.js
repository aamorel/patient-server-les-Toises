var fs = require('fs');

const patientDict = {};
const patientId = 'EhjdaQ';
const patientPath = 'patient_data/' + patientId + '.json';

patientDict['patientId'] = patientId;
patientDict['patientFirstName'] = 'Alfred';
patientDict['patientLastName'] = 'Guillou';
patientDict['patientRdvs'] = [
  [new Date('August 16, 2021 15:00:00').toJSON(), new Date('August 16, 2021 16:00:00').toJSON()],
  [new Date('August 21, 2021 15:00:00').toJSON(), new Date('August 21, 2021 16:00:00').toJSON()]
];
console.log(JSON.stringify(patientDict['patientRdvs']));

const patientDataString = JSON.stringify(patientDict);
fs.writeFile(patientPath, patientDataString, function(err) {
  if (err) {
      console.log(err);
  }
});

