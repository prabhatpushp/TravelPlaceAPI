function submitFormData(
  successCallback,
  errorCallback,
  endpointUrl,
  Args = [],
  formSelector = false,
  Method = "GET",
  headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "*",
  }
) {
  let jsonData = {};
  var formData = formSelector ? document.querySelector(formSelector) : null;
  if (formData) {
    formData = new FormData(formData);
    for (let [key, value] of formData.entries()) {
      jsonData[key] = value;
    }
  }

  //   console.log(formData, jsonData);
  var loginKey = localStorage.getItem("loginKey") || false;
  if (loginKey) {
    headers["Authorization"] = `Bearer ${loginKey}`;
  }

  let Data = Object.keys(jsonData).length > 0 ? JSON.stringify(jsonData) : null;

  $.ajax({
    url: API_ENDPOINT + endpointUrl,
    type: Method,
    data: Data,
    headers: headers,
    contentType: "application/json",
    processData: false,
    success: function (response) {
      successCallback(response, ...Args);
    },
    error: function (response) {
      errorCallback(response);
    },
  });
}

function fillStringFormat(stringFormat, data) {
  for (var key in data) {
    stringFormat = stringFormat.replace("{" + key + "}", data[key]);
  }
  return stringFormat;
}

function createBootstrapTable(headers, keys, data, renderActions = false, idKey = "", paths = {}) {
  // Create table header
  var tableHeader = `<thead class="mytableheading"><tr>`;
  for (var i = 0; i < headers.length; i++) {
    tableHeader += "<th>" + headers[i] + "</th>";
  }
  if (renderActions) {
    tableHeader += "<th> Actions </th>";
  }
  tableHeader += "</tr></thead>";

  // Create table body
  var tableBody = "<tbody>";
  for (var j = 0; j < data.length; j++) {
    tableBody += "<tr>";
    for (var k = 0; k < keys.length; k++) {
      tableBody += "<td>" + data[j][keys[k]] + "</td>";
    }
    if (renderActions) {
      tableBody += `<td class="">
          <a class="btn btn-sm btn-primary w-lg-auto me-2" href="${paths["Details"]}.html?id=${data[j][idKey]}">Details</a>
          <a class="btn btn-sm btn-secondary w-lg-auto me-2" href="${paths["Edit"]}.html?id=${data[j][idKey]}">Edit</a>
          <a class="btn btn-sm btn-danger w-lg-auto me-2" href="${paths["Delete"]}.html?id=${data[j][idKey]}">Delete</a>
        </td>`;
    }
    tableBody += "</tr>";
  }
  tableBody += "</tbody>";

  // Combine header and body into table
  var table = `<table class="table table-bordered bg-white">` + tableHeader + tableBody + "</table>";

  return table;
}
