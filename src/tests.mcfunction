

scoreboard players operation first jsScores += second jsScores
scoreboard players operation @a jsScores = @p jsScores
scoreboard players reset @a jsScores

scoreboard objectives add trigger trigger

scoreboard players enable @p trigger
execute if score @s trigger matches -2147483648..2147483647 run 