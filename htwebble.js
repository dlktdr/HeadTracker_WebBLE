$(function(){
  // Connect and Get all Characteristics
  // Check if the radio is available
  navigator.bluetooth.getAvailability().then(isAvailable => {
  if(isAvailable) {
    //$('#myModal').modal(options)
    $("#connectDialog").show();
  }
  else {
    console.log("Web BLE Not Available");
    $("#noWebBluetooth").show();
  }
  });
});

function parametersChanged()
{
  // Allow Save to Flash
  $("#saveButton").prop('disabled', false);
}

function showLoader()
{
  $("#connectDialog").hide();
  $("#loadingDialog").show();
}

function btConnectionStatus(note)
{
  $("#statusNote").text(note);
}

function hideLoader()
{
  $("#loading").hide();
}

function setValues()
{

}

function updateParameter(name,value)
{
  console.log("Updating " + name +  " = " + value);

  parametersChanged();
}

$("#saveButton").on('click', function()
{
  console.log("Saving to Flash");
  let encoder = new TextEncoder();
  commandCharacteristic.writeValue(encoder.encode("Flash"))
  .then(_ => {
    console.log("Wrote Flash to Command Characteristic");
    $("#saveButton").prop('disabled', true);
  })
  .catch(error => {
    console.log("Bugger it didn't work");
  });
});

$(".disconnectButton").on('click', disconnect);

function disconnect()
{
  console.log("Disconnecting");
  if(gattServer != null)
    gattServer.disconnect();
  radioService = null;
  gattServer = null;
  $("#connectionFailedDialog").hide();
  $("#loadingDialog").hide();
  $("#connectDialog").show();
}

function connectionFault(error)
{
  hideLoader();
  $("#connectionFailedDialog").show();
  $("#errorMessage").text(error);
  console.log(":EREER");
}

function connectionEstablished()
{
  $("#loadingDialog").hide();
}

let progress = $("#loading");

$("#bleconnect").on("click", function() {
  console.log("Starting Connection");
  connectToHT();
});

$("#refreshValues").on('click', function() {
  readValues(refreshStatus, refreshComplete);
  $("#refreshSpinner").removeClass('d-none');
});

function refreshComplete()
{
  $("#refreshSpinner").addClass('d-none');
}

function refreshStatus(message)
{
  console.log(message)
}

