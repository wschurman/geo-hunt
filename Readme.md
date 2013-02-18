Geo Hunt
========

This is a treasure/scavenger hunt. Uses location-based clues as well as question-answer clues.

Dependencies
============

* Node.js
* NPM
* SQLite3

Installation & Usage
====================

1. Run
    ```shell
    git clone git@github.com:wschurman/geo-hunt.git && cd geo-hunt && npm install
    ```

3. Create a file called secret.js and put the following code into it:
   ```javascript
   exports.secret = "<your-secret-here-should-be-random>";
   ```

4. Modify hunt.json to with your hunt. There can be multiple hunts in the same hunt.json file.
    * keys of the json object are entry passwords into the hunt.
    * Type 0 is Geo based (hunter must go to location). Requires: title, type, lat, lng, thresh. Thresh is how close the person must be to the target location for accept to trigger.
    * Type 1 is Q/A type and requires: title, type, question, answers (array of possible answers)
5. To run:
  ```shell
  node app
  ```

Contributors
=============

William Schurman

License
========

 Copyright 2013 William Schurman.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
