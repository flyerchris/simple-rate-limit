# Simple-rate-limit
## overview
使用 fixed window 的方式來實作限速，每個 IP 的第一個請求來時紀錄時間，
在該時間之後的特定時間長度內不能請求超過指定的次數，時間過後再來請求則重設紀錄的時間以及請求次數
題目要求為1分鐘內不能超過60次，因此將變數設置為30秒內30次，這邊直接記在 server，實際應用應該會使用 redis

modelRateLimit.js以 IP 為 key 紀錄 IP 拜訪時間以及次數

mwRateLimit.js對資料做實際的操作

## Usage
* start server

        npm start
    or
    
        node server.js
    and then visit http://localhost:3141
    
* test

        npm test
    or
    
        node test.js