npm# for windows

## run server
$ cd ${project_root}/backend
$ npm run bs-win

## run test 示例
& cd ${project_root}/backend/src/test/
& tsc --target es2017 --module commonjs ./test-pg-helper.ts && ava ./test-pg-helper.js
(
  或者直接tsc，因为${project_root}/backend/src/test/下一个tsconfig.json文件，直接执行tsc的话tsc会直接找到当前目录的配置文件去解读编译选项

  $ tsc && ava ./test-pg-helper.js
)

`--------------------------------------------------------------------------------------`
# for linux | mac

## run server
$ cd backend
$ npm run bs

## run test 示例
& cd ${project_root}/backend/src/test/
& tsc --target es2017 --module commonjs ./test-pg-helper.ts && ava ./test-pg-helper.js
(
  或者（one style）：
  *1 vim /usr/local/bin/va

  *2 键入以下内容保存
  #!/bin/bash
  tsc --target es2017 --module commonjs $1ts && ava $2js

  *3 给予最高权限
  chmod 777 /usr/local/bin/va

  *4 执行va命令，表示编译并执行单元测试
  va ./test-pg-helper.
)