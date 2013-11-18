nodervisor
==========

Supervisor manager in node.js

### Requirements

- Node.js 
- Supervisord 
- NPM

### Installation

  Clone the git repository into a folder and run:
  
    npm install
	
### How to use it

  Run the app using:
  
<pre>node app</pre>
  
  2. After the app has started, navigate to the machine in a browser on port 3000.
  For instance:
    http://localhost:3000

  3. Log in using the default credentials of:
  	<ul>
  		<li>Email: admin@nodervisor</li>
  		<li>Password: admin</li>
	</ul>

  4. Navigate to the users page using the top menu. Change the admin credentials or add a new user and remove them.
  
  5. Navigate to the hosts page using the top menu. Then add a host running supervisord using the form. Your supervisord config on each host should be set up to allow the xmlrpc interface over a inet port.
  
  At this point, navigating back to the home page should show you a list of your hosts, and the processes running on them.

####Todo

  * Profile page
    * Allow user to reset own password
  * Store hosts in mysql
  * Log Start/Stop/Restart/Deletes of hosts with relevant user
