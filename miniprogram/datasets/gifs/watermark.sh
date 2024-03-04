#!/bin/bash
for file in ./convert/*.gif; do
  if [[ -f $file ]]; then
    filename=$(basename "$file")
    # 构建输出文件路径
    output="./watermark/${filename}"

    # 执行处理命令
    # convert "$file" -coalesce -fill white -draw "rectangle 0,0,150,30" -flop "$output"
    convert "$file" -gravity southeast -fill 'rgba(10, 10, 10, 0.2)' -pointsize 20 -annotate +140+10 "arron.laihongwei@gmail" -fill 'rgba(10, 10, 10, 0.1)' -pointsize 20 -annotate +80+200 "arron.laihongwei@gmail" -fill 'rgba(10, 10, 10, 0.2)' -pointsize 20 -annotate +10+300 "arron.laihongwei@gmail" "$output"
  fi
done
#  convert "./convert/0bac504381ee5fd4d2ad6c6653a3dbdb.2022-07-05-20_24_09.gif" -gravity southeast -fill 'rgba(10, 10, 10, 0.2)' -pointsize 20 -annotate +150+10 "arron.laihongwei@gmail" -fill 'rgba(10, 10, 10, 0.1)' -pointsize 20 -annotate +100+200 "arron.laihongwei@gmail" -fill 'rgba(10, 10, 10, 0.2)' -pointsize 20 -annotate +10+300 "arron.laihongwei@gmail" "./watermark/0bac504381ee5fd4d2ad6c6653a3dbdb.2022-07-05-20_24_09.gif"
