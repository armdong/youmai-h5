# API 说明
> API 主要用于获取当前登录用户的一些信息,主要信息及字段说明如下:

## registerData
- 数据类型: 字符串(String)
- 描述: 账号注册日期,日期格式: YYYY-MM-DD
- 例如: 2018-09-11

## userName
- 数据类型: 字符串(String)
- 描述: 用户名
- 例如: 张三

## fans
- 数据类型: 数组(Array), 数组子项类型为字符串(String)
- 描述: 排名前三位粉丝(导师或同道)
- 例如: ["张三", "李四", "王五"]

## counts
- 数据类型: 对象(Object)
- 描述: 计数对象, 有4个字段, 分别为:
  * class(累计听课节数)
  * message(累计阅读资讯篇数)
  * favor(给别人点赞次数)
  * comment(发表评论次数)
- 这些字段的值类型都为整数
- 例如:
```javascript
{
  class: 100,
  message: 200,
  favor: 300,
  comment: 400
}
```

## activeRange
- 数据类型: 对象(Object)
- 描述: 该用户最常登录的时间范围, 这个对象有两个字段:
  * type: 打卡类型, 主要有5种类型,分别是: 早餐、午餐、下午茶、晚餐和夜宵;分别用数字1,2,3,4,5来一一对应;
  * range: 二维数组,只有两个数组项,第一项为最小时间,第二项为最大时间;
- 例如:
```javascript
{
  type: 1, // 表示早餐
  range: [6, 9] // 表示从6点到9点之间
}
```

## festvals
- 数据类型: 数组(Array)
- 描述: 数组项为对象(Object), 每个对象有三个字段
 * type: 类型主要有三种, 整数; 元旦、除夕和年初一为一种,用数字1表示; 情人节和七夕为一种,用数字二表示; 中秋为一种,用数字3表示;
 * name: 具体的节假日名称, 选项有: 元旦、除夕、年初一、情人节、七夕和中秋, 字符串类型
 * date: 打卡日期, 字符串类型, 格式为: YYYY-MM-DD
- 该数组的数组项可以为零或多个, 但是每种类型的节日最多只可出现一次
- 例如:
```javascript
[
  {
    "type": 1,
    "name": "元旦",
    "date": "2017-09-29"
  },
  {
    "type": 2,
    "name": "情人节",
    "date": "2018-02-14"
  },
  {
    "type": 3,
    "name": "中秋",
    "date": "2017-08-15"
  }
]
```

## score
- 数据类型: 对象(Object)
- 描述: 麦豆的收获和消费情况, 有两个字段: receive为收获的麦豆数量, cost为消费的麦豆数量, 这两个字段的值都为整数
- 例如:
```javascript
{
  "recieve": 200,
  "cost": 99
}
```

## 整个JSON对象的响应内容示例如下:

```javascript
{
  "registerDate": "2015-08-30",
  "userName": "张三",
  "fans": ["李四", "王五", "赵六"],
  "counts": {
    "class": 100,
    "message": 439,
    "favor": 123,
    "comment": 345
  },
  "activeRange": {
    "type": 1,
    "range": [6, 9]
  },
  "festvals": [
    {
      "type": 1,
      "name": "元旦",
      "date": "2017-09-29"
    },
    {
      "type": 2,
      "name": "情人节",
      "date": "2018-02-14"
    },
    {
      "type": 3,
      "name": "中秋",
      "date": "2017-08-15"
    }
  ],
  "score": {
    "recieve": 200,
    "cost": 99
  }
}
```