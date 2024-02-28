#!/bin/bash
for file in *.gif; do
  if [[ -f $file ]]; then
    # 构建输出文件路径
    output="./convert/${file}"

    # 执行处理命令
    convert "$file" -coalesce -fill white -draw "rectangle 0,0,150,30" -flop "$output"
  fi
done
