import http from 'k6/http';
import { scenario } from 'k6/execution';

export const options = {
    vus: 10,
    duration: '30s'
};

export default function() {

    const url = 'http://192.168.50.69:9090/databases/teste/docs?id='.concat(scenario.iterationInInstance);
    const headers = { 'Content-Type': 'application/json' };
    const data = { name: 'Bert', '@metadata': { '@collection': 'people' } };

    const res = http.put(url, JSON.stringify(data), { headers: headers });

    console.log(JSON.parse(res.body));
}