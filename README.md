# 私房錢管理員-MySQL

此專案提供使用者新增、刪除及修改私房錢的資訊，例如:類別、日期、名稱、金額等

## 功能列表

- 依照月份及類別篩選
- 點選`新增支出`新增花費類別、日期等資訊
- 點選‵`修改`可編輯此花費資料
- 點選`刪除`可刪除此花費資料

### 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/Eason0in/Expense-Tracker-MySQL.git
```

2.初始

```
cd Expense-Tracker-MySQL  //切至專案資料夾
```

```
npm install  //安裝套件
```

3.產生預設使用者及餐廳資料至 MySQL

```
npx sequelize db:migrate  //先建立records 及 users Table
```

終端機顯示以下圖片即完成新增資料表
![新增Table成功](https://github.com/Eason0in/Expense-Tracker-MySQL/blob/master/public/img/insertDB.JPG)

```
npx sequelize-cli db:seed:all  //建立種子資料
```

終端機顯示以下圖片即完成新增種子資料
![新增Seed成功](https://github.com/Eason0in/Expense-Tracker-MySQL/blob/master/public/img/insertSeed.JPG)

4.開啟程式

```
npm run start  //執行程式
```

終端顯示 `App is running in http://localhost:3000` 即啟動完成，請至[http://localhost:3000](http://localhost:3000)開始使用程式

## Test Data

- Account
  - email_1：asd@asd
  - password：asd
- Facebook
  - email：open_jjcwgtc_user@tfbnw.net
  - password：asD333

## 使用工具

- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [MySQL](https://www.mysql.com/) - 資料庫
- [sequelize](https://www.npmjs.com/package/sequelize) - 基於 Promise 的 Node.js ORM 支援支持 Postgres、MySQL、SQLite 和 Microsoft SQL Server 可以在程式中與資料庫溝通
