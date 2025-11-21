

const BASE_URL = 'http://localhost:5000/api';

async function testRoutes() {
    console.log('🔍 Testing API Routes...\n');

    const routes = [
        { path: '/auth/user', method: 'GET' },
        { path: '/cases', method: 'GET' },
        { path: '/documents', method: 'GET' },
        { path: '/appointments', method: 'GET' },
        { path: '/member/profile', method: 'GET' },
        { path: '/member/dependents', method: 'GET' },
        { path: '/notifications', method: 'GET' },
        { path: '/services', method: 'GET' },
        { path: '/tasks', method: 'GET' },
    ];

    let allPassed = true;

    for (const route of routes) {
        try {
            const response = await fetch(`${BASE_URL}${route.path}`, {
                method: route.method,
            });

            const status = response.status;
            const passed = status === 200;

            if (!passed) {
                allPassed = false;
                const body = await response.text();
                console.log(`❌ ${route.method} ${route.path} - Status: ${status} - Body: ${body}`);
            } else {
                console.log(`✅ ${route.method} ${route.path} - Status: ${status}`);
            }
        } catch (error) {
            allPassed = false;
            console.log(`❌ ${route.method} ${route.path} - Error: ${error.message}`);
        }
    }

    if (allPassed) {
        console.log('\n✅ All API routes are accessible.');
    } else {
        console.log('\n❌ Some API routes failed.');
        process.exit(1);
    }
}

testRoutes();
