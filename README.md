# Dense Pairing

[Try Dense with 14 players]() [Edit](https://github.com/ChristerNilsson/Dense/blob/main/tournaments/14.txt)  
[Try Dense with 78 players]() [Edit](https://github.com/ChristerNilsson/Dense/blob/main/tournaments/78.txt)

## Keys

```
Enter = Jump between Tables and Result
ArrowUp/ArrowDown = Select Table
0 = Enter White Loss
space = Enter Draw
1 = Enter White Win
Home = Jump to first table
End = Jump to last table
```

## Always print paper forms for entering results.

This is your ultimate backup!  

### Instructions
	Edit the URL above.  
	Add the names of the players.  

	* NAME contains then names, separated with |. Mandatory.
	* TOUR contains the header of the tournament. Optional
	* DATE contains the Date. Optional
	* ROUNDS contains the number of rounds. Optional
		* Default: minimum number of rounds if the tournament was a cup, plus 50%.
		* One round added to make the number of rounds even.
		* If you want a different number of rounds, just put it in the URL.

	The following parameters are internal and handled by the program:
	* OPP contains the opponents
	* COL contains the colours, B & W
	* RES contains the scores, 0, 1 or 2 for victory.

### Saving the tournament
	* The updated URL contains all information to display the result page.
	* No data will be stored on the server. All data is in the URL.

## Bonus to Black

You have the option to give Black a Bonus.  
Reason: [White has an advantage](https://chess-results.com/tnr816234.aspx?lan=6&art=13&turdet=YES&flag=30).  

* Bonus points       = 0.1 (default 0.0)
	* Draw as White  = 0.4 (default 0.5)
	* Draw as Black  = 0.6 (default 0.5)
	* Win as White   = 1.0 (default 1.0)
	* Win as Black   = 1.2 (default 1.0)

This parameter can be set to the value you prefer or zero.

[swiss_36.txt](swiss_36.txt)  
[tight_36.txt](tight_36.txt)  


* Open Source
* The database == The URL
* Backup files downloaded automatically after every pairing
* Player with zero Elo is considered to have 1400.

## Advantages

* Players will meet similar strength players
* One person maximum needs a bye. Compare this with Berger.
* Available in the browser.
* Pages can be zoomed
