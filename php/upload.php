<?php
  $file_name =  $_FILES['file']['name']; //getting file name
  $tmp_name = $_FILES['file']['tmp_name']; //getting temp_name of file
  $file_up_name = time().$file_name; //making file name dynamic by adding time before file name | BTW, it is only used to specify the destination folder and not the actual file path. So to avoid "Failed to open stream: No such file or directory" we need to move it.
  if (move_uploaded_file($tmp_name, "files/".$file_up_name)) { //move file to the specified folder with dynamic name  | This line attempts to move the uploaded file from the temporary directory to the files directory with the dynamic file name. It checks if the file was successfully moved before proceeding to the next step.
    $content = file_get_contents("files/".$file_up_name); //read the contents of the file | This line reads the contents of the file that was just moved to the files directory using file_get_contents(). The contents of the file are stored in the $content variable.
    error_log($content); //print the contents to the PHP server console | This line writes the contents of the file to the PHP server console.
  }
?>

<?php
  //   $file_name =  $_FILES['file']['name']; //getting file name
  // $tmp_name = $_FILES['file']['tmp_name']; //getting temp_name of file

    // The code first retrieves the name and temporary name of the uploaded file using the $_FILES superglobal variable. 
    // The $_FILES variable is an associative array that contains information about the uploaded file, such as its name, type, size, and location.
?>

<?php
  // $file_up_name = time().$file_name; //making file name dynamic by adding time before file name
    // The code generates a dynamic file name by concatenating the current time with the original file name. This ensures that each uploaded file has a unique name and prevents overwriting of files with the same name.
?>

<?php
// move_uploaded_file($tmp_name, "files/".$file_up_name); //moving file to the specified folder with dynamic name
    // The code then moves the uploaded file from its temporary location to a permanent location on the server. 
    // In this case, the file is moved to a folder called "files" in the root directory of the server. 
    // The move_uploaded_file() function is used to perform this action.

      // The move_uploaded_file() function takes two parameters:
          // The temporary name of the uploaded file ($tmp_name).
          // The destination where the file should be moved to ("files/".$file_up_name).
          // The destination path includes the name of the folder where the file should be stored (files/) and the dynamic file name ($file_up_name).
          // Once the file is moved to the permanent location, it can be accessed and used by other parts of the application.
?>

