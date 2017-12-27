# Tintin
## URL Shortener Microservice

### User Stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2.  If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3. When I visit that shortened URL, it will redirect me to my original link.

### Example of use:
You can get a shortened url of `yourURL` by going to `tintin.glitch.me/new/yourURL`.
For example, after I accessed for first time to tintin.glitch.me/new/http://facebook.com, everyone can get to Facebook by accessing to https://tintin.glitch.me/79