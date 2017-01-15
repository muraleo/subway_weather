mongo = mongoDbConnect("mta_weather")
colors = c("red", "yellow", "green", "violet", "orange", "blue", "pink")

sub_weather<-dbGetQuery(mongo,"sub_weather_final","")
temperature = sub_weather[[1]]
precipitation = sub_weather[[3]]
passenger_number = sub_weather[[5]]

cor(temperature,passenger_number)
cor(precipitation,passenger_number)

barplot(temperature, 
        names.arg = sub_weather[[7]], 
        horiz = FALSE, 
        col = colors, 
        las=2)
title("Average Temperature in whole year")

barplot(passenger_number, 
        horiz = FALSE, 
        col = colors, 
        las=2)
title("Passengers of Subway in whole year")

barplot(precipitation,
        horiz = FALSE, 
        col = colors, 
        las=2)
title("Precipitation in whole year")

