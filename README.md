# js-screenshare
 tiny screen sharing tool

# what does it do ?
It's a tiny system for screen sharing.

It is based on two pages :
- Stream.html that give the possibility to share one's screen. Due to the system there can only be one share at a time.
- Index.html can then be used to watch the screen that has been shared, if there is one.

# how does it work ?
It uses thes the navigator.mediaDevices.getUserMedia function to capture the screen and display it in a hidden video tag. Then it is drawn each second in a canva to easily get a blob version of the screen that is sent to the server using an XmlHttpRequest object. The server strores that frame into a file, removing the previous frame if there was one.

The player can then ask for the serverto check is there is a saved frame and id there is one, will display it.
# should I use it ?

Definitely, no. Since is uses a json file to read and wrtie data there are lots of risk of two peoples openiong the file at the same time, which may lead to crashes. I'll probably try another version later using a real database. I've already started working on it but I need to clean the code a bit before sharing it.