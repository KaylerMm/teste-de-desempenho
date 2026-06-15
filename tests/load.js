import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 50 }, // Ramp-up to 50 users
        { duration: '2m', target: 50 }, // Plateau at 50 users
        { duration: '30s', target: 0 }, // Ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // p95 < 500ms
        http_req_failed: ['rate<0.01'], // Errors < 1%
    },
};

export default function () {
    const res = http.post('http://localhost:3000/checkout/simple', JSON.stringify({}), {
        headers: { 'Content-Type': 'application/json' },
    });
    check(res, {
        'status is 201': (r) => r.status === 201,
    });
}
