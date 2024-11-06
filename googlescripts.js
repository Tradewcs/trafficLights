const idDb = '1p0GMbeNKIQcDUv516MN5Y02XbZpWoaIG-FErgmBPe5Y';
const ss = SpreadsheetApp.openById(idDb);
const sheet = ss.getSheetByName('Sheet1');

function initializeSheet() {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ID', 'State']);
    sheet.appendRow([1, 'red']);
    sheet.appendRow([2, 'green']);
  }
}

function getTrafficLights() {
  const data = sheet.getDataRange().getValues();
  const lights = data.slice(1).map(row => ({ id: row[0], state: row[1] }));
  return lights;
}

function getTrafficLightState(id) {
  const data = getTrafficLights();
  const light = data.find(light => light.id === id);
  return light || { error: 'Traffic light not found' };
}

function updateTrafficLightState(id, state) {
  const data = sheet.getDataRange().getValues();
  const rowIndex = data.findIndex(row => row[0] === id);

  if (rowIndex > -1) {
    sheet.getRange(rowIndex + 1, 2).setValue(state);
    return getTrafficLights();
  } else {
    return { error: 'Traffic light not found' };
  }
}

function doGet(request) {
  initializeSheet();
  const { method, id, state } = request.parameter;

  if (method === 'GET_ALL') {
    return sendJson(getTrafficLights());
  }
  if (method === 'GET' && id) {
    return sendJson(getTrafficLightState(Number(id)));
  }
  if (method === 'POST' && id && state) {
    return sendJson(updateTrafficLightState(Number(id), state));
  }

  return sendJson({ error: 'Invalid request' });
}

function sendJson(response) {
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}
