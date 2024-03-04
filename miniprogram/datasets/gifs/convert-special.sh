# 高度略长
convert "Barbell-Step-Up.2022-07-08-23_15_51.gif" -coalesce -fill white -draw "rectangle 0,0,150,45" -flop "./convert2/Barbell-Step-Up.2022-07-08-23_15_51.gif"
# 右侧
convert "Lever-Cable-Rear-Pulldown.2022-07-06-16_24_30.gif" -coalesce -fill white -draw "rectangle 200,0,350,45" -flop "./convert2/Lever-Cable-Rear-Pulldown.2022-07-06-16_24_30.gif" 
# 下中
convert "Cable-Side-Triceps-Extension.2022-07-06-23_32_36.gif" -coalesce -fill white -draw "rectangle 120,300,270,345" -flop "./convert2/Cable-Side-Triceps-Extension.2022-07-06-23_32_36.gif"
# 多个
convert "Cable-Side-Triceps-Extension.2022-07-06-23_32_36.gif" -coalesce -fill white -draw "rectangle 120,300,270,345" -coalesce -fill white -draw "rectangle 0,0,150,30" -flop "./convert2/Cable-Side-Triceps-Extension.2022-07-06-23_32_36.gif"
# 右下
convert "Table-Inverted-Row.2022-07-06-16_35_26.gif" -coalesce -fill white -draw "rectangle 200,200,360,245" -flop "./convert2/Table-Inverted-Row.2022-07-06-16_35_26.gif"

