## Start environment
docker compose up

## Telegraf x Influxdb
Enter in http://localhost:8086/, go to Data -> API Tokens and get de Admin Api TOKEN
Configure the token in telegraf.conf on outputs.influxdb_v2 section.

### Influxdb x telegraf
Influxdb 2.0 needs to activate the bucket search, then you have to do a curl to the influxdb api to enable it

In the influxdb/enable-influxql file, you need to configure:

"bucketID": "8f170b69fb042d07" -- You find this info on the page Data -> Buckets
"database": "influx", -- You find this info on the page Data -> Buckets
"default": true, 
"orgID": "37aafc970aad10b3", -- You find this info on the page Profile -> About
"retention_policy": "Forever"


#### Grafana
Go to Configuration -> Data Sources
Add Data Sources
Search for influxdb

Choose InfluxQL Query Language

url: http://influxdb:8086 (running on docker)
Add Custom HTTP Headers
Header: Authorization
Value: Token "2312312312" (Admin token from influxdb)

Database: influxdb bucket

Go to + icon, to import the ravendb_rev1.json (It's my customization of https://grafana.com/grafana/dashboards/14498)
Choose import, copy and paste the json and click on load

### k6
Run k6 script to see the grafana boards in action:
Powershell:
cat k6\scripts.js | docker run --rm  -i grafana/k6 run --vus 100 --duration 120s -
Bash
docker run --rm -i grafana/k6 run --vus 100 --duration 120s - <scripts.js