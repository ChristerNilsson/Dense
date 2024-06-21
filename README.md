# Dense Pairing

[Try Dense with 14 players](https://christernilsson.github.io/Dense/?TOUR=Klass_1&DATE=2024-05-28&ROUNDS=8&ROUND=0&SP=0.0&TPP=30&PPP=60&PLAYERS=(1825|JOHANSSON_Lennart_B.)(1697|BJ%C3%96RKDAHL_G%C3%B6ran)(1684|SILINS_Peteris)(1681|STOLOV_Leonid)(1644|PETTERSSON_Lars-%C3%85ke)(1598|AIKIO_Onni)(1598|ISRAEL_Dan)(1583|PERSSON_Kjell)(1561|LILJESTR%C3%96M_Tor)(1559|LEHVONEN_Jouko)(1539|ANDERSSON_Lars_Owe)(1535|%C3%85BERG_Lars-Erik)(1532|ANTONSSON_G%C3%B6rgen)(1400|STR%C3%96MB%C3%84CK_Henrik)) [Edit](https://github.com/ChristerNilsson/Dense/blob/main/tournaments/14.txt)  

[Try Dense with 78 players](https://christernilsson.github.io/Dense/?TOUR=Tyres%C3%B6_Open_2024&DATE=2024-05-03&ROUNDS=8&ROUND=0&SP=0.0&PLAYERS=(2416|Hampus_S%C3%B6rensen)(2413|Michael_Wiedenkeller)(2366|Joar_%C3%96lund)(2335|Joar_%C3%96stlund)(2272|Vidar_Grahn)(2235|Leo_Crevatin)(2213|Daniel_Vesterbaek_Pedersen)(2141|Victor_Muntean)(2113|Filip_Bj%C3%B6rkman)(2109|Vidar_Seiger)(2108|Pratyush_Tripathi)(2093|Erik_Dingertz)(2076|Michael_Duke)(2065|Matija_Sakic)(2048|Michael_Mattsson)(2046|Lukas_Willstedt)(2039|Lavinia_Valcu)(2035|Oliver_Nilsson)(2031|Lennart_Evertsson)(2022|Jussi_Jakenberg)(2001|Aryan_Banerjee)(1985|Tim_Nordenfur)(1977|Elias_Kingsley)(1954|Per_Isaksson)(1944|Cristine_Rose_Mariano)(1936|Lo_Ljungros)(1923|Herman_Enholm)(1907|Carina_Wickstr%C3%B6m)(1897|Joel_%C3%85hfeldt)(1896|Stefan_Nyberg)(1893|Hans_R%C3%A5nby)(1889|Mikael_Blom)(1886|Joar_Berglund)(1885|Mikael_Helin)(1880|Olle_%C3%85lgars)(1878|Jesper_Borin)(1871|Khaschuluu_Sergelenbaatar)(1852|Roy_Karlsson)(1848|Fredrik_M%C3%B6llerstr%C3%B6m)(1846|Kenneth_Fahlberg)(1835|Peder_Gedda)(1833|Karam_Masoudi)(1828|Christer_Johansson)(1827|Anders_Kallin)(1818|Morris_Bergqvist)(1803|Martti_Hamina)(1800|Bj%C3%B6rn_L%C3%B6fstr%C3%B6m)(1796|Nicholas_Bychkov_Zwahlen)(1794|Jonas_Sandberg)(1793|Rohan_Gore)(1787|Kjell_Jernselius)(1783|Radu_Cernea)(1778|Mukhtar_Jamshedi)(1768|Neo_Malmquist)(1763|Joacim_Hultin)(1761|Lars-%C3%85ke_Pettersson)(1748|Andr%C3%A9_J_Lindebaum)(1733|Lars_Eriksson)(1733|Hugo_Hardwick)(1728|Hugo_Sundell)(1726|Simon_Johansson)(1721|Jouni_Kaunonen)(1709|Eddie_Parteg)(1695|Sid_Van_Den_Brink)(1691|Svante_N%C3%B6dtveidt)(1688|Anders_Hillbur)(1680|Sayak_Raj_Bardhan)(1671|Salar_Banavi)(1650|Patrik_Wiss)(1641|Anton_Nordenfur)(1624|Jens_Ahlstr%C3%B6m)(1622|Hanns_Ivar_Uniyal)(1579|Christer_Carmegren)(1575|Christer_Nilsson)(1524|M%C3%A5ns_N%C3%B6dtveidt)(1480|Karl-Oskar_Rehnberg)(1417|David_Broman)(1406|Vida_Radon)) [Edit](https://github.com/ChristerNilsson/Dense/blob/main/tournaments/78.txt)

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
