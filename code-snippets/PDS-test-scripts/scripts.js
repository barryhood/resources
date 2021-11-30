(function () {
  const pdsInput = document.querySelector('.pds-input-textarea');
  const pdsInputButton = document.querySelector('.pds-input-button');

  const pdsConfig = document.querySelector('.pds-config');
  const pdsConfigButton = document.querySelector('.pds-config-button');

  const pdsOutput = document.querySelector('.pds-output-textarea');
  const pdsOutputButton = document.querySelector('.pds-output-button');

  let globalPdsObject = false;
  let globalFincalcObject = false;

  function returnFormattedDate(dateIn) {
    const dateOut = dateIn.toLocaleDateString('en-GB', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return dateOut;
  }

  function getDifferenceInDays(timestamp) {
    const msDiff = Date.now() - timestamp;
    const days = (msDiff / (60 * 60 * 24 * 1000));
    return days;
  }

  function showDateValidity() {
    const tableDateFields = pdsConfig.querySelectorAll('.table-date-field');
    const diffText = ['14 days or less','over 14 days','over 30 days'];
    tableDateFields.forEach((field) => {
      const fieldDate = field.getAttribute('timestamp');
      const diff = getDifferenceInDays(fieldDate);
      if(diff < 15) {
        field.parentNode.parentNode.querySelector('.table-date-validity').innerHTML = diffText[0];
      } else if(diff < 30) {
        field.parentNode.parentNode.querySelector('.table-date-validity').innerHTML = diffText[1];
      } else {
        field.parentNode.parentNode.querySelector('.table-date-validity').innerHTML = diffText[2];
      }
    });
  }

  function drawTable(entries, latest, title) {
    const div = document.createElement('div');

    const insertEntries = () => {
      let html = '';
      entries.forEach((entry) => {
        const isLatest = entry.noun === latest.data;
        const timestamp = entry.data.timestamp || Date.now();
        const entryDate = new Date(timestamp);
        const outputDate = returnFormattedDate(entryDate);

        html += `
        <tr data-eventcode="${entry.eventCode}">
          <td><input type="radio" class="table-latest-radio" name="${entry.verb}"${isLatest ? ' checked' : ''}></td>
          <td>${entry.data.vehicleName}</td>
          <td>${entry.data.vehicleId}</td>
          <td><div class="table-date-field" data-date="${outputDate}" timestamp="${timestamp}"><span class="table-date-field-span">${outputDate}</span></div></td>
          <td><input class="table-model-year" type="text" value="${entry.data.modelYear}" /></td>
          <td class="table-date-validity"></td>
        </tr>`;
      });
      return html;
    }

    const table = `
    <h2 class="title title-h2">${title}</h2>
    <table class="table" data-quote-type="${latest.verb}">
      <thead>
        <tr><th>Latest</th><th>Name</th><th>ID</th><th>Timestamp</th><th>Model year</th><th>Validity</th></tr>
      </thead>
      <tbody>${insertEntries()}</tbody>
    </table>`;
    div.innerHTML = table;
    div.classList.add('table-wrapper');
    const dateFields = [...div.querySelectorAll('.table-date-field')];
    dateFields.forEach((dateField) => {
      const datePicker = new Datepicker(dateField, {
        format: 'dd/mm/yyyy'
      });
      dateField.addEventListener('changeDate', (e) => {
        dateField.querySelector('.table-date-field-span').innerHTML = returnFormattedDate(e.detail.date);
        dateField.setAttribute('timestamp', datePicker.getDate().getTime());
        showDateValidity();
      });
    });
    return div;
  }


  function generateTables () {
    // split into quick quote and integrated quote objects
    const qqEntries = [];
    const iqEntries = [];
    let qqLatest = false;
    let iqLatest = false;
    globalFincalcObject.forEach((entry) => {
      if(entry.verb === 'quickquote' && entry.noun !== 'latest') {
        qqEntries.push(entry);
      }
      if(entry.verb === 'integratedquote' && entry.noun !== 'latest') {
        iqEntries.push(entry);
      }
      if(entry.verb === 'quickquote' && entry.noun === 'latest') {
        qqLatest = entry;
      }
      if(entry.verb === 'integratedquote' && entry.noun === 'latest') {
        iqLatest = entry;
      }
    });

    pdsConfig.innerHTML = '';
    if(qqEntries.length) {
      pdsConfig.appendChild(drawTable(qqEntries, qqLatest, 'Quick quote entries'));
    }
    if(iqEntries.length) {
      pdsConfig.appendChild(drawTable(iqEntries, iqLatest, 'Integrated quote entries'));
    }
    showDateValidity();

    const div = document.createElement('div');
    div.classList.add('change-model-years');
    div.innerHTML = `Update all model years to: <input type="text" class="change-model-years-input" value="" />`;
    pdsConfig.appendChild(div);
    const modelYearInput = pdsConfig.querySelector('.change-model-years-input');
    modelYearInput.addEventListener('keyup', () => {
      pdsConfig.querySelectorAll('.table-model-year').forEach((yearField) => {
        yearField.value = modelYearInput.value;
      });
    });
  }


  function doPdsInput() {
    globalPdsObject = false;
    globalFincalcObject = false;
    try {
      globalPdsObject = JSON.parse(pdsInput.value.trim());
    }
    catch (error) {
      console.log(`Error parsing JSON: ${error}`);
      return;
    }

    globalFincalcObject = globalPdsObject.entries && globalPdsObject.entries.fincalc;

    if(!globalFincalcObject || !globalFincalcObject.length) {
      console.log('No fincalc entries found in object');
      return;
    }
    generateTables ();

  }

  function updateLatest(vehicleId, type) {
    globalPdsObject.entries.fincalc.forEach((global) => {
      if(global.noun === 'latest' && global.verb === type) {
        global.data = vehicleId;
      }
    });
  }

  function insertDataBackToGlobal(rows, type) {
    console.log('insertDataBackToGlobal: ', rows, type);
    rows.forEach((row) => {
      globalPdsObject.entries.fincalc.forEach((global) => {
        if(global.eventCode === row.getAttribute('data-eventcode')) {
          global.data.timestamp = row.querySelector('[timestamp]').getAttribute('timestamp');
          const oldModelYear = global.data.modelYear;
          const modelYear = row.querySelector('.table-model-year').value;;
          global.data.modelYear = modelYear;
          global.data.configWebUrl = global.data.configWebUrl.replaceAll(oldModelYear, modelYear);
          global.data.financeUrl = global.data.financeUrl.replaceAll(oldModelYear, modelYear);
          if(row.querySelector('.table-latest-radio').checked) {
            updateLatest(global.data.vehicleId, type);
          }
        }
      });
    });
  }

  function createScript() {
    const qqRows = document.querySelectorAll('[data-quote-type="quickquote"] tbody tr');
    const iqRows = document.querySelectorAll('[data-quote-type="integratedquote"] tbody tr');
    if(qqRows.length) {
      insertDataBackToGlobal(qqRows, 'quickquote');
    }
    if(iqRows.length) {
      insertDataBackToGlobal(iqRows, 'integratedquote');
    }
    globalPdsObject.changeset = 0;
    setTimeout(() => {
      pdsOutput.innerHTML = `
      let ls = ${JSON.stringify(globalPdsObject)};
      localStorage.setItem('PDS_data', JSON.stringify(ls));`.trim();
    }, 100);
  }

  pdsInputButton.addEventListener('click', () => {
    if(pdsInput.value.trim() !== '') {
      doPdsInput();
      pdsInput.value = '';
    }
  });

  pdsConfigButton.addEventListener('click', () => {
    if (pdsConfig.innerHTML.trim() !== '') {
      createScript();
      pdsConfig.innerHTML = '';
    }
  });

  pdsOutputButton.addEventListener('click', () => {
    if (pdsOutput.value.trim() !== '') {
      pdsOutput.select();
      document.execCommand('copy');
    }
  });
})();
