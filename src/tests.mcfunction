

scoreboard players operation first jsScores += second jsScores
scoreboard players operation @a jsScores = @p jsScores
scoreboard players reset @a jsScores

scoreboard objectives add trigger trigger

scoreboard players enable @p trigger

item replace entity @s inventory.10 with acacia_boat{}