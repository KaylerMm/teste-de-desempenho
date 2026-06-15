import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '10s', target: 300 },
        { duration: '1m', target: 300 },
        { duration: '10s', target: 10 },
    ],
};

export default function () {
    const res = http.post('http://localhost:3000/checkout/simple', JSON.stringify({}), {
        headers: { 'Content-Type': 'application/json' },
    });
    check(res, {
        'status is 201': (r) => r.status === 201,
    });
}
