echo *********** NPM INSTALL **************
call npm install

WHERE grunt
IF NOT %ERRORLEVEL% NEQ 0  (
	echo ******** CLIENT SIDE GRUNT ***********
	grunt buildserver --no-color --force
)