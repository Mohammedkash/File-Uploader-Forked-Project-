// We start by getting references to the relevant elements in the HTML using the document.querySelector() method.
   // We get references to the form, file-input, progress-area, and uploaded-area elements.
const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

// form click event
// We add an event listener to the form element to listen for a click event. 
form.addEventListener("click", () =>{
  fileInput.click(); //When the form is clicked, we programmatically click the file-input element. This is done to make the file selection dialog box appear.
});

fileInput.onchange = ({target})=>{
  let file = target.files[0]; //getting file [0] this means if user has selected multiple files then get first one only
  if(file){ //Checks whether a file has been selected or not. | If the condition is true, it means a file has been selected. If no file has been selected, the file variable will be null or undefined, and the condition will be false, so the code inside the block will not execute. |
    let fileName = file.name; //getting file name
    if(fileName.length >= 12){ //if file name length is greater than 12 then split it and add ... |The purpose of this is to make sure that the file name does not overflow or distort the layout of the UI.| The number 12 is arbitrary, and you can change it to whatever value you think is appropriate for your use case. The idea is that if the file name is longer than a certain number of characters, it will be truncated and replaced with an ellipsis (i.e., "...") to indicate that it has been shortened.|
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName); //calling uploadFile with passing file name as an argument | The uploadFile() function creates a new XMLHttpRequest object, opens a POST request to the php/upload.php URL, and adds an event listener to the upload event of the xhr object.|
  }
}

// file upload function
function uploadFile(name){
  let xhr = new XMLHttpRequest(); //creating new xhr object (AJAX)
  xhr.open("POST", "php/upload.php"); //sending post request to the specified URL
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{ //file uploading progress event. | This event is fired when the browser is uploading a file and provides information about how much of the file has been uploaded so far |
    // The progress event is triggered with an event object that contains the properties loaded and total, which represent the number of bytes that have been uploaded and the total size of the file being uploaded, respectively.
    // Once we have loaded and total, we can use them to calculate the percentage of the file that has been uploaded and update the progress bar accordingly. The progress bar is updated by modifying the HTML elements of the page, as shown in the rest of the function.
    
    // we calculate the percentage of the file that has been uploaded and format it as a string. We also calculate the total size of the file and format it as a string (in KB or MB, depending on the size).
    let fileLoaded = Math.floor((loaded / total) * 100);  //We calculate the percentage of the file that has been uploaded using, and we use this value to set the width of the progress bar element using style="width: ${fileLoaded}%".
    let fileTotal = Math.floor(total / 1000); //gettting total file size in KB from bytes
    let fileSize;
    // if file size is less than 1024 then add only KB else convert this KB into MB
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB"; //This code is a conditional (ternary) operator, which is a shorthand way to write an if-else statement.
        
        // The code is checking if the total file size is less than 1024 bytes. If it is, then fileSize is assigned the value of fileTotal + " KB". This means that the file size will be displayed in kilobytes (KB).

        // If the file size is greater than or equal to 1024 bytes, then fileSize is assigned the value of (loaded / (1024*1024)).toFixed(2) + " MB". This means that the file size will be displayed in megabytes (MB).
        
        // The toFixed() method is used to round the number to two decimal places, since loaded / (1024*1024) will return a number with many decimal places.

  // The progressHTML variable is a template string that defines the HTML structure of a single file upload progress item. It includes information about the file being uploaded such as the file name, the uploading status and percentage, and a progress bar showing the upload progress.
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    // uploadedArea.innerHTML = ""; //uncomment this line if you don't want to show upload history
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;

    if(loaded == total){ //Finally, when the file has finished uploading, we clear the progress bar and add an element to the uploadedArea to indicate that the file has been uploaded
      progressArea.innerHTML = ""; // this is set to an empty string, which clears the progress bar. 
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
                          //an uploadedHTML string is created, which contains the HTML for a new element to be added to the uploadedArea. This HTML includes the name of the uploaded file, its size, and an icon indicating that the file has been uploaded successfully.
      
      uploadedArea.classList.remove("onprogress"); //The uploadedArea.classList.remove("onprogress") statement is used to remove the onprogress class from the uploadedArea element, which was added when the file upload was initiated, to indicate that the upload process is now complete.
      // uploadedArea.innerHTML = uploadedHTML; //uncomment this line if you don't want to show upload history
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history
    }
  });
  
  /*FormData is an object in JavaScript that provides a simple way to construct and send key/value pairs representing form data. It can be used to send data to a server in a format that is easy to process.

When creating a new FormData object, you pass in the HTML form element you want to extract data from. Once you have a FormData object, you can use its methods to add, remove, or retrieve form data. Here are some of the methods provided by FormData:

append(name, value): Adds a new key/value pair to the FormData object. If a value with the same name already exists, it will be appended to the existing value.
delete(name): Removes a key/value pair with the specified name.
get(name): Returns the first value associated with the specified name, or null if the name does not exist.
getAll(name): Returns an array of all the values associated with the specified name, or an empty array if the name does not exist.
set(name, value): Sets the value of the first key/value pair with the specified name, or adds a new key/value pair if the name does not exist.
Once you have added all the data you want to send to the server, you can use XMLHttpRequest or fetch() to send the FormData object. In the case of XMLHttpRequest, you pass the FormData object to the send() method of the XMLHttpRequest object.

When the server receives the data, it can process it in the same way as if it had been sent as a normal form submission. The only difference is that FormData allows you to add data programmatically, rather than relying on the user to fill out a form.
*/
  let data = new FormData(form); //Creates a new FormData object, which allows you to easily construct and send key/value pairs representing form data.
  xhr.send(data); //sending form data object to the server using the send() method of the XMLHttpRequest object. |  The send() method sends the data to the server asynchronously, without reloading the page. This is the core of the AJAX technique that allows for the dynamic updating of web pages without requiring a full page reload.
      // When the send() method is called, the request is sent to the server and the server processes it. Once the server has finished processing the request, it sends a response back to the client. The client then handles the response and updates the page as necessary.
}
