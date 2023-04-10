# If you encounter a warning while uploading a file of a big size. then you should modify the PHP Configuration.

The PHP server has a configuration setting called post_max_size that limits the maximum size of POST data that can be submitted to the server. By default, the maximum allowed size is usually set to 8 MB, but it can be changed in the PHP configuration file `php.ini` or in the server configuration file.

To fix this warning message, you can increase the `post_max_size` setting in the PHP configuration file to a value greater than the size of the POST data you are trying to submit. For example, if you want to submit a 200 MB file, you can set the post_max_size to a value greater than 200 MB, such as post_max_size=250M.

Also you need to change the value of `upload_max_filesize`

# File-Uploader-Forked-Project-
This is a fork project from "CodingNepal", Along with my comments to get better understanding.
